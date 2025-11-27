import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header/Index';
import { styles } from './Style';

export default function VLibrasScreen() {
  return (
    <View style={styles.container}>
      <Header titulo="Ferramenta VLibras" />
      <WebView 
        source={{ uri: 'https://vlibras.gov.br/' }}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#6495ED" style={styles.load} />}
      />
    </View>
  );
}
