import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../../components/Header/Index';
import MeuBotao from '../../components/MeuBotao/Index';

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
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  box: { padding: 20 },
  lbl: { color: '#999', marginTop: 15 },
  val: { fontSize: 18, fontWeight: 'bold', color: '#4F4F4F' }
});