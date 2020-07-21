import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, Background, AnimationContainer } from './styles';

import getValidationErros from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import { useToast } from '../../hooks';

import logoImg from '../../assets/logo.svg';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { push } = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatótio.'),
          email: Yup.string()
            .required('O e-mail é obrigatório.')
            .email('Insira um e-mail válido'),
          password: Yup.string().min(6, 'no mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);
        addToast({
          title: 'Sucesso',
          description: 'Usuário cadastrado com sucesso, faça seu logon.',
          type: 'success',
        });
        push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            title: 'Erro no cadastro',
            type: 'error',
            description: 'Error ao se cadastrar, tente novamente.',
          });
        }
      }
    },
    [addToast, push],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input
              name="name"
              icon={FiUser}
              type="text"
              placeholder="Nome nome"
            />
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

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
