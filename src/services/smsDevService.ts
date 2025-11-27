import axios, { AxiosResponse } from 'axios';
import { BatchMessage, SmsDevBatchResponse, SmsDevResponseItem } from '../@types/smsdev';

const SMSDEV_API_URL = 'https://api.smsdev.com.br/v1/send';

// Substitua pela sua chave real da SMSDev
export const BASE_KEY = 'SUA_CHAVE_DE_API_AQUI';

export const sendBatchAlerts = async (
    alertsToSend: BatchMessage[]
): Promise<boolean> => {
    try {
        const response: AxiosResponse<SmsDevBatchResponse> = await axios.post(
            SMSDEV_API_URL,
            alertsToSend,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${BASE_KEY}`
                }
            }
        );

        const responseArray = response.data;

        const sucessoTotal = responseArray.every(
            (item: SmsDevResponseItem) => item.statusCode === "001" || item.statusCode === "1"
        );

        if (!sucessoTotal) {
            console.warn("Alguns alertas falharam:", responseArray);
        }

        return sucessoTotal;

    } catch (error) {
        console.error("Erro ao enviar alertas:", error);
        return false;
    }
};