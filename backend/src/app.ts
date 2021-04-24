import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import createConnection from './database';
import { errorMiddleware } from './middlewares';
import { router } from './routes';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export { app };
