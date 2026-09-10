// Helper para eventos do Meta Pixel (Facebook Ads)

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export function trackPageView(pageName?: string) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView', pageName ? { page_name: pageName } : undefined);
  }
}

export function trackInitiateCheckout(value: number, currency = 'BRL') {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      value,
      currency,
      content_name: 'ADCC 2026 World Championship VIP',
      content_category: 'Ticket / VIP Pass',
    });
  }
}

export function trackPurchase(value: number, currency = 'BRL', transactionId?: string) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', {
      value,
      currency,
      content_name: 'ADCC 2026 World Championship VIP',
      order_id: transactionId,
      status: 'completed',
    });
  }
}
