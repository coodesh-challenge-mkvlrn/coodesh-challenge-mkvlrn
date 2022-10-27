import { createMock } from '@golevelup/ts-jest';
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';

import { ProductsService } from '#/backend/modules/products/products.service';
import { AppError, ErrorType } from '#/backend/server/AppError';

describe('products.services.ts', () => {
  describe('getMany', () => {
    test('returns ok', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: { findMany: jest.fn().mockResolvedValue([]) },
        }),
      );

      const result = await service.getMany(1);

      expect(result).toEqual([]);
    });

    test('throws on db error', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: {
            findMany: jest.fn().mockImplementation(() => {
              throw new Error('database exploded');
            }),
          },
        }),
      );

      const act = () => service.getMany(1);

      await expect(act).rejects.toEqual<AppError>(
        expect.objectContaining({
          statusCode: 500,
          message: 'database exploded',
          type: ErrorType.INTERNAL_SERVER_ERROR,
        }),
      );
    });
  });
});
