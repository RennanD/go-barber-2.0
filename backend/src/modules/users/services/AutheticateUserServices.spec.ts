import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from './AutheticateUserServices';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRespository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRespository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRespository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'rennan',
      email: 'rennan@teste.com.br',
      password: '123456',
    });

    const session = await authenticateUser.execute({
      email: 'rennan@teste.com.br',
      password: '123456',
    });

    expect(session).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRespository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRespository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'rennan@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should bot be able to authenticate with invalid password', async () => {
    const fakeUsersRespository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRespository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRespository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'rennan',
      email: 'rennan@teste.com.br',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'rennan@teste.com.br',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
