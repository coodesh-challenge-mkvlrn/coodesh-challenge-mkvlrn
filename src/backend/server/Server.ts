import cors from 'cors';
import express from 'express';

export class Server {
  public app = express();

  constructor() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  start(port: number) {
    // eslint-disable-next-line no-console
    return this.app.listen(port, () => console.log(`server up @${port}`));
  }
}
