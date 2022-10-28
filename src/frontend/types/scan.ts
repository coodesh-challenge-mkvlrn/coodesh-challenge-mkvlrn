export enum ScanStatus {
  SUCCESS,
  IN_PROGRESS,
  FAILED,
}

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
    status: ScanStatus;
    new_products: number;
    message?: string;
  };
}
