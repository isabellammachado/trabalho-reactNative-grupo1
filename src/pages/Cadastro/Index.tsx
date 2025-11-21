import React, { useState } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import { MOCK_USERS, buscarCep } from '../../services/api';
import MeuInput from '../../components/Input/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles';
import { Role, Nivel } from '../../types/index';
import { colors } from '../../theme/colors';

export default function CadastroScreen({ navigation }: any) {
  const [form, setForm] = useState({
    name: '', email: '', password: '', cep: '', cidade: '',
    role: 'surdo' as Role,
    nivel: 'basico' as Nivel
  });

  const handleCep = async (cep: string) => {
    setForm({ ...form, cep });
    if (cep.length >= 8) {
      const res = await buscarCep(cep);
      if (res) setForm(old => ({ ...old, cep, cidade: res.localidade }));
    }
  };

  const salvar = async () => {
    if (!form.name || !form.cidade) return Alert.alert("Erro", "Preencha tudo");
    await fetch(MOCK_USERS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    Alert.alert("Sucesso", "Cadastrado!");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.box}>
      <Text style={styles.tit}>Criar Conta</Text>

      <Text style={styles.lbl}>Eu sou:</Text>
      <View style={styles.row}>
        <MeuBotao texto="SURDO" cor={form.role === 'surdo' ? colors.primary : colors.gray} onPress={() => setForm({ ...form, role: 'surdo' })} />
        <MeuBotao texto="VOLUNTÁRIO" cor={form.role === 'voluntario' ? colors.primary : colors.gray} onPress={() => setForm({ ...form, role: 'voluntario' })} />
      </View>

      <MeuInput placeholder="Nome" value={form.name} setValor={t => setForm({ ...form, name: t })} />
      <MeuInput placeholder="Email" value={form.email} setValor={t => setForm({ ...form, email: t })} />
      <MeuInput placeholder="Senha" value={form.password} setValor={t => setForm({ ...form, password: t })} secureTextEntry />
      <MeuInput placeholder="CEP" value={form.cep} setValor={handleCep} keyboardType="numeric" />
      <MeuInput placeholder="Cidade" value={form.cidade} setValor={() => { }} />

      {form.role === 'voluntario' && (
        <>
          <Text style={styles.lbl}>Nível de Libras:</Text>
          <View style={styles.row}>
            {(['basico', 'intermediario', 'avancado'] as Nivel[]).map(n => (
              <MeuBotao key={n} texto={n.toUpperCase()} cor={form.nivel === n ? colors.secondary : colors.gray} onPress={() => setForm({ ...form, nivel: n })} />
            ))}
          </View>
        </>
      )}

      <MeuBotao texto="FINALIZAR" cor={colors.success} onPress={salvar} />
    </ScrollView>
  );
}