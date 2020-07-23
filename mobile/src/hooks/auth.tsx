import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  user: object;
  token: string;
}

interface Credencials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credencials: Credencials): Promise<void>;
  loading: boolean;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@gobarber:token', token],
      ['@gobarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@gobarber:token', '@gobarber:user']);

    setData({} as AuthState);
  }, []);

  useEffect(() => {
    async function loadUser(): Promise<void> {
      setLoading(true);
      const [token, user] = await AsyncStorage.multiGet([
        '@gobarber:token',
        '@gobarber:user',
      ]);

      if (user[1] && token[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth most be within an AuthProvider');
  }

  return context;
}
