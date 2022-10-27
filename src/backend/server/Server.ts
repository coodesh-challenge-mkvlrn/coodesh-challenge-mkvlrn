import cors from 'cors';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import { injectable } from 'tsyringe';

import { errorHandler } from '#/backend/middlewares/error-handler';
import { HealthCheckRouter } from '#/backend/modules/healthcheck/healthcheck.router';
import { ProductsRouter } from '#/backend/modules/products/products.router';
import { Logger } from '#/backend/server/Logger';
import { spec } from '#/backend/server/OpenApi';

@injectable()
export class Server {
  public app = express();

  constructor(
    public products: ProductsRouter,
    public healthcheck: HealthCheckRouter,
  ) {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use('/docs', serve, setup(spec));
    this.app.use('/products', this.products.routes);
    this.app.use('/', this.healthcheck.routes);

    this.app.use(errorHandler);
  }

  start(port: number) {
    return this.app.listen(port, () => Logger.info(`🚀 server up @${port} 🚀`));
  }
}
