import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from './config/index';
import { authenticationRouter, charactersRouter, tasksRouter, usersRouter } from './routers';

console.clear();
loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/auth', authenticationRouter)
  .use('/users', usersRouter)
  .use('/characters', charactersRouter)
  .use('/tasks', tasksRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
