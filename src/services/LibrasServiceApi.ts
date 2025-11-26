
import axios from 'axios';
import { SenaiSinalApi } from '../types/index';


export async function buscarSinaisService(pagina: number, itensPorPagina: number) {
  const response = await axios.get("https://api-senai-libras.senai.br/sinals", {
    params: { page: pagina,      
      itemsPerPage: itensPorPagina,  },
  });

  const data = response.data;

  const novosSinais = data["hydra:member"].map((item: SenaiSinalApi) => ({
    id: item.id,
    titulo: item.titulo,
    descricaoMovimento: item.descricaoMovimento,
  }));
  

  const totalItems = data["hydra:totalItems"] !== undefined ? data["hydra:totalItems"] : null;

  return { sinais: novosSinais, totalItems };
}
