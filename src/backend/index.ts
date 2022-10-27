import { config as dotenvConfig } from 'dotenv';

import { Server } from '#/backend/server/Server';

dotenvConfig();
const server = new Server();

server.start(+process.env.BACKEND_PORT! || 4001);
