import axios, { AxiosResponse } from 'axios';
import { BatchMessage, SmsDevBatchResponse, SmsDevResponseItem } from '../@types/smsdev'; 

const SMSDEV_API_URL = 'https://api.smsdev.com.br/v1/send'; 

export const sendBatchAlerts = async (
    alertsToSend: BatchMessage[]
): Promise<boolean> => {
    
    try {
        const response: AxiosResponse<SmsDevBatchResponse> = await axios.post(
            SMSDEV_API_URL, 
            alertsToSend, 
            {
                headers: { 
                    'Content-Type': 'application/json' 
                }
            }
        );

        const responseArray = Array.isArray(response.data) ? response.data : [response.data];
        let sucessoTotal = true;
        
        responseArray.forEach((item: SmsDevResponseItem) => {
            if (item.statusCode !== '001') {
                sucessoTotal = false;
            }
        });
        
        return sucessoTotal;

    } catch (error) {
        return false;
    }
};