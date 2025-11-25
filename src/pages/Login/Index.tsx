import React, { useState, useContext } from 'react';
import { View, Text, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import { MOCK_USERS } from '../../services/Api';
import MeuInput from '../../components/Input/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles';
import { User } from '../../types/index';
import { colors } from './../../theme/colors';
import { useFonts } from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../@types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginProps) {
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

      if(!email || !senha){
        Alert.alert("Erro", "Preencha todos os campos");
        return;
      }
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
      <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              enableAutomaticScroll={true}
              extraHeight={150}
              extraScrollHeight={150}
              contentContainerStyle={{ flexGrow: 1, padding: 16 }}
            >
        <View>
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
      </KeyboardAwareScrollView>
    </View>
  );
}
