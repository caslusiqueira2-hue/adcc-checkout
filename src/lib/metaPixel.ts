// Utilitário de rastreamento do Meta Pixel
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const trackPixelEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('track', eventName, params);
      console.log(`[Meta Pixel] Evento disparado: ${eventName}`, params);
    } else {
      window.fbq('track', eventName);
      console.log(`[Meta Pixel] Evento disparado: ${eventName}`);
    }
  }
};

export const trackPageView = (pageName?: string) => {
  trackPixelEvent('PageView', pageName ? { page_name: pageName } : undefined);
};

export const trackInitiateCheckout = (value = 19.90, currency = 'BRL') => {
  trackPixelEvent('InitiateCheckout', {
    content_name: 'Passaporte VIP ADCC 2026',
    content_category: 'Transmissão Ao Vivo BJJ',
    value,
    currency,
  });
};

export const trackPurchase = (value = 19.90, currency = 'BRL', transactionId?: string) => {
  trackPixelEvent('Purchase', {
    content_name: 'Passaporte VIP ADCC 2026',
    content_type: 'product',
    value,
    currency,
    order_id: transactionId,
  });
};
