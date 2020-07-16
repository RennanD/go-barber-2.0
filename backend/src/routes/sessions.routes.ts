import { Router } from 'express';

import AuthenticateUserService from '../services/AutheticateUserServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUser = new AuthenticateUserService();

  const { user, token } = await authUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
