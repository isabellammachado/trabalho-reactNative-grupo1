export type BatchMessage = {
    key?: 's2JYI2SRQF4M4E6YXN1AL1UY7O8E2GEELW8U9SLWI5JC6U25XLS9UHFSQSCKJ76CCDHE6SVFTKNRVW35A1OWYU7CPLFSZS9UI0QCNXLR6G1QDJY1T1HH1DP1YW65K4ACL';      
    type: 9;     
    number: 41999407148;   
    msg: "Solicitacao de ajuda, verifique o aplicativo.";      
};

export type SmsDevResponseItem = {
    statusCode: "001" | "1" | string;                  
    statusDescription: string;
    id?: string;
    situacao?: "OK" | "ERRO" | string;
};

export type SmsDevBatchResponse = SmsDevResponseItem[];