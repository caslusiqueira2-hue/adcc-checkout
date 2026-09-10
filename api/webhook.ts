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
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { transactionId, status, id } = req.body || {};
    const txId = transactionId || id;

    if (!txId || !status) {
      return res.status(400).json({ error: 'Payload de webhook inválido' });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL || '';
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const isSupabaseConfigured =
      SUPABASE_URL &&
      SUPABASE_SERVICE_ROLE_KEY &&
      !SUPABASE_URL.includes('SUA_URL') &&
      !SUPABASE_SERVICE_ROLE_KEY.includes('SUA_CHAVE');

    // 1. Atualiza no cache de memória
    if (memoryStore.has(txId)) {
      const stored = memoryStore.get(txId);
      stored.status = (status === 'OK' || status === 'PAID') ? 'PAID' : status;
      stored.updated_at = new Date().toISOString();
      memoryStore.set(txId, stored);
    } else {
      memoryStore.set(txId, {
        id: txId,
        status: (status === 'OK' || status === 'PAID') ? 'PAID' : status,
        updated_at: new Date().toISOString()
      });
    }

    // 2. Quando aprovado/pago na SigiloPay e Supabase ativo
    if (isSupabaseConfigured) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

      if (status === 'OK' || status === 'PAID') {
        const { data: tx, error: txError } = await supabase
          .from('transactions')
          .select('*')
          .eq('sigilopay_id', txId)
          .eq('status', 'PENDING')
          .single();

        if (!txError && tx) {
          // Marca a transação como PAGA
          await supabase
            .from('transactions')
            .update({ status: 'PAID', updated_at: new Date().toISOString() })
            .eq('id', tx.id);

          // Credita o saldo na conta do usuário (se profile_id existir)
          if (tx.profile_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('balance')
              .eq('id', tx.profile_id)
              .single();

            if (profile) {
              const newBalance = Number(profile.balance || 0) + Number(tx.amount || 0);
              await supabase
                .from('profiles')
                .update({ balance: newBalance })
                .eq('id', tx.profile_id);
            }
          }
        }
      } else {
        await supabase
          .from('transactions')
          .update({ status: status, updated_at: new Date().toISOString() })
          .eq('sigilopay_id', txId);
      }
    }

    return res.status(200).json({ received: true, status: 'PAID', transactionId: txId });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
