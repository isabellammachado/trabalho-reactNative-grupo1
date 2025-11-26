
import axios, { AxiosResponse } from 'axios';
import { BatchMessage, SmsDevBatchResponse, SmsDevResponseItem } from '../@types/smsdev';

const SMSDEV_API_URL = 'https://api.smsdev.com.br/v1/send';
export const BASE_KEY = '2JYI2SRQF4M4E6YXN1AL1UY7O8E2GEELW8U9SLWI5JC6U25XLS9UHFSQSCKJ76CCDHE6SVFTKNRVW35A1OWYU7CPLFSZS9UI0QCNXLR6G1QDJY1T1HH1DP1YW65K4ACL' ;
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
