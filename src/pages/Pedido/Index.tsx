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
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './Styles';

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
  const [enviando, setEnviando] = useState(false);

  const [cidadeGPS, setCidadeGPS] = useState('');

  const [videoUri, setVideoUri] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    location: '',
    nivel: 'basico',
    descricao: ''
  });

  const gravarVideo = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão', 'Precisamos de acesso à câmera.');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      videoMaxDuration: 60,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setVideoUri(result.assets[0].uri);
      Alert.alert("Sucesso", "Vídeo gravado!");
    } else if (!result.canceled) {
      setVideoUri(null);
    }
  };

  const definirParaAgora = () => {
    setDataSelecionada(new Date());
    Alert.alert("Pronto!", "Data e hora definidos para AGORA.");
  };

  const obterLocalizacaoAtual = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Ative o GPS.');
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
        const enderecoFormatado = `${item.street || ''}, ${item.streetNumber || 'S/N'} - ${item.district || ''}`;

        if (item.subregion) setCidadeGPS(item.subregion);
        else if (item.city) setCidadeGPS(item.city);

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

    setEnviando(true);

    let cidadeFinal = (usarLocalAtual && cidadeGPS) ? cidadeGPS : user.cidade;

    if (!cidadeFinal) cidadeFinal = 'Não informada';

    const dataToSend = {
      ...form,
      cidade: cidadeFinal,
      data_agendamento: dataSelecionada.toISOString(),
      nivel_necessario: form.nivel,
      userId: user.id || 1,
      status: 'aberto',
      video_url: videoUri,
    };

    console.log("ENVIANDO PEDIDO PARA:", cidadeFinal);

    try {
      const response = await fetch(MOCK_REQUESTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) throw new Error(`Status ${response.status}`);

      Alert.alert("Sucesso", "Ajuda solicitada! Aguarde um SMS do voluntário.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Falha ao criar pedido");
    } finally {
      setEnviando(false);
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
              <Text style={{ flex: 1, color: '#555', fontSize: 14 }}>
                {usarLocalAtual ? "Usando GPS (Desative para digitar)" : "Digitar endereço manualmente"}
              </Text>
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
                  placeholder="Digite o endereço completo..."
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

            <TouchableOpacity style={styles.btnVideo} onPress={gravarVideo}>
              <MaterialIcons name="videocam" size={24} color={colors.primary} />
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                {videoUri ? 'VÍDEO GRAVADO (Clique para refazer)' : 'GRAVAR VÍDEO EM LIBRAS'}
              </Text>
            </TouchableOpacity>

            {videoUri && (
              <Text style={{ color: 'green', marginBottom: 10 }}>✅ Vídeo pronto para envio.</Text>
            )}

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

            <MeuBotao
              texto={enviando ? "ENVIANDO..." : "ENVIAR PEDIDO DE AJUDA"}
              cor={colors.primary}
              onPress={criar}
              disabled={enviando}
            />

            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <MeuBotao texto="CANCELAR" cor={colors.gray} onPress={() => navigation.goBack()} />
            </View>

          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
