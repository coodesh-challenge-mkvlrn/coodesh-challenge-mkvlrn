import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

import { UpdateProductDto } from '#/backend/modules/products/dtos/update-product.dto';
import { AppError, ErrorType } from '#/backend/server/AppError';

@injectable()
export class ProductsService {
  constructor(private orm: PrismaClient) {}

  async getMany(page: number) {
    try {
      return await this.orm.product.findMany({
        take: 10,
        skip: 10 * (page - 1),
      });
    } catch (err) {
      const { message } = err as Error;
      throw new AppError(ErrorType.INTERNAL_SERVER_ERROR, message);
    }
  }

  async getOne(code: number) {
    try {
      const product = await this.orm.product.findUnique({
        where: { code },
      });

      if (!product)
        throw new AppError(ErrorType.NOT_FOUND, 'product not found in db');

      return product;
    } catch (err) {
      if (err instanceof AppError) throw err;

      const { message } = err as Error;
      throw new AppError(ErrorType.INTERNAL_SERVER_ERROR, message);
    }
  }

  async updateOne(code: number, update: UpdateProductDto) {
    try {
      const product = await this.orm.product.findUnique({ where: { code } });

      if (!product)
        throw new AppError(ErrorType.NOT_FOUND, 'product not found in db');

      return await this.orm.product.update({ where: { code }, data: update });
    } catch (err) {
      if (err instanceof AppError) throw err;

      const { message } = err as Error;
      throw new AppError(ErrorType.INTERNAL_SERVER_ERROR, message);
    }
  }

  async deleteOne(code: number) {
    try {
      const product = await this.orm.product.findUnique({ where: { code } });

      if (!product)
        throw new AppError(ErrorType.NOT_FOUND, 'product not found in db');

      return await this.orm.product.delete({ where: { code } });
    } catch (err) {
      if (err instanceof AppError) throw err;

      const { message } = err as Error;
      throw new AppError(ErrorType.INTERNAL_SERVER_ERROR, message);
    }
  }
}
