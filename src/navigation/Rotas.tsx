import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Importação das Telas
import LoginScreen from '../pages/Login/Index';
import CadastroScreen from '../pages/Cadastro/Index';
import HomeScreen from '../pages/Home/Index';
import VLibrasScreen from '../pages/VLibras/VLibrasPages';
import PerfilScreen from '../pages/Perfil/PerfilPages';
import CriarPedidoScreen from '../pages/Pedido/Index';
import DicionarioScreen from './../pages/Dicionario/Index';

// 1. TIPAGEM (O segredo para tirar o erro vermelho)
export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  AppTabs: undefined;
  CriarPedido: undefined;
};

export type RootTabParamList = {
  Inicio: undefined;
  VLibras: undefined;
  DicionarioScreen: undefined;
  Perfil: undefined;
};

// 2. CRIAÇÃO COM TIPAGEM
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function AppTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: colors.secondary,
        tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.border }
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeScreen} 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} 
      />
      <Tab.Screen 
        name="VLibras" 
        component={VLibrasScreen} 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="hand-left" size={24} color={color} /> }} 
      />
      <Tab.Screen 
        name="Dicionario" 
        component={DicionarioScreen} 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} /> }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} 
      />
    </Tab.Navigator>
  );
}

export default function Rotas() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!signed ? (
          // MODO DESLOGADO
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
          </Stack.Group>
        ) : (
          // MODO LOGADO
          <Stack.Group>
            <Stack.Screen name="AppTabs" component={AppTabs} />
            <Stack.Screen name="CriarPedido" component={CriarPedidoScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}