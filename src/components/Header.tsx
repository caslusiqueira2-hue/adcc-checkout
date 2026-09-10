import React from 'react';
import { ShieldCheck, Flame, Zap } from 'lucide-react';

interface HeaderProps {
  onCtaClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#08090C]/90 border-b border-white/10 transition-all">
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-red-900/90 via-black to-red-900/90 py-2 px-4 text-center border-b border-red-500/30">
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-red-100">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="font-bold text-yellow-400 uppercase">Atenção:</span>
          <span>Cobertura Exclusiva ADCC 2026 World Championship • TAURON Arena Cracóvia</span>
          <span className="hidden md:inline-flex items-center gap-1 bg-red-500/20 px-2 py-0.5 rounded text-[11px] text-red-300 font-mono">
            <Flame className="w-3 h-3 text-red-400" /> Apenas R$ 19,90
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-black p-0.5 shadow-[0_0_15px_rgba(225,29,72,0.4)]">
              <div className="w-full h-full bg-[#0E0F15] rounded-[10px] flex items-center justify-center">
                <span className="font-black text-lg tracking-tighter text-red-500 font-display">ADCC</span>
              </div>
            </div>
          </div>
          <div>
            <span className="block font-black text-sm md:text-base tracking-wider text-white uppercase font-display">
              ADCC 2026 VIP
            </span>
            <span className="block text-[10px] text-gray-400 tracking-wider uppercase">
              Krakow • Poland
            </span>
          </div>
        </div>

        {/* Navigation links - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-gray-300">
          <a href="#evento" className="hover:text-red-400 transition-colors">O Evento</a>
          <a href="#beneficios" className="hover:text-red-400 transition-colors">Grupo VIP</a>
          <a href="#atletas" className="hover:text-red-400 transition-colors">Lendas</a>
          <a href="#faq" className="hover:text-red-400 transition-colors">Dúvidas</a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCtaClick}
            className="group relative inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-xs md:text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(225,29,72,0.45)] hover:shadow-[0_0_30px_rgba(225,29,72,0.7)] active:scale-95 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-yellow-300 group-hover:scale-110 transition-transform" />
            <span>Acessar VIP • R$ 19,90</span>
          </button>
        </div>
      </div>
    </header>
  );
};
