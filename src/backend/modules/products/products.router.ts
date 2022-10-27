import { Router } from 'express';
import { injectable } from 'tsyringe';

import { asyncHandler } from '#/backend/middlewares/async-handler';
import { ProductsController } from '#/backend/modules/products/products.controller';
import { ProductsValidator } from '#/backend/modules/products/products.validator';

@injectable()
export class ProductsRouter {
  public routes = Router();

  constructor(
    private controller: ProductsController,
    private validator: ProductsValidator,
  ) {
    this.routes.get('/', asyncHandler(this.controller.getMany));
    this.routes.get(
      '/:code',
      this.validator.getOne,
      asyncHandler(this.controller.getOne),
    );
    this.routes.put(
      '/:code',
      this.validator.updateOne,
      asyncHandler(this.controller.updateOne),
    );
    this.routes.delete('/:code', asyncHandler(this.controller.deleteOne));
  }
}
