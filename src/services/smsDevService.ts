
import axios, { AxiosResponse } from 'axios';
import { BatchMessage, SmsDevBatchResponse, SmsDevResponseItem } from '../@types/smsdev';

const API_KEY_SMS = process.env.EXPO_PUBLIC_URL_SMS
export const API_KEY = process.env.EXPO_PUBLIC_URL_KEYSMS
export const sendBatchAlerts = async (
    alertsToSend: BatchMessage[]
): Promise<boolean> => {
    try {
        const response: AxiosResponse<SmsDevBatchResponse> = await axios.post(
            API_KEY_SMS ,
            alertsToSend,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
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
