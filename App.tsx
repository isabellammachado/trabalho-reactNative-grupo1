import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/hooks/AuthContext';
import Rotas from './src/routers/Rotas';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Rotas />
    </AuthProvider>
  );
}