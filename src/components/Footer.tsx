import React from 'react';
import { Shield, Zap, Lock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050608] border-t border-white/10 py-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid de Selos de Confiança */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-10 border-b border-white/10 text-center">
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02]">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white text-xs">Pix Instantâneo</span>
            <span className="text-[11px] text-gray-400">Liberação automática em segundos</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02]">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-white text-xs">SigiloPay Gateway</span>
            <span className="text-[11px] text-gray-400">Processamento oficial de pagamentos</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02]">
            <Lock className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white text-xs">Criptografia SSL</span>
            <span className="text-[11px] text-gray-400">Conexão 100% segura e protegida</span>
          </div>

          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02]">
            <Award className="w-5 h-5 text-red-400" />
            <span className="font-bold text-white text-xs">Qualidade Garantida</span>
            <span className="text-[11px] text-gray-400">Links estáveis em alta resolução</span>
          </div>
        </div>

        {/* Rodapé e Declarações Legais */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="font-black text-white text-base uppercase font-display tracking-wider">
              ADCC 2026 WORLD CHAMPIONSHIP
            </span>
            <p className="mt-1 text-gray-400 text-[11px] max-w-xl">
              Página de cobertura exclusiva e comunidade de fãs para o ADCC Submission Fighting World Championship 2026 em Cracóvia, Polônia. Todos os direitos de marca pertencem aos seus respectivos organizadores.
            </p>
          </div>

          <div className="text-[11px] text-gray-400">
            © 2026 • Todos os direitos reservados.
          </div>
        </div>

      </div>
    </footer>
  );
};
