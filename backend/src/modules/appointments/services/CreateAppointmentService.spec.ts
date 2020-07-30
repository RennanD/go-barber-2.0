import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '132123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should be not able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 6, 30, 17);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '132123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '132123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
