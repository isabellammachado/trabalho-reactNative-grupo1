import React, { useState, useContext } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { MOCK_USERS } from '../../services/api';
import MeuInput from '../../components/Input/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles';
import { User } from '../../types/index';
import { colors } from './../../theme/colors';
import { useFonts } from 'expo-font';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    Merriweather: require('../../../assets/Fonts/static/Merriweather_120pt-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  async function logar() {
    try {
      const req = await fetch(MOCK_USERS);
      const users: User[] = await req.json();

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
      <Image style={styles.surdo} source={require('../../../assets/imagem-surdo.jpg')} />
      <Text style={styles.logo}>MÃOS QUE FALAM</Text>
  
      <MeuInput
        placeholder="Email"
        value={email}
        setValor={setEmail}
        keyboardType="email-address"
      />

      <MeuInput
        placeholder="Senha"
        value={senha}
        setValor={setSenha}
        secureTextEntry
      />

      <MeuBotao texto="ENTRAR" onPress={logar} />
      <MeuBotao
        texto="CRIAR CONTA"
        cor={colors.secondary}
        onPress={() => navigation.navigate('Cadastro')}
      />
    </View>
  );
}
