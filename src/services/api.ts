import { Linking } from 'react-native';

// MOCKAPI URLS
export const MOCK_USERS = 'https://691fa15831e684d7bfca4a7c.mockapi.io/users';

export const MOCK_REQUESTS = 'https://691fa15831e684d7bfca4a7c.mockapi.io/requests';

interface ViaCepResponse {
  localidade: string;
  erro?: boolean;
}

// Busca CEP
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

// Abrir Google Agenda
export const abrirAgenda = (titulo: string, dataIso: string, local: string) => {
  const data = new Date(dataIso);
  const dataStr = data.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${dataStr}/${dataStr}&location=${local}`;
  Linking.openURL(url);
};