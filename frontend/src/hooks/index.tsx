import React from 'react';

import { useAuth, AuthProvider } from './auth';
import { useToast, ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export { AppProvider, useAuth, useToast };
