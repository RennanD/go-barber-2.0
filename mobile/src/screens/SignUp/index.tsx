import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImage from '../../assets/images/logo.png';

const SignUp: React.FC = () => {
  const { goBack } = useNavigation();
  const [showKeyboard, setShowKeyboard] = useState(false);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setShowKeyboard(true));
    Keyboard.addListener('keyboardDidHide', () => setShowKeyboard(false));

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setShowKeyboard(true));
      Keyboard.removeListener('keyboardDidHide', () => setShowKeyboard(false));
    };
  }, []);

  const handleSubmit = useCallback((data: obejec) => {
    console.log(data);
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
              <Title>Cire ua conta</Title>
            </View>

            <Form
              ref={formRef}
              style={{ width: '100%' }}
              onSubmit={handleSubmit}
            >
              <Input name="name" icon="user" placeholder="Senha" />

              <Input name="email" icon="mail" placeholder="E-mail" />

              <Input name="password" icon="lock" placeholder="Senha" />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {!showKeyboard && (
        <BackToSignIn onPress={() => goBack()}>
          <Icon name="arrow-left" color="#fff" size={20} />
          <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
      )}
    </>
  );
};

export default SignUp;
