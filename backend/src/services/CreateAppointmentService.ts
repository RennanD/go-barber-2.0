import { getCustomRepository } from 'typeorm';

import { startOfHour } from 'date-fns';

import Appointment from '../app/models/Appointment';
import AppointmentsRespository from '../app/repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRespository);

    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentsInSameDate) {
      throw Error('There is already an appointment at this time');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
