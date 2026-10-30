import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LeadData {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  cityState: string;
  monthlyTrips: string;
  needs: string[];
  challenges?: string;
  planInterest?: string;
  consent: boolean;
  createdAt: string;
  ip?: string;
}

const leadsDatabase: LeadData[] = [];
const DATA_DIR = path.resolve(__dirname, 'data');
const LEADS_FILE = path.resolve(DATA_DIR, 'leads.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load existing leads from disk if available
if (fs.existsSync(LEADS_FILE)) {
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      leadsDatabase.push(...parsed);
    }
  } catch (err) {
    console.error('Error reading existing leads.json:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Commercial WhatsApp number and default config
  const DEFAULT_WHATSAPP = process.env.VITE_WHATSAPP_NUMBER || '5511984937529';

  // API: Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'STC Corporate Travel API',
      timestamp: new Date().toISOString(),
      leadsCount: leadsDatabase.length,
    });
  });

  // API: Lead submission endpoint with full validation
  app.post('/api/leads', (req: Request, res: Response) => {
    try {
      const {
        name,
        company,
        role,
        email,
        phone,
        cityState,
        monthlyTrips,
        needs,
        challenges,
        planInterest,
        consent,
      } = req.body;

      // Validation
      const errors: Record<string, string> = {};

      if (!name || typeof name !== 'string' || name.trim().length < 3) {
        errors.name = 'Informe o nome completo do responsável.';
      }
      if (!company || typeof company !== 'string' || company.trim().length < 2) {
        errors.company = 'Informe o nome da empresa.';
      }
      if (!role || typeof role !== 'string' || role.trim().length < 2) {
        errors.role = 'Informe o cargo ou área.';
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Informe um e-mail corporativo válido.';
      }
      if (!phone || typeof phone !== 'string' || phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Informe um número de telefone/WhatsApp com DDD válido.';
      }
      if (!cityState || typeof cityState !== 'string' || cityState.trim().length < 2) {
        errors.cityState = 'Informe a cidade e estado.';
      }
      if (!monthlyTrips) {
        errors.monthlyTrips = 'Selecione a quantidade aproximada de viagens por mês.';
      }
      if (!needs || !Array.isArray(needs) || needs.length === 0) {
        errors.needs = 'Selecione pelo menos uma necessidade principal da sua empresa.';
      }
      if (!consent) {
        errors.consent = 'É necessário concordar com o tratamento de dados para receber a proposta.';
      }

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Por favor, corrija os campos destacados.',
          errors,
        });
      }

      // Generate ID
      const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newLead: LeadData = {
        id: leadId,
        name: name.trim(),
        company: company.trim(),
        role: role.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        cityState: cityState.trim(),
        monthlyTrips,
        needs,
        challenges: challenges ? String(challenges).trim() : undefined,
        planInterest: planInterest ? String(planInterest).trim() : undefined,
        consent: Boolean(consent),
        createdAt: new Date().toISOString(),
        ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress,
      };

      leadsDatabase.unshift(newLead);

      // Persist to disk
      try {
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsDatabase.slice(0, 500), null, 2), 'utf-8');
      } catch (saveErr) {
        console.error('Failed to write leads.json:', saveErr);
      }

      // Pre-compose WhatsApp direct message for immediate commercial contact
      const whatsappText = encodeURIComponent(
        `Olá! Sou ${newLead.name} da empresa ${newLead.company} (${newLead.role}). Acabei de solicitar uma proposta com a STC Corporate Travel (Protocolo: ${leadId}) para aprox. ${newLead.monthlyTrips} viagens/mês. Gostaria de agilizar meu diagnóstico!`
      );
      const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP}?text=${whatsappText}`;

      return res.status(201).json({
        success: true,
        leadId,
        message: 'Solicitação de proposta recebida com sucesso! Nossa equipe entrará em contato.',
        lead: {
          id: newLead.id,
          name: newLead.name,
          company: newLead.company,
          createdAt: newLead.createdAt,
        },
        whatsappUrl,
      });
    } catch (err) {
      console.error('Error handling lead:', err);
      return res.status(500).json({
        success: false,
        message: 'Ocorreu um erro interno ao processar sua solicitação. Tente novamente ou entre em contato pelo WhatsApp.',
      });
    }
  });

  // API: Get leads (audit / confirmation)
  app.get('/api/leads', (_req: Request, res: Response) => {
    res.json({
      total: leadsDatabase.length,
      recent: leadsDatabase.slice(0, 10).map((l) => ({
        id: l.id,
        company: l.company,
        createdAt: l.createdAt,
        monthlyTrips: l.monthlyTrips,
      })),
    });
  });

  // Vite Integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Corporate Travel App] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
