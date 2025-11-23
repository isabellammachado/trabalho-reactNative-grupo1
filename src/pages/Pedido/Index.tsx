import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Switch
} from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import { MOCK_REQUESTS } from '../../services/api';
import MeuInput from '../../components/Input/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import Header from '../../components/Header/Index';
import { colors } from '../../theme/colors';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  CriarPedido: undefined;
};

type CriarPedidoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CriarPedido'>;

type Props = {
  navigation: CriarPedidoScreenNavigationProp;
};

const TAGS_COMUNS = [
  { nome: 'Saúde', icone: 'hospital-alt', valor: 'Preciso de Médico/Saúde' },
  { nome: 'Banco', icone: 'university', valor: 'Ajuda em Banco' },
  { nome: 'Jurídico', icone: 'balance-scale', valor: 'Advogado/Jurídico' },
  { nome: 'Compras', icone: 'shopping-cart', valor: 'Ajuda em Compras' },
  { nome: 'Outros', icone: 'question-circle', valor: '' },
];

export default function CriarPedidoScreen({ navigation }: Props) {
  const { user } = useContext(AuthContext);

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [usarLocalAtual, setUsarLocalAtual] = useState(false);

  const [form, setForm] = useState({
    title: '',
    location: '',
    nivel: 'basico',
    descricao: ''
  });

  const definirParaAgora = () => {
    setDataSelecionada(new Date());
    Alert.alert("Pronto!", "Data e hora definidos para AGORA.");
  };

  const obterLocalizacaoAtual = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Ative o GPS nas configurações para usar esta função.');
        setLoadingLocation(false);
        setUsarLocalAtual(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (addressResponse.length > 0) {
        const item = addressResponse[0];
        const rua = item.street || 'Rua desconhecida';
        const numero = item.streetNumber || 'S/N';
        const bairro = item.district || item.subregion || '';
        const enderecoFormatado = `${rua}, ${numero} - ${bairro}`;

        setForm(prev => ({ ...prev, location: enderecoFormatado }));
      }
    } catch (error) {
      Alert.alert("Erro", "Não conseguimos pegar sua localização.");
      setUsarLocalAtual(false);
    } finally {
      setLoadingLocation(false);
    }
  };

  const toggleLocalAtual = (valor: boolean) => {
    setUsarLocalAtual(valor);
    if (valor) {
      obterLocalizacaoAtual();
    } else {
      setForm(prev => ({ ...prev, location: '' }));
    }
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || dataSelecionada;
    setShowDatePicker(false);
    setDataSelecionada(currentDate);
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || dataSelecionada;
    setShowTimePicker(false);
    setDataSelecionada(currentDate);
  };

  const criar = async () => {
    if (!form.title || !form.location || !user) return Alert.alert("Erro", "Preencha Título e Local");

    try {
      await fetch(MOCK_REQUESTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          cidade: user.cidade || 'Não informada',
          data_agendamento: dataSelecionada.toISOString(),
          nivel_necessario: form.nivel,
          userId: user.id || 1,
          status: 'aberto'
        })
      });
      Alert.alert("Sucesso", "Ajuda solicitada! Aguarde um voluntário.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Falha ao criar pedido");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>

          <Header titulo="Pedir Ajuda" alertCount={0} />

          <ScrollView contentContainerStyle={styles.box}>
            <Text style={styles.lbl}>Qual o tipo de ajuda?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
              {TAGS_COMUNS.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tag, form.title === tag.valor && styles.tagSelected]}
                  onPress={() => setForm({ ...form, title: tag.valor })}
                >
                  <FontAwesome5 name={tag.icone} size={20} color={form.title === tag.valor ? '#FFF' : colors.primary} />
                  <Text style={[styles.tagText, form.title === tag.valor && { color: '#FFF' }]}>{tag.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <MeuInput
              placeholder="Título ou Digite aqui..."
              value={form.title}
              setValor={t => setForm({ ...form, title: t })}
            />
            <Text style={styles.lbl}>Onde você precisa de ajuda?</Text>

            <View style={styles.switchContainer}>
              <Text style={{ flex: 1, color: '#555', fontSize: 14 }}>É na minha localização atual?</Text>
              <Switch
                value={usarLocalAtual}
                onValueChange={toggleLocalAtual}
                trackColor={{ false: "#767577", true: colors.primary }}
                thumbColor={"#f4f3f4"}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={[styles.inputLocation, usarLocalAtual && styles.inputDisabled]}
                  placeholder="Digite o endereço..."
                  value={form.location}
                  onChangeText={t => setForm({ ...form, location: t })}
                  editable={!usarLocalAtual}
                  multiline
                />
              </View>
              <View style={[styles.iconBox, { backgroundColor: usarLocalAtual ? colors.primary : '#ccc' }]}>
                {loadingLocation ? <ActivityIndicator color="#FFF" /> : <MaterialIcons name="my-location" size={24} color="#FFF" />}
              </View>
            </View>

            <Text style={styles.lbl}>Quando você precisa?</Text>

            <TouchableOpacity style={styles.btnAgora} onPress={definirParaAgora}>
              <MaterialIcons name="flash-on" size={20} color="#FFF" />
              <Text style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 5 }}>PRECISO AGORA!</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateBox}>
                <Text style={styles.dateLabel}>Data</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={styles.dateValue}>{dataSelecionada.toLocaleDateString('pt-BR')}</Text>
                  <MaterialIcons name="edit-calendar" size={20} color={colors.primary} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateBox}>
                <Text style={styles.dateLabel}>Hora</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={styles.dateValue}>
                    {dataSelecionada.getHours()}:{dataSelecionada.getMinutes().toString().padStart(2, '0')}
                  </Text>
                  <MaterialIcons name="access-time" size={20} color={colors.primary} />
                </View>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={dataSelecionada}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeDate}
                minimumDate={new Date()}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={dataSelecionada}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeTime}
              />
            )}

            <Text style={styles.lbl}>Explique o problema (Opcional):</Text>
            <TouchableOpacity style={styles.btnVideo} onPress={() => Alert.alert("Em breve", "Função de vídeo será implementada!")}>
              <MaterialIcons name="videocam" size={24} color={colors.primary} />
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>GRAVAR VÍDEO EM LIBRAS</Text>
            </TouchableOpacity>

            <MeuInput
              placeholder="Ou escreva detalhes aqui..."
              value={form.descricao}
              setValor={t => setForm({ ...form, descricao: t })}
            />

            <Text style={styles.lbl}>Nível de Libras Necessário:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form.nivel}
                onValueChange={(itemValue) => setForm({ ...form, nivel: itemValue })}
              >
                <Picker.Item label="Básico" value="basico" />
                <Picker.Item label="Intermediário" value="intermediario" />
                <Picker.Item label="Avançado (Intérprete)" value="avancado" />
              </Picker>
            </View>

            <MeuBotao texto="ENVIAR PEDIDO DE AJUDA" cor={colors.primary} onPress={criar} />

            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <MeuBotao texto="CANCELAR" cor={colors.gray} onPress={() => navigation.goBack()} />
            </View>

          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  box: { padding: 20 },
  lbl: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 5 },

  tag: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  tagSelected: { backgroundColor: colors.primary },
  tagText: { color: colors.primary, fontWeight: 'bold' },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },

  inputLocation: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 50,
    textAlignVertical: 'center'
  },
  inputDisabled: {
    backgroundColor: '#E0E0E0',
    color: '#666'
  },
  iconBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  btnAgora: {
    backgroundColor: '#FF9800',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  dateBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
  },
  dateLabel: { fontSize: 12, color: '#888', marginBottom: 2 },
  dateValue: { fontSize: 16, color: '#333', fontWeight: '500' },

  btnVideo: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
    backgroundColor: '#e3f2fd'
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FFF'
  }
});