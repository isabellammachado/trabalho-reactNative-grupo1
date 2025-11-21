
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glossário de Sinais</Text>
      <Text style={styles.subtitle}>Digite uma palavra para ver o sinal em LIBRAS.</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Você precisa de ajuda?"
        value={textoATraduzir}
        onChangeText={setTextoATraduzir}
        onSubmitEditing={handleTranslate}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleTranslate} 
        disabled={traducao.loading}
      >
        {traducao.loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>VER SINAL</Text>
        )}
      </TouchableOpacity>

      <View style={styles.videoContainer}>
        {traducao.loading && (
          <Text style={styles.textoStatus}>Buscando sinal para "{traducao.texto}"...</Text>
        )}

        {traducao.videoUrl && !traducao.loading && (
          <>
            <Text style={styles.textoResultado}>Sinal para: {traducao.texto}</Text>

           
            <Video
              source={{ uri: traducao.videoUrl }}
              style={styles.videoPlayer}
              useNativeControls
              shouldPlay
            />

            <Text style={styles.TextoMock}>
              URL do Sinal (Mock): {traducao.videoUrl}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};
