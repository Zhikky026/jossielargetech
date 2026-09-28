import React from 'react';
import { Target, Palette, Terminal, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

export const WhyJLSection: React.FC = () => {
  const principles = [
    {
      title: 'Strategy First',
      icon: Target,
      headline: 'We start with the commercial objective, not just the technology.',
      description: 'Before recommending a framework, launching an ad set, or building an app, we evaluate how each decision directly impacts customer acquisition, operational margins, and commercial sustainability.',
    },
    {
      title: 'Audience-Centric Creative',
      icon: Palette,
      headline: 'Design and content are built around the audience and brand.',
      description: 'We avoid decorative indulgence. Every visual identity, UI prototype, and AI video reel is engineered to hold human attention and convey unwavering authority in crowded markets.',
    },
    {
      title: 'Practical Engineering',
      icon: Terminal,
      headline: 'We develop practical digital products and systems.',
      description: 'No bloated code or unmaintainable dependencies. We deliver clean TypeScript architectures, native mobile apps, and robust backends designed to be simple for your team to operate.',
    },
    {
      title: 'Deep Automation',
      icon: Zap,
      headline: 'We reduce repetitive work and connect business processes.',
      description: 'By unifying your marketing lead capture, CRM data, and customer communication via n8n, Make, and voice agents, we turn chaotic manual routines into frictionless background processes.',
    },
    {
      title: 'Measurable Growth',
      icon: TrendingUp,
      headline: 'The goal is not simply to launch—it is to create something useful for the business.',
      description: 'A launch is only day one. We ensure systems are instrumented with clean analytics, reliable alerts, and continuous feedback loops that prove commercial value.',
    },
  ];

  return (
    <section id="why-us" className="relative py-28 bg-[#060A16] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF] mb-3">
            The JL Model
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            One Team. <br />
            <span className="text-[#38BDF8]">Multiple Digital Capabilities.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Most businesses are forced to coordinate separate marketing agencies, freelance designers, software developers, and automation consultants. JL Technologies unifies these disciplines under a coherent technical and creative roadmap.
          </p>
        </div>

        {/* 5 Architectural Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="glass-panel rounded-2xl p-7 flex flex-col justify-between border border-white/8 hover:border-[#0084FF]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#0084FF]/20 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Principle 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {p.title}
                  </h3>

                  <p className="text-xs font-medium text-[#38BDF8] mb-3">
                    {p.headline}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0084FF] shrink-0" />
                  <span>Disciplined execution standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
