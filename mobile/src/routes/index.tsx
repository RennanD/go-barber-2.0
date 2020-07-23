import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../hooks';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#312e38',
        }}
      >
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
