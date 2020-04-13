import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../app/repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const apppointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

apppointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

apppointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  try {
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default apppointmentsRouter;
