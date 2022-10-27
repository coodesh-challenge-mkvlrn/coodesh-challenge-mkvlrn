import { Router } from 'express';
import { injectable } from 'tsyringe';

import { ProductsController } from '#/backend/modules/products/products.controller';

@injectable()
export class ProductsRouter {
  public routes = Router();

  constructor(private controller: ProductsController) {
    this.routes.get('/', this.controller.getMany);
    this.routes.get('/:code', this.controller.getOne);
    this.routes.put('/:code', this.controller.updateOne);
    this.routes.delete('/:code', this.controller.deleteOne);
  }
}
