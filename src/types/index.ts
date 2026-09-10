export interface ClientData {
  name: string;
  email: string;
  phone: string;
  document: string;
}

export interface PixRequest {
  amount: number;
  creditAmount?: number;
  client: ClientData;
  profileId?: string;
}

export interface PixResponse {
  transaction: {
    id: string;
    status: string;
    amount: number;
    sigilopay_id?: string;
  };
  pix: {
    code: string;
    image?: string;
  };
  isTestMode?: boolean;
  telegramLink?: string;
}

export interface StatusCheckResponse {
  status: 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED';
  transaction?: any;
  telegramLink?: string;
}
