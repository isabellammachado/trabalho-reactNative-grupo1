import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/hooks/AuthContext';
import { colors } from './src/theme/colors';
import { Routers } from './src/routers';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Routers />
    </AuthProvider>
  );
}