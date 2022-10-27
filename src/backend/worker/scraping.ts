import { PrismaClient, Product, ScanStatus } from '@prisma/client';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { performance } from 'perf_hooks';
import { parentPort } from 'worker_threads';

import { Logger } from '#/backend/server/Logger';
import { parseProduct } from '#/backend/worker/parse-product';

(async () => {
  Logger.info('⛏️  SCRAPING STARTED 🏁');
  const prisma = new PrismaClient();
  const scan = await prisma.scan.create({ data: {} });

  try {
    const client = axios.create({
      baseURL: 'https://world.openfoodfacts.orga',
    });

    Logger.info('fetching frontpage data...');
    let t0 = performance.now();
    const frontPageData = (await client.get('')).data;
    let t1 = performance.now();
    Logger.info(`done in ${((t1 - t0) / 1000).toFixed(3)}s`);
    const frontPageDoc = new JSDOM(frontPageData).window.document;
    const urls: string[] = [];
    const products: Partial<Product>[] = [];

    // get ids
    Logger.info('fetching product ids...');
    t0 = performance.now();
    frontPageDoc.querySelectorAll('.products > li > a').forEach((product) => {
      urls.push(product.getAttribute('href')!);
    });
    t1 = performance.now();
    Logger.info(`done in ${((t1 - t0) / 1000).toFixed(3)}s`);

    // get products
    Logger.info('fetching product data...');
    t0 = performance.now();
    await Promise.all(
      urls.slice(0, 100).map(async (url) => {
        const { data } = await client.get(url);
        const doc = new JSDOM(data).window.document;
        const product = parseProduct(doc, url);
        products.push(product);
      }),
    );
    t1 = performance.now();
    Logger.info(`done in ${((t1 - t0) / 1000).toFixed(3)}s`);

    // persist data
    Logger.info('persisting data to db...');
    t0 = performance.now();
    const result = await prisma.product.createMany({
      data: products as Product[],
      skipDuplicates: true,
    });
    t1 = performance.now();
    Logger.info(`done in ${((t1 - t0) / 1000).toFixed(3)}s`);

    await prisma.scan.update({
      where: { id: scan.id },
      data: { status: ScanStatus.SUCCESS, new_products: result.count },
    });

    parentPort?.postMessage(
      `⛏️  SCRAPING SUCCESSFUL: ${result.count} products added ✅`,
    );
  } catch (err) {
    await prisma.scan.update({
      where: { id: scan.id },
      data: {
        status: ScanStatus.FAILED,
        new_products: 0,
        message: (err as Error).message,
      },
    });
    parentPort?.postMessage('⛏️  SCRAPING FAILED ❌');
  }
})();
