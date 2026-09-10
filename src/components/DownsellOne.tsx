import React, { useState, useEffect } from 'react';
import { AlertTriangle, Flame, Shield, CheckCircle2, Clock, Zap, ArrowDown, Users, Award } from 'lucide-react';
import { CheckoutSection } from './CheckoutSection';
import type { PixResponse } from '../types';

interface DownsellOneProps {
  onPixGenerated: (data: PixResponse, clientName: string, amount: number) => void;
}

export const DownsellOne: React.FC<DownsellOneProps> = ({ onPixGenerated }) => {
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutos

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white">
      {/* Top Banner de Alerta Urgente */}
      <div className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 text-black py-2.5 px-4 text-center font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg sticky top-0 z-40 flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4 fill-black animate-bounce" />
        <span>ESPERE! VOCÊ RECEBEU UM SUBSÍDIO ESPECIAL DE RETENÇÃO DE R$ 5,00!</span>
        <AlertTriangle className="w-4 h-4 fill-black animate-bounce hidden sm:inline" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {/* Cabeçalho Agressivo */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Condição Exclusiva de Saída • Não Atualize a Página</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase font-display tracking-tight leading-[1.08] text-white">
            NÃO VÁ EMBORA SEM SEU ACESSO:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-rose-400">
              DE R$ 19,90 POR APENAS R$ 14,90
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-gray-300 font-light leading-relaxed">
            Sabemos que você quer assistir às maiores guerras do <strong>ADCC 2026 World Championship</strong> na Cracóvia. Para garantir que nada te impeça de acompanhar Gordon Ryan, Mica Galvão e as lendas no tatame, nós cobrimos mais R$ 5,00 do custo para você entrar agora.
          </p>

          {/* Timer de Emergência */}
          <div className="mt-6 inline-flex items-center gap-3 bg-red-950/70 border border-red-500/50 px-5 py-2.5 rounded-2xl">
            <Clock className="w-5 h-5 text-red-400 animate-spin" />
            <span className="text-xs uppercase font-mono tracking-wider text-gray-300">Esta oferta expira em:</span>
            <span className="text-lg font-black text-amber-400 font-mono">
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Box Comparativo / Urgência */}
        <div className="gradient-card-red rounded-3xl p-6 sm:p-8 mb-12 border border-red-500/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5">
              <Zap className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <strong className="block text-white text-sm font-bold">Desconto Imediato</strong>
                <span className="text-xs text-gray-400">Menos que o valor de um café expresso</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="block text-white text-sm font-bold">Acesso Total Mantido</strong>
                <span className="text-xs text-gray-400">Mesmos links HD e alertas no Telegram</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5">
              <Shield className="w-8 h-8 text-sky-400 flex-shrink-0" />
              <div>
                <strong className="block text-white text-sm font-bold">Liberação no Mesmo Segundo</strong>
                <span className="text-xs text-gray-400">Pix aprovado automaticamente</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <button
              onClick={scrollToCheckout}
              className="py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <ArrowDown className="w-5 h-5" />
              <span>GARANTIR POR R$ 14,90 ANTES QUE EXPIRE</span>
            </button>
          </div>
        </div>

        {/* Checkout com Valor de R$ 14,90 */}
        <CheckoutSection
          onPixGenerated={onPixGenerated}
          amount={14.90}
          originalPrice="De R$ 19,90"
          badgeDiscount="DESCONTO DE RETENÇÃO ATIVO"
          ctaText="Gerar Pix de R$ 14,90 & Entrar no Telegram"
          isDownsell={true}
        />
      </div>
    </div>
  );
};
