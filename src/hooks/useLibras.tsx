import { useState, useEffect } from "react";
import { SenaiSinalApi } from './../types';
import { buscarSinaisService } from "../services/LibrasServiceApi";


export const useSenaiSinais = (paginaInicial = 1, itensPorPagina = 20) => {
  const [sinais, setSinais] = useState< SenaiSinalApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageAtual, setPage] = useState(paginaInicial);
  const [totalPaginas, setTotalPaginas] = useState<number | null>(null);

  const fetchSinais = async (paginaEscolhida= pageAtual) => {
    setLoading(true);
    setError(null); 

    try {
      const { sinais: novosSinais, totalItems } = await buscarSinaisService(paginaEscolhida, itensPorPagina);
      setSinais(novosSinais as SenaiSinalApi[]);

      if (totalItems !== null && totalItems !== undefined) {
        setTotalPaginas(Math.ceil(totalItems / itensPorPagina));
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
    console.log("Total Paginas:", totalPaginas);
    console.log("SINAIS NA TELA:", sinais);

    setPage(novaPagina);
  };


  useEffect(() => {
    fetchSinais(pageAtual);
  }, [pageAtual]);

  return { sinais, loading, error, pageAtual, totalPaginas, trocarPagina };
};




