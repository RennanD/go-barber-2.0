import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

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

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();

  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setShowKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => setShowKeyboard(false));

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setShowKeyboard(true));
      Keyboard.removeListener('keyboardDidHide', () => setShowKeyboard(false));
    };
  }, []);

  return (
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

      {!showKeyboard && (
        <CreateAccountButton
          onPress={() => {
            navigate('SignUp');
          }}
        >
          <Icon name="log-in" color="#ff9000" size={20} />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      )}
    </>
  );
};

export default SignIn;
