import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  editar: (novosDados: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  async function editar(novosDados: User) {
    if(!user) return;
    const usuarioAtualizado = { ...user, ...novosDados };
    setUser(usuarioAtualizado);
    await AsyncStorage.setItem('@App:user', JSON.stringify(usuarioAtualizado));

  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, editar }}>
      {children}
    </AuthContext.Provider>
  );
}