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

  getOne = async (req: Request, res: Response) => {
    const { code } = req.params;
    const result = await this.service.getOne(code);
    return res.json(result);
  };

  updateOne = async (req: Request, res: Response) => {
    const { code } = req.params;
    const result = await this.service.updateOne(code, req.body);
    return res.json(result);
  };

  deleteOne = async (req: Request, res: Response) => {
    const { code } = req.params;
    const result = await this.service.deleteOne(code);
    return res.json(result);
  };
}
