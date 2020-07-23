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

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImage from '../../assets/images/logo.png';

const SignUp: React.FC = () => {
  const { goBack } = useNavigation();
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
              <Title>Cire ua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="Senha" />

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />
            <Button>Entrar</Button>
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
