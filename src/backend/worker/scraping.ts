import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { parentPort } from 'worker_threads';

(async () => {
  const prisma = new PrismaClient();
  const scan = await prisma.scan.create({ data: { new_products: 0 } });

  const url = 'https://world.openfoodfacts.org';
  const frontPageData = (await axios.get(url)).data;
  const frontPageDoc = new JSDOM(frontPageData).window.document;
  console.log(frontPageDoc);

  await prisma.scan.update({
    where: { id: scan.id },
    data: { complete: true },
  });
  parentPort?.postMessage('done');
})();
