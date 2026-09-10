import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EventDetails } from './components/EventDetails';
import { VipBenefits } from './components/VipBenefits';
import { CheckoutSection } from './components/CheckoutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PixPaymentModal } from './components/PixPaymentModal';
import type { PixResponse } from './types';
import { Zap, Send } from 'lucide-react';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPix, setCurrentPix] = useState<PixResponse | null>(null);
  const [buyerName, setBuyerName] = useState('');

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePixGenerated = (data: PixResponse, name: string) => {
    setCurrentPix(data);
    setBuyerName(name);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col selection:bg-red-600 selection:text-white pb-20 sm:pb-0">
      {/* Header Fixo com Aviso */}
      <Header onCtaClick={scrollToCheckout} />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* 1. Hero Section com Contagem e Oferta R$ 19,90 */}
        <Hero onCtaClick={scrollToCheckout} />

        {/* 2. Programação Oficial & Atletas de Destaque */}
        <EventDetails />

        {/* 3. Benefícios do Grupo VIP no Telegram */}
        <VipBenefits onCtaClick={scrollToCheckout} />

        {/* 4. Checkout Oficial Integrado */}
        <CheckoutSection onPixGenerated={handlePixGenerated} />

        {/* 5. Perguntas Frequentes (FAQ) */}
        <FaqSection />
      </main>

      {/* Rodapé com Selos e Informações */}
      <Footer />

      {/* Modal de Pagamento Pix com QR Code e Copia e Cola */}
      {modalOpen && currentPix && (
        <PixPaymentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          pixData={currentPix}
          clientName={buyerName}
        />
      )}

      {/* Dock Flutuante Inferior para Mobile */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-3 bg-black/90 backdrop-blur-md border-t border-white/10 sm:hidden flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-mono text-gray-400">Passaporte ADCC VIP</span>
          <span className="text-base font-black text-emerald-400 font-mono">R$ 19,90</span>
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
