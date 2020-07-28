import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';

import uploadConfig from '@config/upload';
import '@shared/infra/typeorm';
import globalExceptionHandler from '@shared/infra/http/middlewares/globalExceptionHandler';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(globalExceptionHandler);

app.listen(3001, () => {
  console.log('Server runing');
});
