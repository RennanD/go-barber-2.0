import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRespository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRespository);

    const user = await createUser.execute({
      name: 'rennan',
      email: 'rennan@teste.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createAppointment = new CreateUserService(fakeUsersRepository);

    await createAppointment.execute({
      name: 'rennan',
      email: 'rennan@teste.com.br',
      password: '123456',
    });

    expect(
      createAppointment.execute({
        name: 'rennan d',
        email: 'rennan@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
