import React from 'react';
import { 
  Megaphone, 
  Video, 
  Sparkles, 
  Code2, 
  Bot, 
  Network, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ServicesOverviewProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onSelectService }) => {
  const divisions = [
    {
      id: 'marketing',
      title: 'Digital Marketing',
      headline: 'Turn Attention Into Opportunity',
      icon: Megaphone,
      desc: 'Targeted acquisition systems across paid search, social platforms, cold outreach, and performance funnels designed to generate qualified demand.',
      items: [
        'Google Ads & Search Campaigns',
        'Meta & Instagram Advertising',
        'TikTok Ads & Viral Angles',
        'High-Intent Lead Generation',
        'B2B Cold Outreach Systems',
        'Multi-Channel Promo Campaigns',
      ],
      targetSection: '#marketing',
      badge: 'Demand Generation',
    },
    {
      id: 'video',
      title: 'AI Video & Creative',
      headline: 'Content That Looks Like the Future',
      icon: Video,
      desc: 'High-production virtual spokespersons, UGC clips, and product explainers synthesized with state-of-the-art AI video tools at unprecedented velocity.',
      items: [
        'AI UGC Advertising Videos',
        'AI Spokesperson Presentations',
        'Talking Avatars & Clones',
        'Commercial & Brand Videos',
        'Explainer & Educational Media',
        'SaaS & Product Demo Reels',
      ],
      targetSection: '#creative',
      badge: 'Synthetic Media',
    },
    {
      id: 'design',
      title: 'Design & Branding',
      headline: 'Make Your Brand Impossible to Ignore',
      icon: Sparkles,
      desc: 'World-class visual identity systems, interface design, marketing assets, and conversion-focused web architecture tailored for modern brands.',
      items: [
        'Logo & Visual Identity Systems',
        'UI/UX Architecture & Prototyping',
        'High-Converting Landing Pages',
        'Banners, Decks & Print Collateral',
        'Design Systems & Guidelines',
        'Software & Mobile App Design',
      ],
      targetSection: '#design',
      badge: 'Identity & UI/UX',
    },
    {
      id: 'software',
      title: 'App & Software Development',
      headline: 'From Idea to Working Product',
      icon: Code2,
      desc: 'Engineering resilient, scalable digital products across iOS, Android, desktop, and modern web clouds with clean maintainable code.',
      items: [
        'iOS & Android Native / Cross-Platform',
        'Desktop & Cross-OS Applications',
        'Full-Stack Web & Cloud Platforms',
        'AI-Powered Intelligent Software',
        'Custom Enterprise Portals',
        'API Architectures & Backends',
      ],
      targetSection: '#software',
      badge: 'Engineering',
    },
    {
      id: 'automation',
      title: 'Automation & AI Systems',
      headline: 'Automate the Work. Scale the Business',
      icon: Bot,
      desc: 'Orchestrating workflows across n8n, Make, Odoo, and CRMs, integrated with voice AI agents (Vapi, Retell) to eliminate manual labor.',
      items: [
        'n8n & Make Workflow Pipelines',
        'Retell & Vapi Voice AI Agents',
        'GoHighLevel & CRM Automations',
        'Odoo ERP & Operations Setup',
        'Lead Ingestion & Qualification Bots',
        'Autonomous AI Operations',
      ],
      targetSection: '#automation',
      badge: 'Operations & AI',
    },
    {
      id: 'web3',
      title: 'Blockchain & Web3',
      headline: 'Build for the Next Digital Economy',
      icon: Network,
      desc: 'Secure tokenization frameworks, Solana ecosystem applications, smart contracts, and automation bots built with rigorous technical discipline.',
      items: [
        'Asset & Real-World Tokenization',
        'Solana Protocol & Program Dev',
        'Audited Smart Contracts',
        'Automated On-Chain Execution Bots',
        'Decentralized Application (dApp) Frontends',
        'Web3 Data & Wallet Integrations',
      ],
      targetSection: '#web3',
      badge: 'Decentralized Tech',
    },
  ];

  return (
    <section id="services" className="relative py-28 bg-[#040711]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF] mb-3">
            Service Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Everything You Need to Grow Digitally
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            From customer acquisition to software development and business automation, JL Technologies brings strategy, creativity, and technology together under one team.
          </p>
        </div>

        {/* 6 Major Divisions Bento-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.id}
                className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0084FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-[#38BDF8] group-hover:border-[#0084FF]/40 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {div.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-[#38BDF8] transition-colors">
                    {div.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {div.desc}
                  </p>

                  {/* Representative Services List */}
                  <div className="space-y-2 pt-4 border-t border-white/5 mb-6">
                    {div.items.slice(0, 4).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0084FF] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                    {div.items.length > 4 && (
                      <div className="text-[11px] text-slate-400 pl-5">
                        + {div.items.length - 4} additional specializations
                      </div>
                    )}
                  </div>
                </div>

                {/* Explore service interaction */}
                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <a
                    href={div.targetSection}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white group-hover:text-[#38BDF8] transition-colors"
                  >
                    <span>Explore division</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>

                  <button
                    onClick={() => onSelectService(div.title)}
                    className="text-[11px] font-medium text-slate-400 hover:text-white hover:underline cursor-pointer"
                  >
                    Request
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
