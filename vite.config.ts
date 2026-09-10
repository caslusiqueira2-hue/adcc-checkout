import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import generatePixHandler from './api/generate-pix';
import webhookHandler from './api/webhook';
import checkStatusHandler from './api/check-status';
import simulatePaymentHandler from './api/simulate-payment';

dotenv.config();

function apiDevPlugin() {
  return {
    name: 'api-dev-server',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
        const pathname = url.pathname;

        if (!pathname.startsWith('/api/')) {
          return next();
        }

        // Simula VercelRequest / VercelResponse
        let body: any = {};
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
          const buffers = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const raw = Buffer.concat(buffers).toString();
          try {
            body = raw ? JSON.parse(raw) : {};
          } catch {
            body = raw;
          }
        }

        const query: Record<string, string> = {};
        url.searchParams.forEach((val, key) => {
          query[key] = val;
        });

        req.body = body;
        req.query = query;

        res.status = (code: number) => {
          res.statusCode = code;
          return res;
        };

        res.json = (data: any) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        try {
          if (pathname === '/api/generate-pix') {
            await generatePixHandler(req, res);
          } else if (pathname === '/api/webhook') {
            await webhookHandler(req, res);
          } else if (pathname === '/api/check-status') {
            await checkStatusHandler(req, res);
          } else if (pathname === '/api/simulate-payment') {
            await simulatePaymentHandler(req, res);
          } else {
            res.status(404).json({ error: 'Endpoint não encontrado' });
          }
        } catch (err: any) {
          console.error('API Dev Error:', err);
          res.status(500).json({ error: err.message || 'Erro interno de servidor' });
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    port: 5173,
    host: true,
  }
});
