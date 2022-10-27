import { PrismaClient } from '@prisma/client';
import { config as dotenvConfig } from 'dotenv';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { Worker } from 'worker_threads';

import { Server } from '#/backend/server/Server';

dotenvConfig();

container.register(PrismaClient, { useValue: new PrismaClient() });
const server = container.resolve(Server);

const worker = new Worker('./worker/scraping.js');
worker.on('message', (data) => {
  console.log(data);
});

server.start(+process.env.BACKEND_PORT! || 4001);
