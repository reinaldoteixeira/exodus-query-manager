import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import createConnection from './database';
import { errorMiddleware } from './middlewares';
import { router } from './routes';

createConnection();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export { app };
