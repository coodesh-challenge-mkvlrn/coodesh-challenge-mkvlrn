import { config as dotenvConfig } from 'dotenv';

import { Server } from '#/backend/server/Server';

dotenvConfig();
const server = new Server();

server.start(4000);
