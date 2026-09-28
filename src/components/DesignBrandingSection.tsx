import React from 'react';
import { Palette, Layout, Smartphone, Compass, PenTool, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

interface DesignBrandingProps {
  onStartProject: () => void;
}

export const DesignBrandingSection: React.FC<DesignBrandingProps> = ({ onStartProject }) => {
  const capabilities = [
    { title: 'Brand Identity Systems', desc: 'Distinctive typography, color palettes, vector marks, and strict brand guideline books.' },
    { title: 'UI/UX Interface Design', desc: 'Wireframes, low-to-high fidelity prototypes, design tokens, and user flow architectures.' },
    { title: 'High-Converting Web & Landing Pages', desc: 'Editorial responsive layouts engineered for narrative clarity and maximum conversion rate.' },
    { title: 'Mobile Application Interfaces', desc: 'Pixel-perfect iOS and Android native interactions designed to feel intuitive and lightweight.' },
    { title: 'Software & Enterprise Dashboards', desc: 'Complex data tables, modular component libraries, and ergonomic workflow tools.' },
    { title: 'Marketing Decks & Collateral', desc: 'Executive pitch decks, social launch assets, banners, and tactile corporate stationery.' },
  ];

  return (
    <section id="design" className="relative py-28 bg-[#060A16] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Workspace Column */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-2xl group">
              <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                <img
                  src="/src/assets/images/jl_creative_workspace_1790335477109.jpg"
                  alt="JL Technologies Creative Brand and Design Studio Environment"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A16] via-transparent to-transparent opacity-80" />

                {/* Floating Design System Spec Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-white">JL Design Standards</span>
                    <span className="text-slate-400 font-mono text-[10px]">SYSTEMATIC_EXCELLENCE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#0084FF] flex items-center justify-center text-[9px] font-bold text-white">
                      Aa
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Harmonized typographic scales, 8pt spatial grid, and accessibility-first WCAG AAA contrast guidelines.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text and Capabilities Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF]">
              Division 03 · Brand &amp; Digital Experience
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.15]">
              Make Your Brand <br />
              <span className="text-[#38BDF8]">Impossible to Ignore.</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Great design is commercial leverage. At JL Technologies, we shape visual identities and digital products that command authority, tell a compelling narrative, and turn casual observers into devoted customers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {capabilities.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/6 hover:border-[#0084FF]/30 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-white mb-1 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] transition-all shadow-[0_0_20px_rgba(0,132,255,0.35)] cursor-pointer"
              >
                <span>Request Brand Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
