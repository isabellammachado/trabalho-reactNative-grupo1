import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './Styles';
import { colors } from '../../theme/colors';

interface Props extends TextInputProps {
  setValor: (text: string) => void;
}

export default function MeuInput({ setValor, ...rest }: Props) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={setValor}
      placeholderTextColor={colors.gray}
      {...rest}
    />
  );
}