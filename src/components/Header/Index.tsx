import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './Styles';

interface HeaderProps {
    titulo: string;
    alertCount: number; 
}

export default function Header({ titulo, alertCount }: HeaderProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.txt}>{titulo}</Text>
      
      {}
      {alertCount > 0 && (
        <View style={styles.alertBadge}>
          <Text style={styles.alertBadgeText}>{alertCount}</Text>
        </View>
      )}
      
    </View>
  );
}