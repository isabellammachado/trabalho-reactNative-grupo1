import React, { useState, useContext } from 'react';
import { View, Text, Alert } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { MOCK_USERS } from '../../services/api';
import MeuInput from '../../components/Input/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles';
import { User } from '../../types/index';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useContext(AuthContext);

  async function logar() {
    try {
      const req = await fetch(MOCK_USERS);
      const users: User[] = await req.json();
      // Simulação de checagem de senha (o mockapi não tem senha real, adapte conforme seu mock)
      const usuario = users.find(u => u.email === email); 
      
      if (usuario) {
        signIn(usuario);
      } else {
        Alert.alert("Erro", "Usuário não encontrado");
      }
    } catch (e) {
      Alert.alert("Erro", "Falha na conexão");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Mãos que Falam</Text>
      <MeuInput placeholder="Email" value={email} setValor={setEmail} keyboardType="email-address" />
      <MeuInput placeholder="Senha" value={senha} setValor={setSenha} secureTextEntry />
      
      <MeuBotao texto="ENTRAR" onPress={logar} />
      <MeuBotao texto="CRIAR CONTA" cor="#CCC" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
}