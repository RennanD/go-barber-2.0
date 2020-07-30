import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRespository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRespository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'rennan',
      email: 'rennan@teste.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createAppointment = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
