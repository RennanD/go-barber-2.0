import { Router } from 'express';
import apppointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', apppointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
