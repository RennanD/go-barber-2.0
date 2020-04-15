import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

import uploadConfig from './app/config/upload';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3001);
