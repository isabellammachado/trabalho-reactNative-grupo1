import React, { useContext } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './Styles';
import { SurdoAlert } from '../../@types/alerts';
import { BatchMessage } from '../../@types/smsdev';
import { BASE_KEY, sendBatchAlerts } from '../../services/smsDevService';
import { AuthContext } from '../../hooks/AuthContext';

interface FloatingAlertProps {
    alertData: SurdoAlert; 
    onDismiss: () => void; 
}

export default function FloatingAlert({ alertData, onDismiss }: FloatingAlertProps) {
    const { user } = useContext(AuthContext);
    const telefoneDoUsuario = user?.telefone;

    const handlePress = () => {
        const alertsToSend: BatchMessage[] = [
            {
                key: BASE_KEY,
                type: 9,
                number: telefoneDoUsuario,
                msg: `🚨 URGENTE: Solicitação de usuário surdo! ID: ${alertData.id}`
            }
        ];

        Alert.alert(
            "Alerta Urgente",
            `Atendendo pedido Urgente ID: ${alertData.id}.`,
            [
                {
                    text: "Fechar Alerta",
                    onPress: () => {
                        onDismiss();
                    },
                    style: "cancel"
                },
                {
                    text: "Confirmar Atendimento",
                    onPress: async () => {
                        const sucesso = await sendBatchAlerts(alertsToSend);

                        if (sucesso) {
                            Alert.alert("Sucesso", "Notificação enviada com sucesso.");
                        } else {
                            Alert.alert("Erro", "Falha ao enviar notificação.");
                        }

                        onDismiss();
                    },
                    style: "destructive"
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
            {}
            <Text style={styles.text}>
                🚨 URGENTE: Solicitação de Usuário Surdo!
            </Text>

            {}
            <Text style={styles.time}>
                Recebido às {alertData.hora}
            </Text>

            {}
            <Text style={styles.time}>
                (Toque para confirmar o atendimento)
            </Text>
        </TouchableOpacity>
    );
}