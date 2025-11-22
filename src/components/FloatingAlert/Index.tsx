import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './Styles';
import { SurdoAlert } from '../../@types/alerts';

interface FloatingAlertProps {
    alertData: SurdoAlert;
    onDismiss: () => void;
}

export default function FloatingAlert({ alertData, onDismiss }: FloatingAlertProps) {
    
    const handlePress = () => {
        Alert.alert(
            "Alerta Urgente",
            `Atendendo pedido Urgente ID: ${alertData.id}. O ALERTA SERÁ FECHADO.`,
            [
                { text: "Cancelar" },
                { 
                    text: "Confirmar Atendimento", 
                    onPress: onDismiss,
                    style: 'destructive'
                }
            ]
        );
    };

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.9}
        >
            <Text style={styles.text}>
                🚨 URGENTE: Solicitação de Usuário Surdo!
            </Text>
            <Text style={styles.time}>
                Recebido às {alertData.hora}
            </Text>
            <Text style={styles.time}>
                (Toque para confirmar o atendimento)
            </Text>
        </TouchableOpacity>
    );
}