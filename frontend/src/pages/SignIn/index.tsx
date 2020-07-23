import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, Background, AnimationContainer } from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth, useToast } from '../../hooks';

import getValidationErros from '../../utils/getValidationErros';

interface SignInRequest {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const { push } = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleLogin = useCallback(
    async (data: SignInRequest) => {
      formRef.current?.setErrors({});

      const { email, password } = data;

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório.').email(),
        password: Yup.string().required('Senha obrigatória.'),
      });

      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email,
          password,
        });

        push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            title: 'Erro no login',
            type: 'error',
            description: 'Foi um error doido aí',
          });
        }
      }
    },
    [addToast, push, signIn],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleLogin}>
            <h1>Faça seu logon</h1>

            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="/forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
