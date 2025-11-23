import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { SurdoAlert } from '../@types/alerts'; 
import { BatchMessage } from '../@types/smsdev';
import { sendBatchAlerts } from '../services/smsDevService'; 

const SMSDEV_KEY = 'SUA_CHAVE_AQUI'; 
const NUMERO_VOLUNTARIO_TESTE = '5541999407148'; 

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  editar: (novosDados: User) => Promise<void>;
  surdoAlert: SurdoAlert | null;
  handleNewUrgentRequest: () => Promise<void>; 
  clearUrgentAlert: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [surdoAlert, setSurdoAlert] = useState<SurdoAlert | null>(null);

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
    setSurdoAlert(null);
  }

  async function editar(novosDados: User) {
    if(!user) return;
    const usuarioAtualizado = { ...user, ...novosDados };
    setUser(usuarioAtualizado);
    await AsyncStorage.setItem('@App:user', JSON.stringify(usuarioAtualizado));
  }

  function clearUrgentAlert() {
      setSurdoAlert(null);
  }

  async function handleNewUrgentRequest() {
    
    if (surdoAlert) return; 

    const novoPedido: SurdoAlert = {
        id: Date.now().toString().slice(-6), 
        mensagem: "Usuário Surdo solicitando assistência imediata!",
        hora: new Date().toLocaleTimeString('pt-BR'),
    };
    
    const alertsToSend: BatchMessage[] = [{
        key: SMSDEV_KEY, 
        type: 0, 
        number: NUMERO_VOLUNTARIO_TESTE,
        msg: ` AJUDA URGENTE (Libras). ID: ${novoPedido.id}. Acesse o app agora!`,
    }];

    const sucesso = await sendBatchAlerts(alertsToSend);
    
    if (sucesso) {
        setSurdoAlert(novoPedido);
    }
  }

  return (
    <AuthContext.Provider 
        value={{ 
            signed: !!user, 
            user, 
            signIn, 
            signOut, 
            loading, 
            editar, 
            surdoAlert, 
            handleNewUrgentRequest,
            clearUrgentAlert,
        }}
    >
      {children}
    </AuthContext.Provider>
  );
}