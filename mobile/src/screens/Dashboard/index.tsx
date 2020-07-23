import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../hooks';

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Button title="Sair" onPress={() => signOut()} />
    </View>
  );
};

export default Dashboard;
