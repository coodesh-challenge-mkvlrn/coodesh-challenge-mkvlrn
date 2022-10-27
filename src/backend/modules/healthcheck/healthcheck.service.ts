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

  async db() {
    try {
      await this.orm.$queryRaw`SELECT 1`;
      return true;
    } catch (err) {
      return false;
    }
  }

  memory() {
    const memoryData = process.memoryUsage();

    const memoryUsage = {
      rss: this.formatMemoryUsage(memoryData.rss),
      heapTotal: this.formatMemoryUsage(memoryData.heapTotal),
      heapUsed: this.formatMemoryUsage(memoryData.heapUsed),
      external: this.formatMemoryUsage(memoryData.external),
    };

    return memoryUsage;
  }

  async lastScan() {
    try {
      const last = await this.orm.scan.findFirst({
        orderBy: { date: 'desc' },
        select: { date: true, status: true, new_products: true, message: true },
      });
      return last ?? null;
    } catch (err) {
      return { error: 'failed while trying to get last scan data' };
    }
  }

  private formatMemoryUsage(data: number) {
    return `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;
  }
}
