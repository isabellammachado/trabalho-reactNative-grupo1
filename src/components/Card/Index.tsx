import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Styles';
import MeuBotao from '../MeuBotao/Index';
import { Pedido } from '../../types';
import { colors } from '../../theme/colors';

interface Props {
  item: Pedido;
  onAceitar: () => void;
  esconderBotao?: boolean;
}

export default function CardPedido({ item, onAceitar, esconderBotao }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.title}</Text>
      <Text style={styles.info}>📍 {item.location}</Text>
      <Text style={styles.info}>📅 {new Date(item.data_agendamento).toLocaleString()}</Text>
      
      <View style={styles.tag}>
        <Text style={styles.tagTxt}>Nível: {item.nivel_necessario}</Text>
      </View>

      {!esconderBotao && (
        <MeuBotao 
          texto="AGENDAR AJUDA" 
          cor={colors.success} 
          onPress={onAceitar} 
        />
      )}
    </View>
  );
}