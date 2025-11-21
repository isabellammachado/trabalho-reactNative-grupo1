import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header/Index';

export default function VLibrasScreen() {
  return (
    <View style={styles.container}>
      <Header titulo="Ferramenta VLibras" />
      {/* Carrega o site oficial do governo que contém o widget */}
      <WebView 
        source={{ uri: 'https://vlibras.gov.br/' }}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#6495ED" style={styles.load} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  load: { position: 'absolute', top: '50%', left: '45%' }
});