import React from 'react';
import { Search, Compass, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      tagline: 'Understand the business, audience, goals, and challenges.',
      desc: 'We conduct a structured audit of your existing digital assets, operational bottlenecks, competitor landscapes, and revenue milestones to establish clear project boundaries.',
      icon: Search,
      deliverables: ['Discovery Brief', 'Architecture Scope', 'KPI Baseline'],
    },
    {
      number: '02',
      title: 'Strategize',
      tagline: 'Define the right digital, creative, or technical solution.',
      desc: 'We map out the exact sequence of deliverables—whether that entails paid campaign funnels, AI video scripting, tech stack selection, or automation triggers.',
      icon: Compass,
      deliverables: ['Technical Spec', 'Campaign Roadmap', 'Sprint Plan'],
    },
    {
      number: '03',
      title: 'Design',
      tagline: 'Create the experience, visual direction, and system.',
      desc: 'Visual mockups, interface wireframes, brand identities, and video storyboards are created and refined with iterative feedback before implementation.',
      icon: PenTool,
      deliverables: ['Figma Prototypes', 'Asset Previews', 'Copy Blueprints'],
    },
    {
      number: '04',
      title: 'Build',
      tagline: 'Develop, integrate, automate, and test.',
      desc: 'Full-stack software engineering, ad creative assembly, n8n/Make scenario routing, and rigorous cross-browser/cross-device quality assurance.',
      icon: Code2,
      deliverables: ['Production Code', 'Configured Workflows', 'QA Verification'],
    },
    {
      number: '05',
      title: 'Launch & Improve',
      tagline: 'Deploy the solution and refine it based on real-world needs.',
      desc: 'Controlled deployment to production, launch of paid media campaigns, continuous telemetry monitoring, and ongoing performance refinement.',
      deliverables: ['Deployment', 'Telemetry Analytics', 'Continuous Tuning'],
      icon: Rocket,
    },
  ];

  return (
    <section id="process" className="relative py-28 bg-[#040711]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF] mb-3">
            Engagement Methodology
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            From First Conversation <br />
            <span className="text-[#38BDF8]">to Launch.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            A structured, repeatable five-step delivery model ensuring transparency, rigorous quality control, and zero unexpected delays.
          </p>
        </div>

        {/* 5-Step Process Horizontal / Stack Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="glass-panel rounded-2xl p-6 border border-white/8 hover:border-[#0084FF]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold font-mono text-[#0084FF]/80 group-hover:text-[#38BDF8] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 font-display">
                    {step.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-300 mb-3">
                    {step.tagline}
                  </p>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 space-y-1.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Deliverables:
                  </div>
                  {step.deliverables.map((d) => (
                    <div key={d} className="text-[10px] text-slate-300 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#0084FF]" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
