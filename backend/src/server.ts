import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';

import routes from './routes';

import './database';

import uploadConfig from './app/config/upload';
import globalExceptionHandler from './app/middlewares/globalExceptionHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(globalExceptionHandler);

app.listen(3001, () => {
  console.log('Server runing');
});
