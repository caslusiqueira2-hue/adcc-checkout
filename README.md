# 🥋 ADCC 2026 World Championship - Checkout & Mini Landing Page

Landing Page de alta conversão integrada com Checkout Pix oficial da **SigiloPay**, entrega instantânea do link de acesso ao **Grupo VIP do Telegram** e temática profissional do **ADCC 2026 World Championship** (Cracóvia, Polônia).

---

## 🚀 Funcionalidades Principais

- **Visual Temático ADCC 2026:**
  - Imagens e cartazes oficiais do evento (TAURON Arena, ADCC World Championship e ADCC Amateur).
  - Identidade visual imponente: dark theme atlético, acentos em vermelho combate e dourado medalha.
  - Contagem regressiva em tempo real para setembro de 2026.
  - Destaques dos atletas: Gordon Ryan, Mica Galvão, Kaynan Duarte, Ffion Davies, Bia Mesquita e Irmãos Ruotolo.

- **Checkout de Alta Conversão:**
  - Preço fixado em **R$ 19,90** com taxa única.
  - Formulário com validação e máscaras automáticas para **Nome Completo**, **CPF** (`000.000.000-00`), **WhatsApp com DDD** (`(00) 00000-0000`) e **E-mail**.
  - Modal com QR Code dinâmico, código Pix Copia e Cola com botão de cópia em 1 clique e temporizador de 15 minutos.

- **Entrega Instantânea do Telegram:**
  - Assim que o pagamento é identificado (via Webhook ou consulta em tempo real), a tela se transforma exibindo o selo de confirmação e o botão direto: **"Entrar no Grupo VIP do Telegram Agora"**.

- **Integração SigiloPay & Arquitetura Flexível:**
  - Endpoint de geração Pix: `api/generate-pix.ts`
  - Webhook de confirmação automática: `api/webhook.ts`
  - Endpoint de status com fallback resiliente: `api/check-status.ts`
  - Compatível com Vercel Serverless Functions e banco de dados Supabase (opcional).
  - Botão de simulação rápida em modo de desenvolvimento.

---

## ⚙️ Configuração das Chaves (`.env`)

Abra o arquivo `.env` na raiz do projeto e insira as suas credenciais:

```env
# 1. Chaves da SigiloPay (Obtenha em https://app.sigilopay.com.br)
SIGILOPAY_PUBLIC_KEY=SUA_CHAVE_PUBLICA_AQUI
SIGILOPAY_SECRET_KEY=SUA_CHAVE_SECRETA_AQUI

# 2. Link do Grupo VIP no Telegram (Entregue na confirmação do Pix)
TELEGRAM_GROUP_LINK=https://t.me/+ADCC2026_VIP_OFICIAL

# 3. Supabase (Opcional - caso queira persistir em nuvem com Supabase)
SUPABASE_URL=SUA_URL_SUPABASE_AQUI
SUPABASE_SERVICE_ROLE_KEY=SUA_CHAVE_SERVICE_ROLE_SUPABASE_AQUI
VITE_SUPABASE_URL=SUA_URL_SUPABASE_AQUI
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA_AQUI
```

> **Nota:** Se você ainda não colocou as chaves da SigiloPay, o checkout roda em modo de demonstração seguro com dados simulados e botão para você testar a transição da tela de aprovação e o link do Telegram imediatamente!

---

## 💻 Como Rodar Localmente

```bash
# 1. Instalar dependências (já instaladas)
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Abra no navegador em: `http://localhost:5173`

---

## 🌐 Deploy na Vercel

O projeto já inclui o arquivo `vercel.json` e a estrutura Serverless em `api/` pronta:

1. Faça o commit ou suba para o GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: ADCC 2026 Checkout & Landing Page com SigiloPay"
   ```
2. Na Vercel, importe o repositório.
3. Nas configurações de **Environment Variables** da Vercel, adicione:
   - `SIGILOPAY_PUBLIC_KEY`
   - `SIGILOPAY_SECRET_KEY`
   - `TELEGRAM_GROUP_LINK`
   - *(Opcional)* `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`
4. Clique em **Deploy**. O webhook da SigiloPay receberá automaticamente as confirmações em `https://seusite.vercel.app/api/webhook`.
