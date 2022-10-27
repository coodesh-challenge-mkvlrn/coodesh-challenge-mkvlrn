import { Router } from 'express';
import { injectable } from 'tsyringe';

import { HealthCheckController } from '#/backend/modules/healthcheck/healthcheck.controller';

@injectable()
export class HealthCheckRouter {
  public routes = Router();

  constructor(private controller: HealthCheckController) {
    /**
     * @openapi
     * /:
     *  get:
     *    tags:
     *      - healthcheck
     *    summary: health check
     *    description: server info
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/healthcheck"
     *
     */
    this.routes.get('/', this.controller.root);
  }
}
