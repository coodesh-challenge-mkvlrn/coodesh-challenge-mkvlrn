import { PrismaClient, Product } from '@prisma/client';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { parentPort } from 'worker_threads';

import { parseProduct } from '#/backend/worker/parse-product';

(async () => {
  const prisma = new PrismaClient();
  const client = axios.create({ baseURL: 'https://world.openfoodfacts.org' });
  const scan = await prisma.scan.create({ data: { new_products: 0 } });

  const frontPageData = (await client.get('')).data;
  const frontPageDoc = new JSDOM(frontPageData).window.document;
  const urls: string[] = [];
  const products: Partial<Product>[] = [];

  // get ids
  console.time('fetch product ids');
  frontPageDoc.querySelectorAll('.products > li > a').forEach((product) => {
    urls.push(product.getAttribute('href')!);
  });
  console.timeEnd('fetch product ids');

  // get products
  console.time('get all product data');
  await Promise.all(
    urls.slice(0, 100).map(async (url) => {
      const { data } = await client.get(url);
      const doc = new JSDOM(data).window.document;
      const product = parseProduct(doc, url);
      products.push(product);
    }),
  );
  console.timeEnd('get all product data');

  // persist data
  console.time('persist data to db');
  const result = await prisma.product.createMany({
    data: products as Product[],
    skipDuplicates: true,
  });
  console.log(result);
  console.timeEnd('persist data to db');

  await prisma.scan.update({
    where: { id: scan.id },
    data: { complete: true, new_products: result.count },
  });
  parentPort?.postMessage('done');
})();
