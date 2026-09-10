import React from 'react';
import { Send, Tv, BellRing, GitBranch, Video, MessageCircle, ShieldCheck, Zap } from 'lucide-react';

interface VipBenefitsProps {
  onCtaClick: () => void;
}

export const VipBenefits: React.FC<VipBenefitsProps> = ({ onCtaClick }) => {
  const benefits = [
    {
      icon: <Tv className="w-6 h-6 text-red-400" />,
      title: 'Links de Transmissão Ao Vivo HD',
      desc: 'Links diretos para assistir sem interrupções, sem travamentos e com múltiplos ângulos de câmera de todos os tatames principais.',
      highlight: 'Sem Quedas',
    },
    {
      icon: <Send className="w-6 h-6 text-sky-400" />,
      title: 'Entrega Imediata no Telegram',
      desc: 'Assim que o Pix de R$ 19,90 for confirmado, o botão para ingressar no grupo secreto do Telegram é liberado na mesma tela.',
      highlight: 'Acesso Direto',
    },
    {
      icon: <GitBranch className="w-6 h-6 text-amber-400" />,
      title: 'Brackets & Chaves em Tempo Real',
      desc: 'Acompanhe as chaves de todas as categorias masculinas, femininas e do absoluto atualizadas instantaneamente a cada luta.',
      highlight: 'Chaves Ao Vivo',
    },
    {
      icon: <BellRing className="w-6 h-6 text-emerald-400" />,
      title: 'Alertas de Entrada no Tatame',
      desc: 'Notificações imediatas quando Gordon Ryan, Mica Galvão e os maiores nomes estiverem aquecendo e pisando na área de combate.',
      highlight: 'Notificações VIP',
    },
    {
      icon: <Video className="w-6 h-6 text-purple-400" />,
      title: 'Clips & Finalizações Épicas',
      desc: 'Vídeos em câmera lenta dos armlocks, heel hooks, guilhotinas e lances polêmicos postados segundos após acontecerem.',
      highlight: 'Melhores Momentos',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-rose-400" />,
      title: 'Comunidade de Especialistas',
      desc: 'Debata as lutas, estratégias e decisões dos árbitros com faixas pretas e fanáticos por jiu-jitsu de todo o Brasil.',
      highlight: 'Chat Ativo',
    },
  ];

  return (
    <section id="beneficios" className="py-20 bg-[#08090C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Send className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
            <span>Grupo VIP Oficial no Telegram</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase font-display tracking-tight">
            Tudo o Que Você Recebe por Apenas <span className="text-emerald-400 font-mono">R$ 19,90</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Um valor simbólico menor que um lanche para ter a experiência mais completa e empolgante do maior evento do planeta.
          </p>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="gradient-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {b.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 uppercase tracking-wider border border-white/10">
                    {b.highlight}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-sky-300 transition-colors">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de Chamada para o Checkout */}
        <div className="rounded-3xl bg-gradient-to-r from-red-950/80 via-black to-red-950/80 border border-red-500/40 p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-display mb-3">
              Não Deixe Para a Última Hora
            </h3>
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              As vagas do grupo no Telegram são limitadas para garantir a estabilidade do chat e velocidade dos servidores de entrega dos links.
            </p>
            <button
              onClick={onCtaClick}
              className="py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-black text-base uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95 transition-all inline-flex items-center gap-3 cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-black" />
              <span>Garantir Meu Acesso VIP • R$ 19,90</span>
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Pix Instantâneo • Acesso Liberado no Mesmo Segundo</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
