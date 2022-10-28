export interface ScanResult {
  uptime: string;
  databaseOK: boolean;
  memory: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
    external: string;
  };
  lastScan: {
    date: Date;
    status: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS';
    new_products: number;
    message?: string;
  };
}
