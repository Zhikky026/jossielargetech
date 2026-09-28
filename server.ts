import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAuth, type AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getUserByUid } from './src/db/users.ts';
import {
  createSqlInquiry,
  getSqlUserInquiries,
  getAllSqlInquiries,
  updateSqlInquiryStatus,
  deleteSqlInquiry,
} from './src/db/inquiries.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const port = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  const app = express();
  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'JL Technologies AI API' });
  });

  // Dedicated Chatbot endpoint for JL Technologies
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required and must not be empty.' });
      }

      const systemInstruction = `You are the official AI Assistant for JL Technologies (jltechnologies.io).
Your strict and primary role:
1. Explain what JL Technologies does and the services we provide.
2. Answer customer questions, technical inquiries, or business problems related to digital marketing, custom software, UI/UX, AI automation, and Web3.
3. Once you have answered the user's question or diagnosed their issue, ALWAYS refer and invite the user to contact the business owner directly via WhatsApp or Email for a personalized consultation, project brief review, or official quotation.

Business Owner Official Contact Information:
- Email: jossielarge24@gmail.com
- WhatsApp / Phone Number: 09157881683 (WhatsApp Direct: https://wa.me/2349157881683)
- Turnaround Time: Direct review within 24 business hours.
- Confidentiality: All client discussions, source code, and intellectual property are protected under bilateral Non-Disclosure Agreements (NDAs).

Core JL Technologies Divisions & Capabilities:
- Division 01: Digital Marketing & Acquisition (Meta Ads, Google Search & Performance Max, TikTok Ads, CRO, sales funnels, high ROAS acquisition engines).
- Division 02: AI Video & Creative Production (AI-generated UGC videos, viral ad creative variations, motion graphics, high-converting video scripts).
- Division 03: Design & Branding (Brand identity systems, 3D & glassmorphic aesthetics, UI/UX, mobile app design, high-converting landing pages, SaaS product design).
- Division 04: Custom App & Software Engineering (iOS & Android native, Flutter, React Native, responsive web applications, enterprise platforms, scalable backend and database engineering).
- Division 05: Automation & AI Systems (n8n automated workflows, Make.com, Zapier, 24/7 autonomous Retell AI and Vapi conversational phone voice agents, GoHighLevel CRM architectures, customer support bots).
- Division 06: Blockchain & Web3 (Audited Solana smart contracts, token launches, decentralized applications, automated Telegram trading and telemetry bots).

Critical Behavioral Rules:
- STRICT SCOPE: Only answer questions relating to JL Technologies, our service offerings, technical capabilities, software architecture, marketing strategies, or business growth questions.
- If the user asks about unrelated topics (e.g., celebrity gossip, politics, school homework, cooking recipes, general pop culture), politely and professionally decline: "I am specifically dedicated to helping you with JL Technologies' digital marketing, software development, design, and AI automation solutions. How can we assist your business?"
- At the end of every helpful response, always include a clear call-to-action inviting them to chat with the business owner:
  "For custom pricing, roadmap scoping, or to start your project, you can reach the business owner directly:
  📱 WhatsApp: 09157881683 (https://wa.me/2349157881683)
  ✉️ Email: jossielarge24@gmail.com"
- Keep responses well-structured, warm, professional, concise, and focused on commercial value.`;

      // Sanitize and format messages into GoogleGenAI contents structure with strictly alternating user/model turns
      const rawFormatted = messages
        .map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: String(m.text || m.content || '').trim(),
        }))
        .filter((m) => m.text.length > 0);

      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
      for (const m of rawFormatted) {
        if (contents.length === 0) {
          // First turn must always be from the user
          contents.push({ role: 'user', parts: [{ text: m.text }] });
        } else {
          const last = contents[contents.length - 1];
          if (last.role === m.role) {
            // Merge consecutive messages with identical roles
            last.parts[0].text += '\n\n' + m.text;
          } else {
            contents.push({ role: m.role, parts: [{ text: m.text }] });
          }
        }
      }

      if (contents.length === 0) {
        contents.push({ role: 'user', parts: [{ text: 'Hello JL Technologies' }] });
      }

      let reply = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        reply = response.text || '';
      } catch (geminiErr: any) {
        console.warn('Gemini 3.8 Flash primary call failed, attempting fallback resolution:', geminiErr?.message);
        
        // Context-aware intelligent fallback based on user's inquiry
        const latestMsg = String(messages[messages.length - 1]?.text || messages[messages.length - 1]?.content || '').toLowerCase();

        if (latestMsg.includes('voice') || latestMsg.includes('retell') || latestMsg.includes('vapi') || latestMsg.includes('automate') || latestMsg.includes('automation') || latestMsg.includes('n8n')) {
          reply = `**JL Technologies — Automation & Autonomous AI Systems:**\n\nWe design, deploy, and manage production-grade automation workflows and AI voice assistants:\n• **Retell AI & Vapi Voice Agents:** 24/7 autonomous phone call handling, customer qualification, appointment booking, and CRM logging.\n• **n8n, Make.com & Zapier Workflows:** Connecting multi-app business logic without manual overhead.\n• **CRM Integration:** Two-way sync with GoHighLevel, HubSpot, Odoo, and custom SQL databases.\n\nReady to automate your operations or deploy an AI voice agent? Let's connect you directly with the business owner:\n📱 **WhatsApp:** [09157881683](https://wa.me/2349157881683)\n✉️ **Email:** jossielarge24@gmail.com`;
        } else if (latestMsg.includes('app') || latestMsg.includes('software') || latestMsg.includes('mobile') || latestMsg.includes('flutter') || latestMsg.includes('web') || latestMsg.includes('code')) {
          reply = `**JL Technologies — Custom App & Software Engineering:**\n\nWe build scalable, high-performance digital products from scratch:\n• **Mobile Apps:** Native iOS & Android, plus high-velocity cross-platform Flutter and React Native.\n• **Web Applications:** Modern fullstack architectures, fast serverless backends, and cloud databases.\n• **Enterprise Systems:** Custom portals, APIs, and microservices built to scale securely.\n\nEvery project is protected under strict bilateral NDAs with transparent delivery milestones.\n\nTo discuss your software architecture or receive a custom scope:\n📱 **WhatsApp:** [09157881683](https://wa.me/2349157881683)\n✉️ **Email:** jossielarge24@gmail.com`;
        } else if (latestMsg.includes('market') || latestMsg.includes('ad') || latestMsg.includes('meta') || latestMsg.includes('google') || latestMsg.includes('ugc') || latestMsg.includes('tiktok') || latestMsg.includes('video')) {
          reply = `**JL Technologies — Digital Marketing & AI Video Creative:**\n\nWe engineer full-funnel acquisition systems engineered for measurable ROAS:\n• **Paid Media Engines:** High-conversion campaigns across Meta Ads, Google Search & Performance Max, and TikTok.\n• **AI UGC Video Production:** Converting ad scripts and AI-generated video assets built for viral hooks and high CTR.\n• **Conversion Optimization:** Fast landing pages and tracking telemetry that turn ad clicks into paying clients.\n\nTo review your acquisition strategy with the business owner:\n📱 **WhatsApp:** [09157881683](https://wa.me/2349157881683)\n✉️ **Email:** jossielarge24@gmail.com`;
        } else if (latestMsg.includes('web3') || latestMsg.includes('crypto') || latestMsg.includes('blockchain') || latestMsg.includes('solana') || latestMsg.includes('token') || latestMsg.includes('bot')) {
          reply = `**JL Technologies — Blockchain & Web3 Engineering:**\n\nWe deliver battle-tested decentralized solutions:\n• **Solana Protocols:** Audited smart contracts, token minting architectures, and liquidity routing.\n• **Trading & Telemetry Bots:** High-speed Telegram sniper and telemetry execution bots programmed on Solana RPCs.\n• **Web3 Apps & DApps:** Seamless wallet connections, payment rails, and tokenomics design.\n\nTo discuss Web3 development or smart contract scoping:\n📱 **WhatsApp:** [09157881683](https://wa.me/2349157881683)\n✉️ **Email:** jossielarge24@gmail.com`;
        } else if (latestMsg.includes('price') || latestMsg.includes('cost') || latestMsg.includes('budget') || latestMsg.includes('quote') || latestMsg.includes('timeline')) {
          reply = `**JL Technologies — Project Pricing & Delivery Roadmap:**\n\nBecause every business problem requires an tailored architecture, our pricing is scoped to your exact commercial goals:\n• **Rapid Sprints:** Delivered in 1–2 weeks for urgent MVP launches or ad creative pipelines.\n• **Full-Scale Deliveries:** 1-month to multi-month roadmaps with transparent sprint milestones.\n• **Bilateral NDAs:** All discussions, trade secrets, and proposals are 100% confidential.\n\nReach out directly to the business owner to receive a detailed estimate within 24 business hours:\n📱 **WhatsApp:** [09157881683](https://wa.me/2349157881683)\n✉️ **Email:** jossielarge24@gmail.com`;
        } else if (latestMsg.includes('contact') || latestMsg.includes('owner') || latestMsg.includes('whatsapp') || latestMsg.includes('email') || latestMsg.includes('phone') || latestMsg.includes('call')) {
          reply = `**Connect Directly With JL Technologies Leadership:**\n\nYou can reach the business owner directly right now:\n• 📱 **WhatsApp:** [09157881683](https://wa.me/2349157881683) (+234 915 788 1683)\n• ✉️ **Direct Email:** jossielarge24@gmail.com\n\nOur senior team reviews inquiries and replies within 24 business hours under complete NDA protection.`;
        } else {
          reply = `**Welcome to JL Technologies!**\n\nWe provide end-to-end technology and growth engineering across 6 specialized divisions:\n1. **Digital Marketing & Ads:** Meta, Google & TikTok acquisition engines.\n2. **AI Video & UGC Creatives:** High-converting video ad production.\n3. **Design & Branding:** World-class UI/UX, 3D aesthetics, and high-converting landing pages.\n4. **App & Software Engineering:** Cross-platform mobile (Flutter/React) and custom web software.\n5. **Automation & AI Systems:** n8n workflows, Make.com, and 24/7 Retell AI phone voice agents.\n6. **Blockchain & Web3:** Solana development, token architectures, and automated trading bots.\n\nHow can we help your business build or scale? Feel free to ask any question or connect directly with the business owner:\n📱 **WhatsApp:** [09157881683](https://wa.me/2349157881683)\n✉️ **Email:** jossielarge24@gmail.com`;
        }
      }

      return res.json({ reply });
    } catch (err: any) {
      console.error('Chat API Error:', err);
      return res.json({
        reply: "Our team at JL Technologies is ready to assist you! Please connect directly with the business owner:\n\n📱 **WhatsApp:** [09157881683](https://wa.me/2349157881683)\n✉️ **Email:** jossielarge24@gmail.com"
      });
    }
  });

  // ==========================================
  // CLOUD SQL POSTGRESQL & AUTH API ROUTES
  // ==========================================

  // Synchronize authenticated user profile to Cloud SQL
  app.get('/api/user/profile', requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const email = user.email || '';
      const name = (user.name as string) || '';
      const picture = (user.picture as string) || '';

      const dbUser = await getOrCreateUser(user.uid, email, name, picture);
      res.json({ user: dbUser });
    } catch (err: any) {
      console.error('Failed to sync user in Cloud SQL:', err);
      res.status(500).json({ error: 'Database operation failed. Please try again later.' });
    }
  });

  // Fetch inquiries from Cloud SQL (scoped by user or all for admin)
  app.get('/api/inquiries', requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const isAdmin = user.email?.toLowerCase() === 'mubarakzhikirullah@gmail.com';
      const list = isAdmin ? await getAllSqlInquiries() : await getSqlUserInquiries(user.uid);
      res.json({ inquiries: list, isAdmin });
    } catch (err: any) {
      console.error('Failed to fetch inquiries from Cloud SQL:', err);
      res.status(500).json({ error: 'Database operation failed. Please try again later.' });
    }
  });

  // Create an inquiry in Cloud SQL
  app.post('/api/inquiries', requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const { inquiryId, userName, userEmail, company, phone, service, budget, timeline, details } = req.body;
      if (!inquiryId || !service) {
        return res.status(400).json({ error: 'Missing required inquiry parameters' });
      }

      const created = await createSqlInquiry({
        inquiryId: String(inquiryId),
        userUid: user.uid,
        userName: String(userName || user.name || 'Client'),
        userEmail: String(userEmail || user.email || ''),
        company: company ? String(company) : undefined,
        phone: phone ? String(phone) : undefined,
        service: String(service),
        budget: budget ? String(budget) : undefined,
        timeline: timeline ? String(timeline) : undefined,
        details: details ? String(details) : undefined,
        status: 'submitted',
      });

      res.status(201).json({ inquiry: created });
    } catch (err: any) {
      console.error('Failed to create inquiry in Cloud SQL:', err);
      res.status(500).json({ error: 'Database operation failed. Please try again later.' });
    }
  });

  // Update inquiry status in Cloud SQL (Admin only)
  app.patch('/api/inquiries/:id/status', requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const isAdmin = user.email?.toLowerCase() === 'mubarakzhikirullah@gmail.com';
      if (!isAdmin) {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
      }

      const { status } = req.body;
      const { id } = req.params;
      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const updated = await updateSqlInquiryStatus(id, String(status));
      res.json({ inquiry: updated });
    } catch (err: any) {
      console.error('Failed to update inquiry status in Cloud SQL:', err);
      res.status(500).json({ error: 'Database operation failed. Please try again later.' });
    }
  });

  // Delete inquiry in Cloud SQL
  app.delete('/api/inquiries/:id', requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const { id } = req.params;
      const deleted = await deleteSqlInquiry(id);
      res.json({ success: true, deleted });
    } catch (err: any) {
      console.error('Failed to delete inquiry in Cloud SQL:', err);
      res.status(500).json({ error: 'Database operation failed. Please try again later.' });
    }
  });

  if (isProd) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port} (0.0.0.0)`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
