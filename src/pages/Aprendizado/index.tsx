import React, { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from "react-native";
import { useSenaiSinais} from "../../hooks/useLibras";
import { SenaiSinalApi } from "../../../TiposGerais"
import { styles } from "./style";

<<<<<<< HEAD:src/pages/Aprendizado/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Video } from 'expo-av';
import { VLibrasTranslation } from '../../pages/VLibras/VLibrasPages';
import { styles } from './style';



export const Aprendizado: React.FC = () => {
  const [textoATraduzir, setTextoATraduzir] = useState<string>('');
  const [traducao, setTraducao] = useState<VLibrasTranslation>({
    texto: '',
    videoUrl: null,
    loading: false,
  });

  const handleTranslate = async () => {
    if (!textoATraduzir.trim()) {
      Alert.alert('Atenção', 'Digite uma palavra ou frase para saber o seu sinal em LIBRAS.');
      return;
    }

    setTraducao({ texto: textoATraduzir, videoUrl: null, loading: true });

    try {
      const mockVideoUrl = `https://vlibras.gov.br/video/${textoATraduzir.toLowerCase().replace(/\s/g, '_')}.mp4`;

      await new Promise(resolve => setTimeout(resolve, 1500));

      setTraducao({
        texto: textoATraduzir,
        videoUrl: mockVideoUrl,
        loading: false,
      });

    } catch (error) {
      console.error('Erro ao buscar sinal LIBRAS:', error);
      Alert.alert('Erro', 'Não foi possível buscar o sinal. Tente novamente.');
      setTraducao({ texto: '', videoUrl: null, loading: false });
    }
  };
=======
export const Aprendizado = () => {
  const { sinais, loading, error, pageAtual, totalPaginas, trocarPagina } = useSenaiSinais(1, 20); 
  const [inputPage, setInputPage] = useState<string>("");
>>>>>>> main:maos-que-falam/src/pages/Aprendizado/index.tsx

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glossário de Sinais</Text>

      {loading && <ActivityIndicator size="large" color="#0ea173" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <ScrollView style={styles.scrollView}>
        {sinais.length === 0 && !loading && !error && (
          <Text style={styles.infoText}>Nenhum sinal encontrado.</Text>
        )}

        {sinais.map((sinal: SenaiSinalApi ) => (
          <View key={sinal.id} style={styles.infoContainer}>
            <Text style={styles.textoResultado}>{sinal.titulo}</Text>
            {sinal.descricaoMovimento && (
              <Text style={styles.descricaoTexto}>{sinal.descricaoMovimento}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.paginacaoContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => trocarPagina(pageAtual - 1)}
          disabled={pageAtual <= 1 || loading}
        >
          <Text style={styles.buttonTexto}>Anterior</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={inputPage}
          onChangeText={setInputPage}
          onSubmitEditing={() => {
            const numeroPagina = parseInt(inputPage);
            if (!isNaN(numeroPagina )) trocarPagina(numeroPagina);
          }}
          placeholder={pageAtual.toString()}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => trocarPagina(pageAtual + 1)}
          disabled={totalPaginas !== null && pageAtual >= totalPaginas || loading}
        >
          <Text style={styles.buttonTexto}>Próxima</Text>
        </TouchableOpacity>
      </View>

      {totalPaginas !== null && (
        <Text style={styles.infoText}>
          Página {pageAtual} de {totalPaginas}
        </Text>
      )}
    </View>
  );
};
