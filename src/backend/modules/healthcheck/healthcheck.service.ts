import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { injectable } from 'tsyringe';

dayjs.extend(duration);

@injectable()
export class HealthCheckService {
  constructor(private orm: PrismaClient) {}

  uptime() {
    const time = dayjs.duration(process.uptime(), 's');
    return time.format('YYYY-MM-DDTHH:mm:ss');
  }
}
