import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import fotoDefault from '../../assets/images.png';
import { MOCK_USERS } from '../services/api';
import { Alert } from 'react-native';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
  editar: (novosDados: Partial<User>) => Promise<void>;

  fotoPerfil: string | number;
  deletar: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fotoPerfil: string | number = user?.fotoPerfil || fotoDefault;

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

  async function signIn(email: string, pass: string) {
    try {
      const response = await fetch(MOCK_USERS);
      const users: User[] = await response.json();

      const userFound = users.find(u =>
        u.email &&
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === pass
      );

      if (userFound) {
        setUser(userFound);
        await AsyncStorage.setItem('@App:user', JSON.stringify(userFound));
      } else {
        throw new Error("Usuário ou senha incorretos.");
      }

    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Erro inesperado ao tentar logar.");
      }
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@App:user');
    setUser(null);
  }

  const editar = async (novosDados: Partial<User>) => {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...novosDados };

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
      Alert.alert("Sucesso", "Perfil atualizado!");

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    }
  };

  const deletar = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`${MOCK_USERS}/${user?.id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar no servidor");
      }

      Alert.alert("Perfil excluído com sucesso.");
      await signOut();

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao excluir perfil.");
    }
  };

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      signIn,
      signOut,
      loading,
      editar,
      fotoPerfil,
      deletar
    }}>
      {children}
    </AuthContext.Provider>
  );
}