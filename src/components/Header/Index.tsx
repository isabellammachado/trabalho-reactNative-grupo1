import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './Styles';
import FloatingAlert from '../FloatingAlert/Index';
import { SurdoAlert } from '../../@types/alerts';
import { AuthContext } from '../../hooks/AuthContext';

interface HeaderProps {
    titulo: string;
    alertCount?: number; 
}

export default function Header({ titulo, alertCount }: HeaderProps) {
  const {user} = useContext(AuthContext);
  const [mostrarAlert, setMostrarAlert] = useState(true);

  const alerta: SurdoAlert = {
    id: "1",
    mensagem: "Alerta simples",
    hora: new Date().toLocaleTimeString()
  };

  return (
    <View style={styles.box}>
      <Text style={styles.txt}>{titulo}</Text>

      {mostrarAlert && user?.role === 'voluntario' && (
      <FloatingAlert 
        alertData={alerta} 
        onDismiss={() => setMostrarAlert(false)}
        />
      )}
      {alertCount > 0 && (
        <View style={styles.alertBadge}>
          <Text style={styles.alertBadgeText}>{alertCount}</Text>
        </View>
      )}
      
    </View>
  );
}