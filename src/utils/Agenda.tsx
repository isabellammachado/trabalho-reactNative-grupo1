import { Linking } from 'react-native';

export const abrirCalendario = (titulo, dataIso, local) => {
  // Formata a data para o padrão do Google Calendar (YYYYMMDDTHHMMSS)
  const data = new Date(dataIso);
  const dataString = data.toISOString().replace(/-|:|\.\d\d\d/g,""); 
  
  // Link universal para criar evento
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${dataString}/${dataString}&location=${local}`;

  Linking.openURL(url).catch(err => console.error("Erro ao abrir agenda", err));
};