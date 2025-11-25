import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import HomeScreen from '../pages/Home/Index';
import VLibrasScreen from '../pages/VLibras/VLibrasPages';
import PerfilScreen from '../pages/Perfil/PerfilPages';
import {Aprendizado} from '../pages/Aprendizado/index';
import { RootTabParamList } from '../@types/navigation';


const Tab = createBottomTabNavigator<RootTabParamList>();

export const  TabsRouters = () => {
  return (
    <Tab.Navigator 
    id={undefined}
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
        name="Glossario" 
        component={Aprendizado} 
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

