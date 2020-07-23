import React from 'react';

import { useAuth, AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export { AppProvider, useAuth };
