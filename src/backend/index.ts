import { PrismaClient } from '@prisma/client';
import { config as dotenvConfig } from 'dotenv';
import cron from 'node-cron';
import { join } from 'path';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Worker } from 'worker_threads';

import { Logger } from '#/backend/server/Logger';
import { Server } from '#/backend/server/Server';

dotenvConfig();

container.register(PrismaClient, { useValue: new PrismaClient() });
const server = container.resolve(Server);

function doScraping() {
  const worker = new Worker(join(__dirname, './worker/scraping.js'));
  worker.on('message', (data: string) => {
    if (data.includes('FAILED')) Logger.error(data);
    else Logger.info(data);
  });
}

// 09:00h
cron.schedule('0 9 * * *', doScraping, { timezone: 'America/Sao_Paulo' });
doScraping();

server.start(+process.env.BACKEND_PORT! || 4001);
