import React, { useState, useContext } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import MeuInput from '../../components/Input/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles';
import { colors } from './../../theme/colors';
import { useFonts } from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha email e senha.");
      return;
    }

    try {
      await signIn(email, senha);

    } catch (error: any) {
      Alert.alert("Erro de Acesso", error.message || "Falha ao tentar logar.");
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" >
        <View>
          <Image style={styles.surdo} source={require('../../../assets/imagem-surdo.jpg')} />
          <Text style={styles.logo}>MÃOS QUE FALAM</Text>

          <MeuInput
            placeholder="Email"
            value={email}
            setValor={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
      </KeyboardAwareScrollView>
    </View>
  );
}