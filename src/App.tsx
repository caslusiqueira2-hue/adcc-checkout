import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EventDetails } from './components/EventDetails';
import { VipBenefits } from './components/VipBenefits';
import { CheckoutSection } from './components/CheckoutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PixPaymentModal } from './components/PixPaymentModal';
import { DownsellOne } from './components/DownsellOne';
import { DownsellTwo } from './components/DownsellTwo';
import { trackPageView } from './lib/metaPixel';
import type { PixResponse } from './types';
import { Zap } from 'lucide-react';

type ViewMode = 'main' | 'downsell1' | 'downsell2';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path.includes('ultima-chance') || search.includes('downsell=2')) {
        return 'downsell2';
      }
      if (path.includes('oferta-especial') || search.includes('downsell=1')) {
        return 'downsell1';
      }
    }
    return 'main';
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [currentPix, setCurrentPix] = useState<PixResponse | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [activeAmount, setActiveAmount] = useState<number>(19.90);

  // Inicialização e Interceptor do Botão Voltar (Back-Redirect Engine)
  useEffect(() => {
    // Registra PageView inicial no Meta Pixel
    trackPageView(
      currentView === 'main'
        ? 'Página Principal - R$ 19,90'
        : currentView === 'downsell1'
        ? 'Downsell 1 - R$ 14,90'
        : 'Downsell 2 - R$ 11,90'
    );

    // Injeta estado inicial no histórico para que o clique em "Voltar" acione o evento popstate
    window.history.pushState({ view: currentView }, '', window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      // Evita saída imediata e redireciona para a próxima oferta mais agressiva
      if (currentView === 'main') {
        setCurrentView('downsell1');
        setActiveAmount(14.90);
        window.history.pushState({ view: 'downsell1' }, '', '/oferta-especial');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        trackPageView('Downsell 1 - R$ 14,90');
      } else if (currentView === 'downsell1') {
        setCurrentView('downsell2');
        setActiveAmount(11.90);
        window.history.pushState({ view: 'downsell2' }, '', '/ultima-chance');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        trackPageView('Downsell 2 - R$ 11,90');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePixGenerated = (data: PixResponse, name: string, amount: number) => {
    setCurrentPix(data);
    setBuyerName(name);
    setActiveAmount(amount);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col selection:bg-red-600 selection:text-white pb-20 sm:pb-0">
      
      {/* RENDERIZAÇÃO CONDICIONAL BASEADA NO ESTÁGIO DE RETENÇÃO */}
      {currentView === 'main' && (
        <>
          {/* Header Fixo com Aviso */}
          <Header onCtaClick={scrollToCheckout} />

          {/* Conteúdo Principal (R$ 19,90) */}
          <main className="flex-1">
            <Hero onCtaClick={scrollToCheckout} />
            <EventDetails />
            <VipBenefits onCtaClick={scrollToCheckout} />
            <CheckoutSection
              onPixGenerated={handlePixGenerated}
              amount={19.90}
              originalPrice="De R$ 97,00"
              badgeDiscount="80% DE DESCONTO"
            />
            <FaqSection />
          </main>
        </>
      )}

      {currentView === 'downsell1' && (
        <main className="flex-1">
          <DownsellOne onPixGenerated={handlePixGenerated} />
        </main>
      )}

      {currentView === 'downsell2' && (
        <main className="flex-1">
          <DownsellTwo onPixGenerated={handlePixGenerated} />
        </main>
      )}

      {/* Rodapé Global com Selos e Informações */}
      <Footer />

      {/* Modal de Pagamento Pix com QR Code e Copia e Cola (100% Livre de Botões de Teste) */}
      {modalOpen && currentPix && (
        <PixPaymentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          pixData={currentPix}
          clientName={buyerName}
          amount={activeAmount}
        />
      )}

      {/* Dock Flutuante Inferior para Mobile */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-3 bg-black/95 backdrop-blur-md border-t border-white/10 sm:hidden flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-mono text-gray-400">
            {currentView === 'main'
              ? 'Passaporte VIP'
              : currentView === 'downsell1'
              ? 'Oferta Retenção'
              : 'Preço de Custo'}
          </span>
          <span className="text-base font-black text-emerald-400 font-mono">
            R$ {activeAmount.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <button
          onClick={scrollToCheckout}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.5)] active:scale-95 cursor-pointer"
        >
          <Zap className="w-4 h-4 text-yellow-300" />
          <span>Garantir Vaga no VIP</span>
        </button>
      </div>

    </div>
  );
};

export default App;
