import React from 'react';
import { Layers, ArrowUpRight, Lock, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface CaseStudiesProps {
  onStartProject: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesProps> = ({ onStartProject }) => {
  const conceptProjects = [
    {
      title: 'Aura Logistics Telemetry Platform',
      category: 'Software & Cloud Architecture',
      label: 'Concept Architecture',
      description: 'End-to-end dispatch and driver telemetry application combining a mobile driver companion app with a high-throughput fleet operations dashboard.',
      tech: ['React Native', 'Node.js', 'PostgreSQL', 'WebSockets', 'Tailwind CSS'],
      focus: 'Sub-second vehicle status propagation with offline synchronization for low-connectivity delivery zones.',
    },
    {
      title: 'OmniLead Healthcare Voice Concierge',
      category: 'AI & Automation Systems',
      label: 'Concept Architecture',
      description: 'Automated 24/7 inbound patient intake and qualification system connecting Meta ad leads to autonomous Vapi voice agents and instant CRM calendar bookings.',
      tech: ['Retell AI', 'n8n Workflows', 'GoHighLevel', 'Meta Graph API', 'Twilio'],
      focus: 'Eliminating the 4-hour front-desk response delay, dropping patient lead drop-off without increasing administrative staff.',
    },
    {
      title: 'Verve Studio Synthetic Media Suite',
      category: 'AI Video & Brand Identity',
      label: 'Concept Architecture',
      description: 'Modular synthetic video production pipeline for direct-to-consumer e-commerce brands needing 20+ localized TikTok creative variations per week.',
      tech: ['Synthetic Avatars', 'Automated Captions', 'ElevenLabs Voice', '4K Upscaling'],
      focus: 'Rapid multi-angle creative iteration for weekly paid advertising split-testing.',
    },
  ];

  return (
    <section id="work" className="relative py-28 bg-[#060A16] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF] mb-3">
              Solution Blueprints &amp; Architecture
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Selected Work &amp; Concept Builds
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed font-normal">
              To respect client non-disclosure agreements, live client case studies are shared under consultation. Below are representative concept architectures demonstrating our multidisciplinary execution standard.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 shrink-0">
            <Lock className="w-3.5 h-3.5 text-[#0084FF]" />
            <span>Client Case Studies Under NDA</span>
          </div>
        </div>

        {/* 3 Asymmetric Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conceptProjects.map((p) => (
            <div
              key={p.title}
              className="glass-panel rounded-2xl p-7 flex flex-col justify-between border border-white/8 hover:border-[#0084FF]/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-[#38BDF8] px-2.5 py-0.5 rounded-full bg-[#0084FF]/10 border border-[#0084FF]/20">
                    {p.label}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {p.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-[#38BDF8] transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {p.description}
                </p>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 mb-6">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Engineering Focus:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.focus}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mb-6">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-white/5 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={onStartProject}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-[#0084FF] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Similar Solution</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Work Coming Soon Transparency Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#0B1528] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0084FF]/10 border border-[#0084FF]/20 flex items-center justify-center text-[#38BDF8] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display">
                Public Case Studies &amp; Teardowns Coming Soon
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                We are preparing verified production case studies for upcoming public release with permission from client partners.
              </div>
            </div>
          </div>

          <button
            onClick={onStartProject}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] transition-colors shrink-0 cursor-pointer shadow-md"
          >
            Schedule Portfolio Briefing
          </button>
        </div>
      </div>
    </section>
  );
};
