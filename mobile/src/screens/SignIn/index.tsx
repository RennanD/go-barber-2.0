import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

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

import { useAuth } from '../../hooks';

import logoImage from '../../assets/images/logo.png';

import getValidationErros from '../../utils/getValidationErros';

interface SignInRequest {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleSignIn = useCallback(
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
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        console.log(err.response.data);
        Alert.alert('Erro', 'Erro ao fazer login, tente novamente');
      }
    },
    [signIn],
  );

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

            <Form
              style={{ width: '100%' }}
              ref={formRef}
              onSubmit={handleSignIn}
            >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

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
