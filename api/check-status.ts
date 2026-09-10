import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const transactionId = (req.query.transactionId as string) || (req.query.id as string);

  if (!transactionId) {
    return res.status(400).json({ error: 'transactionId obrigatório' });
  }

  // 1. Verifica no cache em memória
  if (memoryStore.has(transactionId)) {
    const tx = memoryStore.get(transactionId);
    return res.status(200).json({
      status: tx.status,
      transaction: tx,
      telegramLink: process.env.TELEGRAM_GROUP_LINK || 'https://t.me/+ADCC2026_VIP_OFICIAL'
    });
  }

  // 2. Verifica no Supabase caso configurado
  const SUPABASE_URL = process.env.SUPABASE_URL || '';
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const isSupabaseConfigured =
    SUPABASE_URL &&
    SUPABASE_SERVICE_ROLE_KEY &&
    !SUPABASE_URL.includes('SUA_URL') &&
    !SUPABASE_SERVICE_ROLE_KEY.includes('SUA_CHAVE');

  if (isSupabaseConfigured) {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const { data: tx } = await supabase
        .from('transactions')
        .select('*')
        .or(`id.eq.${transactionId},sigilopay_id.eq.${transactionId}`)
        .single();

      if (tx) {
        return res.status(200).json({
          status: tx.status,
          transaction: tx,
          telegramLink: process.env.TELEGRAM_GROUP_LINK || 'https://t.me/+ADCC2026_VIP_OFICIAL'
        });
      }
    } catch (e) {
      console.warn('Erro ao consultar Supabase:', e);
    }
  }

  return res.status(200).json({
    status: 'PENDING',
    telegramLink: process.env.TELEGRAM_GROUP_LINK || 'https://t.me/+ADCC2026_VIP_OFICIAL'
  });
}
