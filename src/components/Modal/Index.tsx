import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import { styles } from './Styles';
import { colors } from '../../theme/colors';

// Definindo o tipo da propriedade (Props)
interface Props {
  visivel: boolean;
}

export default function LoadingModal({ visivel }: Props) {
  return (
    <Modal transparent visible={visivel} animationType="fade">
      <View style={styles.fundo}>
        <View style={styles.card}>
          {/* Usando a cor secundária (Laranja) definida no tema */}
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      </View>
    </Modal>
  );
}