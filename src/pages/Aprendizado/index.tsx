import React, { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSenaiSinais} from "../../hooks/useLibras";
import { SenaiSinalApi } from "../../../TiposGerais"
import { styles } from "./style";

export const Aprendizado = () => {
  const { sinais, loading, error, pageAtual, totalPaginas, trocarPagina } = useSenaiSinais(1, 20); 
  const [inputPage, setInputPage] = useState<string>("");

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
