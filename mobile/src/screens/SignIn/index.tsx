import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImage from '../../assets/images/logo.png';

const SignIn: React.FC = () => (
  <>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logoImage} />
          <View>
            <Title>Faça seu logon</Title>
          </View>

          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />
          <Button>Entrar</Button>

          <ForgotPassword>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>

    <CreateAccountButton>
      <Icon name="log-in" color="#ff9000" size={20} />
      <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
    </CreateAccountButton>
  </>
);

export default SignIn;
