import { Router } from 'express';
import { injectable } from 'tsyringe';

import { asyncHandler } from '#/backend/middlewares/async-handler';
import { ProductsController } from '#/backend/modules/products/products.controller';

@injectable()
export class ProductsRouter {
  public routes = Router();

  constructor(private controller: ProductsController) {
    this.routes.get('/', asyncHandler(this.controller.getMany));
    this.routes.get('/:code', asyncHandler(this.controller.getOne));
    this.routes.put('/:code', asyncHandler(this.controller.updateOne));
    this.routes.delete('/:code', asyncHandler(this.controller.deleteOne));
  }
}
