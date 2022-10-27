import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

import { UpdateProductDto } from '#/backend/modules/products/dtos/update-product.dto';
import { AppError, ErrorType } from '#/backend/server/AppError';

@injectable()
export class ProductsService {
  constructor(private orm: PrismaClient) {}

  async getMany(page: number) {
    try {
      const totalProducts = await this.orm.product.count();
      const totalPages = Math.ceil(totalProducts / 10);
      const data = await this.orm.product.findMany({
        take: 10,
        skip: 10 * (page - 1),
      });

      return {
        totalProducts,
        totalPages,
        productsPerPage: 10,
        currentPage: page,
        data,
      };
    } catch (err) {
      const { message } = err as Error;
      throw new AppError(ErrorType.INTERNAL_SERVER_ERROR, message);
    }
  }

  async getOne(code: string) {
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

  async updateOne(code: string, update: UpdateProductDto) {
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

  async deleteOne(code: string) {
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
