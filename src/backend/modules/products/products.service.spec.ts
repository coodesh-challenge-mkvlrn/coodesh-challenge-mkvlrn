import { createMock } from '@golevelup/ts-jest';
import { PrismaClient, Product } from '@prisma/client';
import 'reflect-metadata';

import { ProductsService } from '#/backend/modules/products/products.service';
import { AppError, ErrorType } from '#/backend/server/AppError';

describe('products.services.ts', () => {
  describe('getMany', () => {
    test('returns ok', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: {
            findMany: jest.fn().mockResolvedValue([createMock<Product>()]),
          },
        }),
      );

      const result = await service.getMany(1);

      expect(result).toHaveLength(1);
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

  describe('getOne', () => {
    test('returns ok', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: {
            findUnique: jest
              .fn()
              .mockResolvedValue(createMock<Product>({ code: 123456 })),
          },
        }),
      );

      const result = await service.getOne(123456);

      expect(result.code).toBe(123456);
    });

    test('throws on db error', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: {
            findUnique: jest.fn().mockImplementation(() => {
              throw new Error('database exploded');
            }),
          },
        }),
      );

      const act = () => service.getOne(123456);

      await expect(act).rejects.toEqual<AppError>(
        expect.objectContaining({
          statusCode: 500,
          message: 'database exploded',
          type: ErrorType.INTERNAL_SERVER_ERROR,
        }),
      );
    });

    test('throws on not found', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: {
            findUnique: jest.fn().mockResolvedValue(null),
          },
        }),
      );

      const act = () => service.getOne(123456);

      await expect(act).rejects.toEqual<AppError>(
        expect.objectContaining({
          statusCode: 404,
          message: 'product not found in db',
          type: ErrorType.NOT_FOUND,
        }),
      );
    });
  });
});
