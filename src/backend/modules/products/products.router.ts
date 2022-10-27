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
    /**
     * @openapi
     * /products:
     *  get:
     *    tags:
     *      - products
     *    summary: list all products, paginated
     *    description: returns an array of products from the database
     *    parameters:
     *      - page:
     *        name: page
     *        in: query
     *        description: page of 10 items to fetch
     *        required: false
     *        schema:
     *          type: integer
     *          example: 1
     *        default: 1
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/product"
     */
    this.routes.get('/', asyncHandler(this.controller.getMany));

    /**
     * @openapi
     * /products/{code}:
     *  get:
     *    tags:
     *      - products
     *    summary: single product, by code
     *    description: returns a product from the database
     *    parameters:
     *      - code:
     *        name: code
     *        in: path
     *        description: product code
     *        required: true
     *        schema:
     *          type: string
     *          example: "8000500329474"
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/product"
     *      404:
     *        description: NOT_FOUND
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/errorNotFound"
     *      500:
     *        description: INTERNAL_SERVER_ERROR
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/errorInternal"
     *
     */
    this.routes.get(
      '/:code',
      this.validator.getOne,
      asyncHandler(this.controller.getOne),
    );

    /**
     * @openapi
     * /products/{code}:
     *  put:
     *    tags:
     *      - products
     *    summary: update single product in database
     *    description: only name, for brevity
     *    parameters:
     *      - code:
     *        name: code
     *        in: path
     *        description: product code
     *        required: true
     *        schema:
     *          type: string
     *          example: "8000500329474"
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              product_name:
     *                type: string
     *                example: "new product name"
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/product"
     *      400:
     *        description: BAD_REQUEST
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/errorBadUpdate"
     *      404:
     *        description: NOT_FOUND
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/errorNotFound"
     *      500:
     *        description: INTERNAL_SERVER_ERROR
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/errorInternal"
     *
     */
    this.routes.put(
      '/:code',
      this.validator.updateOne,
      asyncHandler(this.controller.updateOne),
    );

    /**
     * @openapi
     * /products/{code}:
     *  delete:
     *    tags:
     *      - products
     *    summary: delete single product, by code
     *    description: returns deleted product
     *    parameters:
     *      - code:
     *        name: code
     *        in: path
     *        description: product code
     *        required: true
     *        schema:
     *          type: string
     *          example: "8000500329474"
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/product"
     *      404:
     *        description: NOT_FOUND
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/errorNotFound"
     *      500:
     *        description: INTERNAL_SERVER_ERROR
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/errorInternal"
     *
     */
    this.routes.delete(
      '/:code',
      this.validator.deleteOne,
      asyncHandler(this.controller.deleteOne),
    );
  }
}
