import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import { MOCK_REQUESTS } from '../../services/api';
import MeuInput from '../../components/Input/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import Header from '../../components/Header/Index';
import { styles } from './Styles';
import { Nivel } from '../../types/index';
import { colors } from '../../theme/colors';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type RootStackParamList = {
  Home: undefined;
  CriarPedido: undefined;
};

type CriarPedidoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CriarPedido'>;

type Props = {
  navigation: CriarPedidoScreenNavigationProp;
};

interface FormData {
  title: string;
  location: string;
  nivel: Nivel;
}

export default function CriarPedidoScreen({ navigation }: Props) {
  const { user } = useContext(AuthContext);

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [form, setForm] = useState<FormData>({ 
    title: '', 
    location: '', 
    nivel: 'basico' 
  });

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || dataSelecionada;
    
    setShowDatePicker(false);
    setShowTimePicker(false);
    
    setDataSelecionada(currentDate);
  };

  const criar = async () => {
    if (!form.title || !form.location || !user) return Alert.alert("Erro", "Preencha tudo");

    try {
        await fetch(MOCK_REQUESTS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                cidade: user.cidade,           
                data_agendamento: dataSelecionada.toISOString(), 
                nivel_necessario: form.nivel,
                userId: user.id,
                status: 'aberto'
            })
        });
        Alert.alert("Sucesso", "Pedido criado!");
        navigation.goBack();
    } catch (error) {
        Alert.alert("Erro", "Falha ao criar pedido");
    }
  };

  const formatarDataVisivel = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Header titulo="Pedir Ajuda" />
      <ScrollView contentContainerStyle={styles.box}>
        <MeuInput placeholder="Título (Ex: Médico)" value={form.title} setValor={t => setForm({ ...form, title: t })} />
        <MeuInput placeholder="Local" value={form.location} setValor={t => setForm({ ...form, location: t })} />

        <Text style={styles.lbl}>Quando você precisa?</Text>
        
        <TouchableOpacity 
            onPress={() => setShowDatePicker(true)}
            style={{
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 8,
                padding: 15,
                marginBottom: 10,
                backgroundColor: '#FFF'
            }}
        >
            <Text style={{ color: '#333' }}>
               📅 Data: {dataSelecionada.toLocaleDateString('pt-BR')}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => setShowTimePicker(true)}
            style={{
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 8,
                padding: 15,
                marginBottom: 20,
                backgroundColor: '#FFF'
            }}
        >
            <Text style={{ color: '#333' }}>
               ⏰ Hora: {dataSelecionada.getHours()}:{dataSelecionada.getMinutes().toString().padStart(2, '0')}
            </Text>
        </TouchableOpacity>

        {showDatePicker && (
            <DateTimePicker
                value={dataSelecionada}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChange}
                minimumDate={new Date()} 
            />
        )}

        {showTimePicker && (
            <DateTimePicker
                value={dataSelecionada}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChange}
            />
        )}

        <Text style={styles.lbl}>Nível de Libras Necessário:</Text>

        <View style={{ 
            borderWidth: 1, 
            borderColor: colors.gray, 
            borderRadius: 8, 
            marginBottom: 8,
            backgroundColor: '#FFF' 
        }}>
            <Picker
                selectedValue={form.nivel}
                onValueChange={(itemValue) => setForm({ ...form, nivel: itemValue })}
            >
                <Picker.Item label="Básico" value="basico" />
                <Picker.Item label="Intermediário" value="intermediario" />
                <Picker.Item label="Avançado (Intérprete)" value="avancado" />
            </Picker>
        </View>

        <MeuBotao texto="ENVIAR" cor={colors.primary} onPress={criar} />
        
        <View style={{ marginTop: 10 }}> 
            <MeuBotao texto="VOLTAR" cor={colors.gray} onPress={() => navigation.goBack()} />
        </View>

      </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}