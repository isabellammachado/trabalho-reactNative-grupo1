import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import Header from '../../components/Header/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles';

export default function PerfilScreen() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Header titulo="Perfil" />
      <View style={styles.box}>
        <Text style={styles.lbl}>Nome:</Text>
        <Text style={styles.val}>{user.name}</Text>
        
        <Text style={styles.lbl}>Localidade:</Text>
        <Text style={styles.val}>{user.cidade} - CEP {user.cep}</Text>
        
        <Text style={styles.lbl}>Nível de Libras:</Text>
        <Text style={styles.val}>{user.nivel.toUpperCase()}</Text>

        <MeuBotao texto="SAIR" cor="#FF6B6B" onPress={signOut} />
      </View>
    </View>
  );
}
