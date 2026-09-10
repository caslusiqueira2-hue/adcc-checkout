import React, { useState, useEffect } from 'react';
import { Play, Shield, Users, Trophy, CheckCircle, Sparkles, Flame, Clock } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  // Contagem regressiva dinâmica para o evento (Setembro 2026)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Alvo: 11 de Setembro de 2026
    const target = new Date('2026-09-11T09:00:00Z').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-grid-pattern">
      {/* Luzes de fundo atmosféricas (Glows) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-2/3 right-10 w-[400px] h-[400px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Coluna Esquerda: Copy & Oferta */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill de Destaque */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Flame className="w-4 h-4 text-red-500 fill-red-500 animate-bounce" />
              <span>Maior Evento da História do Grappling</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-yellow-400 font-bold">Cracóvia • Polônia</span>
            </div>

            {/* Headline Principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white font-display uppercase mb-6">
              ADCC 2026 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">World Championship</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-normal">
                Transmissão Ao Vivo & Grupo VIP
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl font-light">
              Não perca um segundo da batalha pelas medalhas de ouro na <strong className="text-white font-semibold">TAURON Arena</strong>. Receba links diretos de alta velocidade, chaves atualizadas tempo real e análises exclusivas das lutas de Gordon Ryan, Mica Galvão, Kaynan Duarte e muito mais no nosso grupo exclusivo no Telegram.
            </p>

            {/* Timer Box */}
            <div className="w-full max-w-xl mb-8 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-widest text-gray-400">
                <span className="flex items-center gap-1.5 font-bold text-red-400">
                  <Clock className="w-3.5 h-3.5" /> Contagem Regressiva para o Início:
                </span>
                <span className="text-amber-400 font-semibold">11-13 Setembro 2026</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white/5 border border-white/10 rounded-xl py-2 px-1">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">{timeLeft.days}</div>
                  <div className="text-[10px] uppercase text-gray-400 tracking-wider">Dias</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl py-2 px-1">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">{timeLeft.hours}</div>
                  <div className="text-[10px] uppercase text-gray-400 tracking-wider">Horas</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl py-2 px-1">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">{timeLeft.minutes}</div>
                  <div className="text-[10px] uppercase text-gray-400 tracking-wider">Minutos</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl py-2 px-1">
                  <div className="text-xl sm:text-2xl font-black text-red-400 font-mono">{timeLeft.seconds}</div>
                  <div className="text-[10px] uppercase text-gray-400 tracking-wider">Segundos</div>
                </div>
              </div>
            </div>

            {/* Bloco de Preço e CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-xl">
              <button
                onClick={onCtaClick}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-base uppercase tracking-wider shadow-[0_0_30px_rgba(225,29,72,0.55)] hover:shadow-[0_0_40px_rgba(225,29,72,0.8)] active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Play className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
                <span>QUERO ACESSO VIP • R$ 19,90</span>
              </button>

              <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-start px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-xs text-gray-400 line-through">De R$ 97,00</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-emerald-400">Por</span>
                  <span className="text-xl font-black text-white">R$ 19,90</span>
                </div>
              </div>
            </div>

            {/* Selos de Confiança */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Liberação Automática via Pix</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-400" />
                <span>+4.850 Membros no Telegram</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span>Transação 100% Segura SigiloPay</span>
              </div>
            </div>

          </div>

          {/* Coluna Direita: Imagens Oficiais ADCC 2026 */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Moldura Principal com o Poster Oficial do Evento */}
            <div className="relative w-full max-w-[380px] group">
              {/* Efeito Neon ao redor */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-amber-500 to-rose-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-[#12131A] shadow-2xl">
                <img
                  src="/images/adcc-poster.png"
                  alt="ADCC 2026 World Championship Poster Oficial"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs uppercase tracking-wider mb-1 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    Ao Vivo de 11 a 13 de Setembro
                  </div>
                  <p className="text-xs text-gray-300 font-medium">
                    TAURON Arena Kraków • Cobertura FloGrappling & Links VIP
                  </p>
                </div>
              </div>

              {/* Card Flutuante com Oferta */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-[#181924]/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-3 sm:p-4 shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">Acesso Total</div>
                  <div className="text-sm font-black text-white">Todos os Tatames & Finais</div>
                  <div className="text-xs font-mono text-emerald-400">R$ 19,90 Pagamento Único</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
