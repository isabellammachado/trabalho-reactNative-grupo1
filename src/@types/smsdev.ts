export type BatchMessage = {
    key: string;      
    type: number;     
    number: string;   
    msg: string;      
};

export type SmsDevResponseItem = {
    statusCode: "001" | string;                  
    statusDescription: string;
    id?: string;
    situacao?: "OK" | "ERRO" | string;
};

export type SmsDevBatchResponse = SmsDevResponseItem[];