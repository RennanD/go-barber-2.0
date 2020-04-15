import { Router } from 'express';

import { getCustomRepository } from 'typeorm';

import { parseISO } from 'date-fns';

import AppointmentsRepository from '../app/repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const apppointmentsRouter = Router();

apppointmentsRouter.use(ensureAuthenticated);

apppointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

apppointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  try {
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default apppointmentsRouter;
