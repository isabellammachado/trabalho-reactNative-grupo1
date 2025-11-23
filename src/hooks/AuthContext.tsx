import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import fotoDefault from '../../assets/images.png';
import { MOCK_USERS } from '../services/api';


interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  editar: (novosDados: Partial<User>) => Promise<void>; 
  fotoPerfil: string | null;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fotoPerfil = user?.fotoPerfil|| fotoDefault;
  
  useEffect(() => {
    async function loadStorage() {
      try {
        const storageUser = await AsyncStorage.getItem('@App:user');
        if (storageUser) setUser(JSON.parse(storageUser));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    loadStorage();
  }, []);

  async function signIn(userData: User) {
    setUser(userData);
    await AsyncStorage.setItem('@App:user', JSON.stringify(userData));
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  const editar = async (novosDados: Partial<User>) => {
  if (!user) return;

  try {
    const updatedUser = { ...user, ...novosDados };
    if (!updatedUser.fotoPerfil) {
      updatedUser.fotoPerfil = fotoDefault;
    }

    const response = await fetch(`${MOCK_USERS}/${user.id}`, {
      method: 'PUT',     
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar no MockAPI");
    }

    setUser(updatedUser);
    await AsyncStorage.setItem('@App:user', JSON.stringify(updatedUser));

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
};


  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, editar, fotoPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}