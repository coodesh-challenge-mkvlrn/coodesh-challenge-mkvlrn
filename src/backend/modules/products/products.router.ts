import { Router } from 'express';
import { injectable } from 'tsyringe';

import { ProductsController } from '#/backend/modules/products/products.controller';

@injectable()
export class ProductsRouter {
  public routes = Router();

  constructor(private controller: ProductsController) {
    this.routes.get('/', this.controller.getMany);
  }
}
