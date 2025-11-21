import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import { useSenaiSinais } from '../../hooks/Index';
import { styles } from '../Dicionario/Styles';
import Header from '../../components/Header/Index';
import { colors } from '../../theme/colors';

export default function DicionarioScreen() {
  const { sinais, loading, pageAtual, trocarPagina, totalPaginas } = useSenaiSinais();

  return (
    <View style={{ flex: 1 }}>
      <Header titulo="Dicionário SENAI" />
      
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loading} />
        ) : (
          <>
            <FlatList
              data={sinais}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.titulo}>{item.titulo}</Text>
                  <Text style={styles.descricao}>{item.descricaoMovimento}</Text>
                </View>
              )}
            />
            
            {/* Paginação Simples */}
            <View style={styles.controles}>
              <Button title="Anterior" onPress={() => trocarPagina(pageAtual - 1)} disabled={pageAtual === 1} />
              <Text style={styles.paginacao}>Pág {pageAtual} de {totalPaginas}</Text>
              <Button title="Próximo" onPress={() => trocarPagina(pageAtual + 1)} disabled={pageAtual === totalPaginas} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}