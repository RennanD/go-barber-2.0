import { Router } from 'express';
import apppointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', apppointmentsRouter);

export default routes;
