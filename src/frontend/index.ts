import { config as dotenvConfig } from 'dotenv';
import express, { Request, Response } from 'express';
import { join } from 'path';

dotenvConfig();
const app = express();

app.use(express.static(__dirname));
app.get('/', (_req: Request, res: Response) => {
  res.sendFile(join(__dirname, 'index.html'));
});

const PORT = +process.env.FRONTEND_PORT!;
app.listen(PORT, () => console.log(`server up @${PORT}`));
