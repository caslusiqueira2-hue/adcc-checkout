import React, { useState } from 'react';
import { ShieldCheck, Lock, Zap, CheckCircle2, User, Mail, Phone, CreditCard, Loader2 } from 'lucide-react';
import { generatePix } from '../api/sigilopay';
import type { PixResponse } from '../types';

interface CheckoutSectionProps {
  onPixGenerated: (data: PixResponse, clientName: string) => void;
}

export const CheckoutSection: React.FC<CheckoutSectionProps> = ({ onPixGenerated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Máscara de CPF automática (000.000.000-00)
  const formatCPF = (value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 11);
    if (raw.length <= 3) return raw;
    if (raw.length <= 6) return `${raw.slice(0, 3)}.${raw.slice(3)}`;
    if (raw.length <= 9) return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
  };

  // Máscara de Telefone / WhatsApp com DDD ((00) 00000-0000)
  const formatPhone = (value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 11);
    if (raw.length <= 2) return raw;
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(formatCPF(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanCpf = document.replace(/\D/g, '');
    const cleanPhone = phone.replace(/\D/g, '');

    if (!name.trim() || name.trim().split(' ').length < 2) {
      setError('Por favor, informe seu nome completo (nome e sobrenome).');
      return;
    }

    if (cleanCpf.length !== 11) {
      setError('Por favor, insira um CPF válido com 11 dígitos.');
      return;
    }

    if (cleanPhone.length < 10) {
      setError('Por favor, insira um número de WhatsApp válido com DDD.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      const response = await generatePix({
        amount: 19.90,
        client: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: cleanPhone,
          document: cleanCpf,
        },
      });

      onPixGenerated(response, name.trim());
    } catch (err: any) {
      setError(err.message || 'Falha ao processar solicitação de Pix. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="checkout" className="py-20 bg-[#07080B] relative border-t border-white/10">
      {/* Luz ambiente de destaque */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Checkout Seguro SigiloPay • Criptografia 256-Bit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display tracking-tight">
            Garanta Seu Acesso <span className="text-emerald-400 font-mono">Por R$ 19,90</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Preencha seus dados abaixo para gerar o Pix instantâneo e receber o convite exclusivo do grupo no Telegram.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Coluna Esquerda: Resumo do Pedido */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="gradient-card-red rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase font-mono text-red-400 font-bold">Resumo do Pedido</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  80% DE DESCONTO
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white uppercase font-display">
                    ADCC 2026 World Championship
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Passaporte VIP com Links de Transmissão Ao Vivo + Grupo Secreto no Telegram
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Transmissão de 11 a 13 de Setembro de 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Links diretos sem quedas e sem anúncios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Chaves e alertas ao vivo no Telegram</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Gravações e replays de todas as finalizações</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <div>
                    <span className="block text-xs text-gray-400 line-through">De R$ 97,00</span>
                    <span className="text-sm font-bold text-gray-300">Total a pagar:</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                      R$ 19,90
                    </span>
                    <span className="block text-[10px] text-gray-400 uppercase font-mono">Pagamento único via Pix</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Garantia e Segurança */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              <div className="text-xs text-gray-400">
                <strong className="text-white block">Acesso Imediato Garantido</strong>
                O link do Telegram é gerado automaticamente logo após a confirmação do seu Pix.
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Checkout */}
          <div className="lg:col-span-7">
            <div className="gradient-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span className="text-base font-bold text-white font-display uppercase">Dados do Comprador</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" /> Pix Instantâneo
                </span>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-500/60 text-red-200 text-xs leading-relaxed">
                  <strong>Atenção:</strong> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Nome Completo */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Nome Completo <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Gracie Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Grid: CPF & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* CPF */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      CPF <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="000.000.000-00"
                        value={document}
                        onChange={handleCpfChange}
                        maxLength={14}
                        className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Telefone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      WhatsApp com DDD <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={15}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    E-mail para Recebimento do Acesso <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                {/* Forma de Pagamento Pré-selecionada: Pix */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-black fill-black" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white uppercase block">Pagamento Instantâneo via Pix</span>
                      <span className="text-[10px] text-emerald-300">Processamento oficial via gateway SigiloPay</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">R$ 19,90</span>
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-black font-black text-base uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Gerando Cobrança Pix...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-black" />
                      <span>Gerar Pix de R$ 19,90 & Liberar Telegram</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-500 mt-2">
                  🔒 Seus dados estão 100% protegidos com criptografia de ponta a ponta.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
