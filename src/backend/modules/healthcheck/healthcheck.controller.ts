import { Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { HealthCheckService } from '#/backend/modules/healthcheck/healthcheck.service';

@injectable()
export class HealthCheckController {
  constructor(private service: HealthCheckService) {}

  root = async (_req: Request, res: Response) => {
    const uptime = this.service.uptime();
    const databaseOK = await this.service.db();
    const memory = this.service.memory();

    return res.json({ uptime, databaseOK, memory });
  };
}
