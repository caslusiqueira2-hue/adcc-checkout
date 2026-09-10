import type { PixRequest, PixResponse, StatusCheckResponse } from '../types';

export type { PixRequest, PixResponse };

export async function generatePix(data: PixRequest): Promise<PixResponse> {
  const response = await fetch('/api/generate-pix', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok || responseData.error) {
    throw new Error(responseData.error || 'Erro ao gerar cobrança Pix.');
  }

  return responseData;
}

export async function checkPaymentStatus(transactionId: string): Promise<StatusCheckResponse> {
  const response = await fetch(`/api/check-status?transactionId=${encodeURIComponent(transactionId)}`);
  if (!response.ok) {
    throw new Error('Falha ao verificar status do pagamento');
  }
  return response.json();
}

export async function simulatePaymentDev(transactionId: string): Promise<any> {
  const response = await fetch('/api/simulate-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transactionId }),
  });
  return response.json();
}
