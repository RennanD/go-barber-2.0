import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const apppointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

apppointmentsRouter.use(ensureAuthenticated);

// apppointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

apppointmentsRouter.post('/', appointmentsController.create);

export default apppointmentsRouter;
