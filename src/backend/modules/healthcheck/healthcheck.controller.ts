import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { HealthCheckService } from '#/backend/modules/healthcheck/healthcheck.service';

@injectable()
export class HealthCheckController {
  constructor(private service: HealthCheckService) {}

  root = async (_req: Request, res: Response) => {
    const uptime = this.service.uptime();

    return res.json({ uptime });
  };
}
