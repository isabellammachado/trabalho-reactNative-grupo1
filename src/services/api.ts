import { Linking, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';

export const API_KEYUSERS = process.env.EXPO_PUBLIC_URL_MOCKUSERS

export const API_KEY_REQUESTS = process.env.EXPO_PUBLIC_URL_REQUESTS

interface ViaCepResponse {
  localidade: string;
  erro?: boolean;
}

export const buscarCep = async (cep: string): Promise<ViaCepResponse | null> => {
  try {
    const limpo = cep.replace(/\D/g, '');
    if (limpo.length !== 8) return null;
    const req = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
    const json = await req.json();
    if (json.erro) return null;
    return json;
  } catch (e) {
    return null;
  }
};


export const abrirAgenda = async (titulo: string, dataIso: string, local: string) => {

  try {
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Permissão Necessária", "Precisamos de permissão para acessar o calendário nativo. Por favor, conceda acesso nas configurações do aplicativo.");
      return;
    }

    const defaultCalendar = (await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    )).find(c => c.allowsModifications) || null;

    if (!defaultCalendar) {
      Alert.alert("Erro", "Não foi encontrado um calendário editável para salvar o evento.");
      return;
    }
    const dataInicio = new Date(dataIso.replace(' ', 'T'));
    const dataFim = new Date(dataInicio.getTime() + 60 * 60 * 1000);

    if (isNaN(dataInicio.getTime())) {
      Alert.alert("Erro", "A data do pedido não é válida para o calendário nativo.");
      return;
    }

    const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
      title: titulo,
      startDate: dataInicio,
      endDate: dataFim,
      location: local,
      notes: 'Este evento é um compromisso de ajuda via app Mãos que Falam.',

      alarms: [{ relativeOffset: -30 }],
    });

    console.log(`Evento ID ${eventId} criado no calendário nativo.`);


  } catch (error) {
    console.error("ERRO CRÍTICO no Calendar API:", error);
    Alert.alert(
      "Erro",
      "Não foi possível salvar o evento no calendário nativo. O problema pode ser permissão ou a biblioteca.",
      [{ text: "OK" }]
    );
  }
};