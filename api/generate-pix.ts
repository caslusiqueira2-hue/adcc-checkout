import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Memória em cache para persistência durante a sessão/dev local
declare global {
  var __transactionsStore: Map<string, any> | undefined;
}
if (!global.__transactionsStore) {
  global.__transactionsStore = new Map();
}
const memoryStore = global.__transactionsStore;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configuração de cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, client, profileId, creditAmount } = req.body || {};

    const numAmount = Number(amount || 19.90);
    if (!numAmount || numAmount <= 0) {
      return res.status(400).json({ error: 'Valor de depósito inválido' });
    }

    // ==========================================
    // CREDENCIAIS DE INTEGRAÇÃO (SIGILOPAY & BANCO)
    // ==========================================
    const PUBLIC_KEY = process.env.SIGILOPAY_PUBLIC_KEY || '';
    const SECRET_KEY = process.env.SIGILOPAY_SECRET_KEY || '';
    const SUPABASE_URL = process.env.SUPABASE_URL || '';
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    const isSigiloConfigured =
      PUBLIC_KEY &&
      SECRET_KEY &&
      !PUBLIC_KEY.includes('SUA_CHAVE') &&
      !SECRET_KEY.includes('SUA_CHAVE');

    const identifier = 'ord_adcc_' + Math.random().toString(36).substring(2, 12);

    // Sanitização de CPF e Telefone (apenas dígitos)
    const sanitizedPhone = (client?.phone || '').replace(/\D/g, '');
    const sanitizedDoc = (client?.document || '').replace(/\D/g, '');

    // Determina a URL dinâmica do webhook de retorno
    const reqHost = (req.headers['x-forwarded-host'] as string) || (req.headers['host'] as string);
    const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
    const callbackUrl =
      reqHost && !reqHost.includes('localhost')
        ? `${proto}://${reqHost.split(',')[0].trim()}/api/webhook`
        : 'https://app.sigilopay.com.br/api/webhook';

    let pixData: any = null;
    let transactionId = identifier;

    if (isSigiloConfigured) {
      // Chamada oficial à API SigiloPay
      const sigilopayRes = await fetch('https://app.sigilopay.com.br/api/v1/gateway/pix/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-public-key': PUBLIC_KEY,
          'x-secret-key': SECRET_KEY,
        },
        body: JSON.stringify({
          identifier,
          amount: Number(numAmount.toFixed(2)),
          client: {
            name: client?.name || 'Cliente ADCC 2026',
            email: client?.email || 'cliente@email.com',
            phone: sanitizedPhone,
            document: sanitizedDoc,
          },
          metadata: {
            provider: 'ADCC_World_Championship_2026',
            orderId: identifier,
            plan: 'Grupo VIP Telegram - R$ 19,90',
          },
          callbackUrl,
        }),
      });

      if (!sigilopayRes.ok) {
        const errorData: any = await sigilopayRes.json().catch(() => ({}));
        let msg = errorData.message || errorData.details?.error || 'Erro ao gerar PIX na SigiloPay';
        if (
          errorData.details?.error?.includes('Produtor não está ativo') ||
          errorData.message?.includes('not authorized to sell')
        ) {
          msg = 'Conta SigiloPay: Produtor não está ativo. Ative o cadastro no painel app.sigilopay.com.br.';
        }
        throw new Error(msg);
      }

      pixData = await sigilopayRes.json();
      transactionId = pixData.transactionId || identifier;
    } else {
      // Modo de Demonstração / Aguardando Chaves
      // Gera payload Pix dinâmico formatado para permitir teste completo do fluxo de ponta a ponta
      const simulatedPixCode = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2, 18)}520400005303986540519.905802BR5917ADCC VIP 20266009SAO PAULO62070503***6304ABCD`;
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        simulatedPixCode
      )}`;

      pixData = {
        transactionId,
        isTestMode: true,
        message: 'Modo teste ativo (adicione as chaves da SigiloPay no arquivo .env para processar Pix real).',
        pix: {
          code: simulatedPixCode,
          image: qrImageUrl,
        },
      };
    }

    const finalCredit = creditAmount && Number(creditAmount) > 0 ? Number(creditAmount) : numAmount;

    // Salva no banco Supabase se configurado
    let dbData: any = {
      id: transactionId,
      profile_id: profileId || null,
      amount: finalCredit,
      status: 'PENDING',
      sigilopay_id: transactionId,
      pix_code: pixData.pix?.code,
      pix_image: pixData.pix?.image,
      client_name: client?.name,
      client_phone: sanitizedPhone,
      client_document: sanitizedDoc,
      created_at: new Date().toISOString(),
    };

    const isSupabaseConfigured =
      SUPABASE_URL &&
      SUPABASE_SERVICE_ROLE_KEY &&
      !SUPABASE_URL.includes('SUA_URL') &&
      !SUPABASE_SERVICE_ROLE_KEY.includes('SUA_CHAVE');

    if (isSupabaseConfigured) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        const { data, error: dbError } = await supabase
          .from('transactions')
          .insert({
            profile_id: profileId || null,
            amount: finalCredit,
            status: 'PENDING',
            sigilopay_id: transactionId,
            pix_code: pixData.pix?.code,
            pix_image: pixData.pix?.image,
          })
          .select()
          .single();

        if (!dbError && data) {
          dbData = data;
        }
      } catch (err) {
        console.warn('Aviso Supabase:', err);
      }
    }

    // Salva também no cache em memória
    memoryStore.set(transactionId, dbData);

    return res.status(200).json({
      transaction: dbData,
      pix: pixData.pix,
      isTestMode: !isSigiloConfigured,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Erro interno ao processar Pix.' });
  }
}
