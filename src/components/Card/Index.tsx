import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import MeuBotao from '../MeuBotao/Index';
import { Pedido } from '../../types';
import { colors } from '../../theme/colors';

interface Props {
  item: Pedido;
  onAceitar: () => void;
  esconderBotao?: boolean;
  openCard: () => void; 
}

export default function CardPedido({ item, onAceitar, esconderBotao, openCard }: Props) {
  return (
    <TouchableOpacity onPress={openCard} style={styles.card}>
    <View >
      <Text style={styles.titulo}>{item.title}</Text>
      
      <Text style={styles.info}>📅 {new Date(item.data_agendamento).toLocaleString()}</Text>

      <Text style={styles.info}>📍 {item.location || "Local não informado"}</Text>

      {!esconderBotao && (
        <MeuBotao 
          texto="AGENDAR AJUDA" 
          cor={colors.success} 
          onPress={onAceitar} 
        />
      )}
    </View>
    </TouchableOpacity>
  );
}