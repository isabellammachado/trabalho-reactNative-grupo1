import { useState, useEffect } from "react";
import axios from "axios";
import { SenaiSinal } from "../types/index";

const API_URL = 'https://api-senai-libras.senai.br/sinals';

export const useSenaiSinais = (paginaInicial = 1, itensPorPagina = 20) => {
  const [sinais, setSinais] = useState<SenaiSinal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageAtual, setPage] = useState(paginaInicial);
  const [totalPaginas, setTotalPaginas] = useState<number | null>(null);

  const fetchSinais = async (paginaEscolhida= pageAtual) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get( 'https://api-senai-libras.senai.br/sinals' , {
        params: {
          page: paginaEscolhida,
          itensPorPagina,
        },
      });

      const data = response.data;

      const novosSinais: SenaiSinal[] = data["hydra:member"].map((item: any) => ({
        id: item.id,
        titulo: item.titulo,
        descricaoMovimento: item.descricaoMovimento,
      }));

      setSinais(novosSinais);

    
      if (data["hydra:totalItems"] !== undefined) {
        setTotalPaginas(Math.ceil(data["hydra:totalItems"] / itensPorPagina ));
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar sinais.");
    } finally {
      setLoading(false);
    }
  };

  const trocarPagina  = (novaPagina: number) => {
    if (novaPagina < 1) return;
    if (totalPaginas && novaPagina > totalPaginas) return;
    setPage(novaPagina);
  };


  useEffect(() => {
    fetchSinais(pageAtual);
  }, [pageAtual]);

  return { sinais, loading, error, pageAtual, totalPaginas, trocarPagina };
};