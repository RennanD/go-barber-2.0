import React from 'react';
import { Image } from 'react-native';

import { Container, Title } from './styles';

import logoImage from '../../assets/images/logo.png';

const SignIn: React.FC = () => (
  <Container>
    <Image source={logoImage} />

    <Title>Faça seu logon</Title>
  </Container>
);

export default SignIn;
