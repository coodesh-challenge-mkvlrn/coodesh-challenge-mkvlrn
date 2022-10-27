import { Router } from 'express';
import { injectable } from 'tsyringe';

import { HealthCheckController } from '#/backend/modules/healthcheck/healthcheck.controller';

@injectable()
export class HealthCheckRouter {
  public routes = Router();

  constructor(private controller: HealthCheckController) {
    this.routes.get('/', this.controller.root);
  }
}
