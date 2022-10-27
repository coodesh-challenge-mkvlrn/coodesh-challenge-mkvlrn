import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

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
}
