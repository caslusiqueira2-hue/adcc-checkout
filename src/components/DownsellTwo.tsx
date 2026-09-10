import React, { useState, useEffect } from 'react';
import { AlertOctagon, Flame, Shield, CheckCircle2, Clock, Zap, ArrowDown, Lock, Skull } from 'lucide-react';
import { CheckoutSection } from './CheckoutSection';
import type { PixResponse } from '../types';

interface DownsellTwoProps {
  onPixGenerated: (data: PixResponse, clientName: string, amount: number) => void;
}

export const DownsellTwo: React.FC<DownsellTwoProps> = ({ onPixGenerated }) => {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutos de emergência final

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
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Top Banner de Alerta Crítico */}
      <div className="bg-red-600 text-white py-2.5 px-4 text-center font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(220,38,38,0.8)] sticky top-0 z-40 flex items-center justify-center gap-2 animate-pulse">
        <AlertOctagon className="w-5 h-5 fill-white text-red-600" />
        <span>🚨 ÚLTIMA CHANCE ABSOLUTA: OFERTA DE CUSTO TÉCNICO • IP REGISTRADO 🚨</span>
        <AlertOctagon className="w-5 h-5 fill-white text-red-600 hidden sm:inline" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        
        {/* Box de Pressão Psicológica e Copy Ultra Persuasiva */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950 border border-red-500 text-red-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
            <Skull className="w-4 h-4 text-red-400" />
            <span>Preço de Custo Zero de Lucro • Não haverá outro desconto</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase font-display tracking-tight leading-[1.05] text-white">
            NÃO VAMOS DEIXAR VOCÊ DE FORA:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
              ACESSO COMPLETO POR APENAS R$ 11,90
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-gray-300 font-light leading-relaxed">
            Se você sair desta tela agora, este desconto será revogado instantaneamente pelo servidor. Reduzimos o valor para o mínimo absoluto cobrado pelas taxas bancárias para que você não perca nem um único segundo do <strong>ADCC 2026 World Championship</strong>.
          </p>

          {/* Timer Crítico de 5 minutos */}
          <div className="mt-6 inline-flex items-center gap-3 bg-black/80 border-2 border-red-600/80 px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            <Clock className="w-5 h-5 text-red-500 animate-spin" />
            <span className="text-xs uppercase font-mono tracking-wider text-gray-300">Tempo restante para o cancelamento:</span>
            <span className="text-2xl font-black text-red-400 font-mono">
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Card de Quebra Final de Objeções */}
        <div className="gradient-card-red rounded-3xl p-6 sm:p-8 mb-12 border-2 border-red-500/60 shadow-2xl relative">
          <div className="space-y-4 text-sm text-gray-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">R$ 11,90 é menos que uma garrafa d’água mineral no estádio:</strong> Por esse valor simbólico, você tem todos os links em Full HD, chaves ao vivo e análises dos especialistas no Telegram.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Transmissão garantida de 11 a 13 de Setembro de 2026:</strong> Gordon Ryan, Mica Galvão, Kaynan Duarte, Ffion Davies, Bia Mesquita e todos os combates épicos.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Liberação em 3 segundos no Pix:</strong> Pagou, a tela abre imediatamente com seu link exclusivo de entrada no Telegram.
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <button
              onClick={scrollToCheckout}
              className="w-full sm:w-auto py-4 px-10 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-black font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_35px_rgba(16,185,129,0.7)] active:scale-95 transition-all inline-flex items-center justify-center gap-3 cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-black" />
              <span>SIM! QUERO ENTRAR AGORA POR APENAS R$ 11,90</span>
            </button>
          </div>
        </div>

        {/* Checkout com Valor de R$ 11,90 */}
        <CheckoutSection
          onPixGenerated={onPixGenerated}
          amount={11.90}
          originalPrice="De R$ 19,90"
          badgeDiscount="ÚLTIMA CHANCE: R$ 11,90 NO PIX"
          ctaText="Gerar Pix de R$ 11,90 & Liberar Telegram"
          isDownsell={true}
        />
      </div>
    </div>
  );
};
