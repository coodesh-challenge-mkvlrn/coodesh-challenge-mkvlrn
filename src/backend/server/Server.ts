import cors from 'cors';
import express from 'express';
import { injectable } from 'tsyringe';

import { errorHandler } from '#/backend/middlewares/error-handler';
import { ProductsRouter } from '#/backend/modules/products/products.router';

@injectable()
export class Server {
  public app = express();

  constructor(public products: ProductsRouter) {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use('/products', this.products.routes);

    this.app.use(errorHandler);
  }

  start(port: number) {
    // eslint-disable-next-line no-console
    return this.app.listen(port, () => console.log(`server up @${port}`));
  }
}
