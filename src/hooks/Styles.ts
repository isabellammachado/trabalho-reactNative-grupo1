import { useState, useEffect } from "react";
import axios from "axios";
import { SenaiSinal } from "../types"; // Importando do nosso arquivo central

export const useSenaiSinais = (paginaInicial = 1, itensPorPagina = 20) => {
  const [sinais, setSinais] = useState<SenaiSinal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageAtual, setPage] = useState(paginaInicial);
  const [totalPaginas, setTotalPaginas] = useState<number | null>(null);

  const fetchSinais = async (paginaEscolhida = pageAtual) => {
    setLoading(true);
    setError(null);

    try {
      // URL direta da API
      const response = await axios.get('https://api-senai-libras.senai.br/sinals', {
        params: {
          page: paginaEscolhida,
          itemsPerPage: itensPorPagina, // Ajustei o nome do param para o padrão da API Hydra
        },
      });

      const data = response.data;

      // Mapeando os dados que vem da API
      const novosSinais: SenaiSinal[] = data["hydra:member"].map((item: any) => ({
        id: item.id,
        titulo: item.titulo,
        descricaoMovimento: item.descricaoMovimento,
      }));

      setSinais(novosSinais);

      // Calculando total de páginas
      if (data["hydra:totalItems"] !== undefined) {
        setTotalPaginas(Math.ceil(data["hydra:totalItems"] / itensPorPagina));
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar sinais do SENAI.");
    } finally {
      setLoading(false);
    }
  };

  const trocarPagina = (novaPagina: number) => {
    if (novaPagina < 1) return;
    if (totalPaginas && novaPagina > totalPaginas) return;
    setPage(novaPagina);
  };

  useEffect(() => {
    fetchSinais(pageAtual);
  }, [pageAtual]);

  return { sinais, loading, error, pageAtual, totalPaginas, trocarPagina };
};