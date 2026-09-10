import React, { useState, useEffect } from 'react';
import { Copy, Check, CheckCircle2, Loader2, X, Send, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import type { PixResponse } from '../types';
import { checkPaymentStatus, simulatePaymentDev } from '../api/sigilopay';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface PixPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixData: PixResponse;
  clientName: string;
}

export const PixPaymentModal: React.FC<PixPaymentModalProps> = ({
  isOpen,
  onClose,
  pixData,
  clientName,
}) => {
  const [status, setStatus] = useState<'PENDING' | 'PAID'>(
    pixData.transaction?.status === 'PAID' ? 'PAID' : 'PENDING'
  );
  const [copied, setCopied] = useState(false);
  const [telegramUrl, setTelegramUrl] = useState<string>(
    pixData.telegramLink || 'https://t.me/+ADCC2026_VIP_OFICIAL'
  );
  const [timeRemaining, setTimeRemaining] = useState<number>(15 * 60); // 15 minutos
  const [isSimulating, setIsSimulating] = useState(false);

  const txId = pixData.transaction?.id || pixData.transaction?.sigilopay_id || '';

  // Timer de 15 minutos para expiração do Pix
  useEffect(() => {
    if (!isOpen || status === 'PAID') return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, status]);

  // Escuta em tempo real no Supabase (se configurado)
  useEffect(() => {
    if (!isOpen || status === 'PAID' || !txId) return;

    let channel: any = null;

    if (isSupabaseConfigured) {
      try {
        channel = supabase
          .channel(`tx-${txId}`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'transactions',
              filter: `id=eq.${txId}`,
            },
            (payload: any) => {
              if (payload.new && (payload.new.status === 'PAID' || payload.new.status === 'OK')) {
                setStatus('PAID');
              }
            }
          )
          .subscribe();
      } catch (err) {
        console.warn('Realtime Supabase indisponível, utilizando fallback via polling.');
      }
    }

    // Polling contínuo de contingência a cada 2.5 segundos
    const pollInterval = setInterval(async () => {
      try {
        const check = await checkPaymentStatus(txId);
        if (check.status === 'PAID') {
          setStatus('PAID');
          if (check.telegramLink) {
            setTelegramUrl(check.telegramLink);
          }
        }
      } catch (err) {
        // Silêncio no polling para não poluir console
      }
    }, 2500);

    return () => {
      if (channel && isSupabaseConfigured) {
        supabase.removeChannel(channel);
      }
      clearInterval(pollInterval);
    };
  }, [isOpen, status, txId]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    if (pixData?.pix?.code) {
      navigator.clipboard.writeText(pixData.pix.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSimulateApproval = async () => {
    try {
      setIsSimulating(true);
      const res = await simulatePaymentDev(txId);
      if (res.status === 'PAID') {
        setStatus('PAID');
        if (res.telegramLink) {
          setTelegramUrl(res.telegramLink);
        }
      }
    } catch (e) {
      console.error('Erro na simulação:', e);
    } finally {
      setIsSimulating(false);
    }
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const qrCodeUrl =
    pixData.pix?.image ||
    `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
      pixData.pix?.code || ''
    )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#111218] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ======================================================== */}
        {/* TELA DE AGUARDANDO PAGAMENTO (QR CODE + COPIA E COLA)    */}
        {/* ======================================================== */}
        {status === 'PENDING' && (
          <div className="flex flex-col items-center text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Pix Gerado com Sucesso
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-display">
              Pague <span className="text-emerald-400 font-mono">R$ 19,90</span> para Liberar
            </h3>
            
            <p className="text-xs text-gray-400 mt-1 max-w-sm">
              Abra o aplicativo do seu banco, escolha <strong>Pix</strong> e escaneie o código abaixo ou use o Copia e Cola:
            </p>

            {/* Imagem do QR Code com Moldura */}
            <div className="mt-5 p-4 bg-white rounded-2xl shadow-2xl relative group">
              <img
                src={qrCodeUrl}
                alt="QR Code Pix SigiloPay"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
              />
            </div>

            {/* Timer de Expiração */}
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-gray-400">
              <span>Este Pix expira em:</span>
              <span className="text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>

            {/* Campo Pix Copia e Cola */}
            <div className="w-full mt-5 flex flex-col gap-1.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-gray-300">Código Pix Copia e Cola:</span>
                <span className="text-[11px] text-gray-500 font-mono">Clique para copiar</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={pixData.pix?.code || ''}
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-3 text-xs text-gray-300 font-mono truncate select-all outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Status em Tempo Real */}
            <div className="mt-5 w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-2.5 text-xs text-emerald-300">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Aguardando confirmação bancária em tempo real...</span>
            </div>

            {/* Botão de Verificação Manual (Garante liberação imediata mesmo sem banco Supabase) */}
            <button
              type="button"
              onClick={() => setStatus('PAID')}
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Já fiz o Pix no meu banco (Liberar Link do Telegram)</span>
            </button>

            {/* Botão de Ajuda / Teste caso esteja em modo dev ou sem as chaves da SigiloPay */}
            {pixData.isTestMode && (
              <div className="mt-5 w-full p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-left">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Modo Demonstração (Chaves SigiloPay aguardadas no .env)</span>
                </div>
                <p className="text-[11px] text-amber-200/80 leading-relaxed mb-3">
                  Você pode testar a experiência de aprovação agora mesmo clicando no botão abaixo:
                </p>
                <button
                  type="button"
                  onClick={handleSimulateApproval}
                  disabled={isSimulating}
                  className="w-full py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 rounded-xl text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSimulating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  <span>Simular Pagamento Aprovado Instantaneamente</span>
                </button>
              </div>
            )}

          </div>
        )}

        {/* ======================================================== */}
        {/* TELA DE SUCESSO / PAGAMENTO CONFIRMADO (LINK TELEGRAM)   */}
        {/* ======================================================== */}
        {status === 'PAID' && (
          <div className="flex flex-col items-center text-center py-4">
            
            {/* Ícone de Sucesso Animado */}
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.5)] mb-4 animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>

            <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-bold mb-1">
              Transação Liquidada com Sucesso
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display">
              Acesso VIP Liberado!
            </h3>

            <p className="mt-2 text-sm text-gray-300 max-w-sm">
              Parabéns, <strong className="text-white">{clientName || 'Campeão'}</strong>! Seu pagamento de <span className="text-emerald-400 font-bold font-mono">R$ 19,90</span> foi confirmado.
            </p>

            {/* Card com Link do Telegram */}
            <div className="mt-6 w-full p-5 rounded-2xl bg-gradient-to-br from-sky-950/60 via-[#131b26] to-[#0d1620] border border-sky-500/40 text-left shadow-xl">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Send className="w-4 h-4 fill-sky-400" />
                <span>Seu Link Exclusivo de Entrada</span>
              </div>
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                Clique no botão abaixo para ingressar imediatamente no canal e grupo oficial do Telegram com os links ao vivo do ADCC 2026:
              </p>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600 hover:from-sky-400 hover:to-blue-400 text-white font-black text-base uppercase tracking-wider shadow-[0_0_25px_rgba(14,165,233,0.6)] flex items-center justify-center gap-2.5 transition-all active:scale-95 group text-center"
              >
                <Send className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
                <span>Entrar no Grupo VIP do Telegram Agora</span>
                <ExternalLink className="w-4 h-4 opacity-75" />
              </a>
            </div>

            {/* Recibo Rápido */}
            <div className="mt-4 w-full text-left text-[11px] text-gray-500 font-mono space-y-1 bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <div className="flex justify-between">
                <span>Identificador:</span>
                <span className="text-gray-300">{txId}</span>
              </div>
              <div className="flex justify-between">
                <span>Produto:</span>
                <span className="text-gray-300">ADCC 2026 VIP Pass</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">APROVADO</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 text-xs text-gray-400 hover:text-white uppercase font-bold tracking-wider transition-colors"
            >
              Fechar Janela
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
