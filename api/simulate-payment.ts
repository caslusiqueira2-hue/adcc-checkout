import type { VercelRequest, VercelResponse } from '@vercel/node';

declare global {
  var __transactionsStore: Map<string, any> | undefined;
}
if (!global.__transactionsStore) {
  global.__transactionsStore = new Map();
}
const memoryStore = global.__transactionsStore;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { transactionId } = req.body || req.query || {};

  if (!transactionId) {
    return res.status(400).json({ error: 'transactionId obrigatório' });
  }

  if (memoryStore.has(transactionId)) {
    const tx = memoryStore.get(transactionId);
    tx.status = 'PAID';
    tx.updated_at = new Date().toISOString();
    memoryStore.set(transactionId, tx);
  } else {
    memoryStore.set(transactionId, {
      id: transactionId,
      status: 'PAID',
      updated_at: new Date().toISOString()
    });
  }

  return res.status(200).json({
    success: true,
    status: 'PAID',
    message: 'Pagamento simulado com sucesso para testes locais!',
    telegramLink: process.env.TELEGRAM_GROUP_LINK || 'https://t.me/+ADCC2026_VIP_OFICIAL'
  });
}
