import React from 'react';
import { Target, Palette, Terminal, Zap, TrendingUp } from 'lucide-react';

export const TrustStatement: React.FC = () => {
  const pillars = [
    {
      title: 'Strategy',
      icon: Target,
      desc: 'We start with the commercial objective, defining the exact path to revenue, efficiency, or brand dominance before writing a line of code or running a campaign.',
    },
    {
      title: 'Design',
      icon: Palette,
      desc: 'Interfaces, visual identity, and media built to capture attention, communicate authority, and convert traffic into qualified buyers.',
    },
    {
      title: 'Technology',
      icon: Terminal,
      desc: 'Robust engineering across mobile, desktop, custom web applications, and smart contracts with clean architecture and maintainability.',
    },
    {
      title: 'Automation',
      icon: Zap,
      desc: 'End-to-end operational workflows connecting your CRM, marketing engines, AI agents, and communication channels without manual friction.',
    },
    {
      title: 'Growth',
      icon: TrendingUp,
      desc: 'Continuous performance optimization, turning digital presence into a sustainable competitive advantage for ambitious businesses.',
    },
  ];

  return (
    <section className="relative py-20 bg-[#060A16] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#0084FF] mb-3">
            Core Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            Strategy. Design. Technology. Growth.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            JL Technologies combines digital marketing, creative design, software development, AI, and automation to help businesses attract customers, build better digital experiences, and scale with technology.
          </p>
        </div>

        {/* 5 Distinct Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass-panel p-6 rounded-2xl border border-white/8 hover:border-[#0084FF]/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#0084FF]/20 group-hover:border-[#0084FF]/40 transition-colors mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-slate-400 mb-1">
                  0{idx + 1}.
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-display">
                  {pillar.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-300">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
