import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { MOCK_REQUESTS } from '../../services/api';
import MeuInput from '../../components/Input/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import Header from '../../components/Header/Index';
import { styles } from './Styles';
import { Nivel } from '../../types/index';
import { colors } from '../../theme/colors';

export default function CriarPedidoScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ title: '', location: '', data: '', nivel: 'basico' as Nivel });

  const criar = async () => {
    if (!form.title || !form.location || !user) return Alert.alert("Erro", "Preencha tudo");

    await fetch(MOCK_REQUESTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        cidade: user.cidade,
        data_agendamento: new Date().toISOString(), // Simplificação
        nivel_necessario: form.nivel,
        userId: user.id,
        status: 'aberto'
      })
    });
    Alert.alert("Sucesso", "Pedido criado!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header titulo="Pedir Ajuda" />
      <ScrollView contentContainerStyle={styles.box}>
        <MeuInput placeholder="Título (Ex: Médico)" value={form.title} setValor={t => setForm({ ...form, title: t })} />
        <MeuInput placeholder="Local" value={form.location} setValor={t => setForm({ ...form, location: t })} />
        <MeuInput placeholder="Data/Hora (Texto)" value={form.data} setValor={t => setForm({ ...form, data: t })} />

        <Text style={styles.lbl}>Nível Necessário:</Text>
        <View style={styles.row}>
          {(['basico', 'intermediario', 'avancado'] as Nivel[]).map(n => (
            <MeuBotao key={n} texto={n.toUpperCase()} cor={form.nivel === n ? colors.secondary : colors.gray} onPress={() => setForm({ ...form, nivel: n })} />
          ))}
        </View>

        <MeuBotao texto="ENVIAR" cor={colors.primary} onPress={criar} />
      </ScrollView>
    </View>
  );
}