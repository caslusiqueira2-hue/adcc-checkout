-- =========================================================
-- SETUP DO BANCO DE DADOS SUPABASE - ADCC CHECKOUT SIGILOPAY
-- =========================================================

-- 1. Cria a tabela de transações Pix
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  profile_id UUID,
  amount NUMERIC NOT NULL DEFAULT 19.90,
  status TEXT NOT NULL DEFAULT 'PENDING',
  sigilopay_id TEXT,
  pix_code TEXT,
  pix_image TEXT,
  client_name TEXT,
  client_phone TEXT,
  client_document TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilita escuta em Tempo Real (Realtime) na tabela
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;

-- 3. Configura políticas de segurança (RLS) para permitir que o cliente acompanhe seu pagamento
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Permite que o frontend (anon) e backend leiam o status da transação
CREATE POLICY "Permitir leitura publica de status"
ON public.transactions FOR SELECT
TO anon, authenticated
USING (true);

-- Permite que o backend (service_role) crie e atualize as transações
CREATE POLICY "Permitir insercao e atualizacao total para servico"
ON public.transactions FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
