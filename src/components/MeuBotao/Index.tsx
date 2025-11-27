import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './Styles';
import { colors } from '../../theme/colors';

interface Props extends TouchableOpacityProps {
  texto: string;
  cor?: string;
}

export default function MeuBotao({ texto, cor = colors.primary, ...rest }: Props) {
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: cor }]} activeOpacity={0.8} {...rest}>
      <Text style={[styles.txt, { color: colors.white }]}>{texto}</Text>
    </TouchableOpacity>
  );
}