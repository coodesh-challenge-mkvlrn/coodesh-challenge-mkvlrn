import { createMock } from '@golevelup/ts-jest';
import { PrismaClient, Product } from '@prisma/client';
import '@prisma/client/runtime';
import 'reflect-metadata';

import { ProductsService } from '#/backend/modules/products/products.service';
import { AppError } from '#/backend/server/AppError';

describe('products.services.ts', () => {
  describe('getMany', () => {
    test('returns ok', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: {
            count: jest.fn().mockResolvedValue(1),
            findMany: jest
              .fn()
              .mockResolvedValue([
                createMock<Product>({ product_name: 'mock' }),
              ]),
          },
        }),
      );

      const result = await service.getMany(1);

      expect(result.totalProducts).toBe(1);
      expect(result.productsPerPage).toBe(10);
      expect(result.currentPage).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].product_name).toBe('mock');
    });

    test('throws on db error', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: {
            count: jest.fn().mockImplementation(() => {
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
          type: 'INTERNAL_SERVER_ERROR',
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
              .mockResolvedValue(createMock<Product>({ code: '123456' })),
          },
        }),
      );

      const result = await service.getOne('123456');

      expect(result.code).toBe('123456');
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

      const act = () => service.getOne('123456');

      await expect(act).rejects.toEqual<AppError>(
        expect.objectContaining({
          statusCode: 500,
          message: 'database exploded',
          type: 'INTERNAL_SERVER_ERROR',
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

      const act = () => service.getOne('123456');

      await expect(act).rejects.toEqual<AppError>(
        expect.objectContaining({
          statusCode: 404,
          message: 'product not found in db',
          type: 'NOT_FOUND',
        }),
      );
    });
  });

  describe('updateOne', () => {
    test('returns ok', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: {
            findUnique: jest.fn().mockResolvedValue(createMock<Product>()),
            update: jest
              .fn()
              .mockResolvedValue(
                createMock<Product>({ product_name: 'updated name' }),
              ),
          },
        }),
      );

      const result = await service.updateOne('123456', {
        product_name: 'updated name',
      });

      expect(result.product_name).toBe('updated name');
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

      const act = () =>
        service.updateOne('123456', { product_name: 'updated name' });

      await expect(act).rejects.toEqual<AppError>(
        expect.objectContaining({
          statusCode: 500,
          message: 'database exploded',
          type: 'INTERNAL_SERVER_ERROR',
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

      const act = () => service.updateOne('123456', { product_name: 'hue' });

      await expect(act).rejects.toEqual<AppError>(
        expect.objectContaining({
          statusCode: 404,
          message: 'product not found in db',
          type: 'NOT_FOUND',
        }),
      );
    });
  });

  describe('deleteOne', () => {
    test('returns ok', async () => {
      const service = new ProductsService(
        createMock<PrismaClient>({
          product: {
            findUnique: jest.fn().mockResolvedValue(createMock<Product>()),
            update: jest
              .fn()
              .mockResolvedValue(
                createMock<Product>({ code: '123456', status: 'TRASH' }),
              ),
          },
        }),
      );

      const result = await service.deleteOne('123456');

      expect(result.code).toBe('123456');
      expect(result.status).toBe('TRASH');
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

      const act = () => service.deleteOne('123456');

      await expect(act).rejects.toEqual<AppError>(
        expect.objectContaining({
          statusCode: 500,
          message: 'database exploded',
          type: 'INTERNAL_SERVER_ERROR',
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

      const act = () => service.deleteOne('123456');

      await expect(act).rejects.toEqual<AppError>(
        expect.objectContaining({
          statusCode: 404,
          message: 'product not found in db',
          type: 'NOT_FOUND',
        }),
      );
    });
  });
});
