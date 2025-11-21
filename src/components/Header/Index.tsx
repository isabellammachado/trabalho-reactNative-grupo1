import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Styles';

export default function Header({ titulo }: { titulo: string }) {
  return (
    <View style={styles.box}>
      <Text style={styles.txt}>{titulo}</Text>
    </View>
  );
}