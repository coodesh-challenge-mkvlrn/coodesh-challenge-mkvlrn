import { PrismaClient } from '@prisma/client';
import { config as dotenvConfig } from 'dotenv';
import 'reflect-metadata';
import { container } from 'tsyringe';

import { Server } from '#/backend/server/Server';

dotenvConfig();

container.register(PrismaClient, { useValue: new PrismaClient() });
const server = container.resolve(Server);

server.start(+process.env.BACKEND_PORT! || 4001);
