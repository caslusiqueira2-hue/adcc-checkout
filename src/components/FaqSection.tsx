import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como recebo o acesso ao Grupo VIP do Telegram após pagar?',
      a: 'Assim que o seu Pix de R$ 19,90 for confirmado (geralmente em menos de 3 segundos), a própria tela de pagamento atualiza automaticamente exibindo o botão verde oficial para você entrar no canal e grupo do Telegram. Além disso, você também receberá a confirmação por e-mail e WhatsApp.',
    },
    {
      q: 'O valor de R$ 19,90 é taxa única ou mensalidade?',
      a: 'É um pagamento ÚNICO de apenas R$ 19,90. Você não pagará mensalidades, renovações ou taxas adicionais. O passe é válido para toda a cobertura oficial do ADCC 2026 (11 a 13 de Setembro de 2026) e acesso posterior aos replays.',
    },
    {
      q: 'O que exatamente é transmitido no Grupo VIP?',
      a: 'Você terá acesso aos links de transmissão em alta definição (Full HD) sem anúncios e sem quedas de todos os tatames da TAURON Arena em Cracóvia, além de tabelas/brackets atualizadas em tempo real, alertas de entrada dos principais atletas no tatame e vídeos de finalizações.',
    },
    {
      q: 'O pagamento via SigiloPay é seguro?',
      a: 'Totalmente seguro. A SigiloPay é uma das principais instituições de pagamento do mercado, regulamentada pelo Banco Central do Brasil, utilizando criptografia SSL de 256 bits para processar seu Pix diretamente com seu banco.',
    },
    {
      q: 'E se eu fechar a página por engano depois de pagar?',
      a: 'Fique tranquilo! Ao realizar o Pix, a transação fica salva com seus dados. Você pode nos chamar pelo canal de suporte com o seu CPF ou e-mail cadastrado que reenviamos seu link de acesso imediatamente.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#08090C] border-t border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display tracking-tight">
            Tire Suas <span className="text-red-500">Dúvidas</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="gradient-card rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base font-bold text-white font-display">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-red-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
