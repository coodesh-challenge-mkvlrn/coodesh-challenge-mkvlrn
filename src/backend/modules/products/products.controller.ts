import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { ProductsService } from '#/backend/modules/products/products.service';

@injectable()
export class ProductsController {
  constructor(private service: ProductsService) {}

  getMany = async (req: Request, res: Response) => {
    const { page } = req.query;
    const result = await this.service.getMany(page ? +page : 1);
    return res.json(result);
  };
}
