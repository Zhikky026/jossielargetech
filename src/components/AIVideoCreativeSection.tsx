import React, { useState } from 'react';
import { Play, Sparkles, Video, Film, Eye, Mic2, MonitorPlay } from 'lucide-react';

interface AIVideoCreativeProps {
  onStartProject: () => void;
}

export const AIVideoCreativeSection: React.FC<AIVideoCreativeProps> = ({ onStartProject }) => {
  const [activeFormat, setActiveFormat] = useState<number>(0);

  const formats = [
    {
      id: 'ugc',
      title: 'AI UGC Videos',
      label: 'Performance Ads',
      desc: 'High-converting user-generated style testimonials and unboxing hooks generated with realistic human models for TikTok, Meta, and YouTube Shorts.',
      specs: '9:16 Vertical · Dynamic Captions · Native Audio',
      metrics: 'Designed for scroll-stopping 3-second hook rate',
    },
    {
      id: 'spokesperson',
      title: 'AI Spokesperson Videos',
      label: 'Brand Front',
      desc: 'Professional studio-quality virtual presenters delivering company announcements, keynote intros, and investor updates in dozens of languages.',
      specs: '16:9 & 9:16 · Multilingual Lip-Sync · 4K Clarity',
      metrics: 'Consistent brand persona across global markets',
    },
    {
      id: 'avatar',
      title: 'Talking Avatars & Clones',
      label: 'Executive Cloning',
      desc: 'Digital twins of founders and subject-matter experts capable of generating weekly educational video newsletters and social clips from text scripts.',
      specs: 'Natural Gestures · Voice Cloned · Rapid Turnaround',
      metrics: 'Eliminates studio booking and filming fatigue',
    },
    {
      id: 'commercial',
      title: 'Commercial & Brand Videos',
      label: 'High Production',
      desc: 'Cinematic visual treatments, 3D world transitions, and bespoke sound design crafted for top-of-funnel brand campaigns and awareness drives.',
      specs: 'Cinematic Color Grade · Spatial Sound · Narrative Pace',
      metrics: 'Broadcast-ready visual presence',
    },
    {
      id: 'explainer',
      title: 'Explainer Videos',
      label: 'Education & Trust',
      desc: 'Simplifying complex technical, financial, and enterprise workflows into elegant animated motion diagrams with synthetic narration.',
      specs: 'Vector Graphics · Step-by-Step Logic · High Clarity',
      metrics: 'Reduces customer support onboarding queries',
    },
    {
      id: 'saas',
      title: 'SaaS / Product Videos',
      label: 'Feature Showcase',
      desc: 'Sleek UI animations, feature spotlights, and software walkthroughs highlighting value propositions for product launches and investor decks.',
      specs: 'Interface Zooms · Interactive Clicks · High Retain',
      metrics: 'Optimized for landing page sign-up conversion',
    },
  ];

  return (
    <section id="creative" className="relative py-28 bg-[#040711] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF] mb-3">
            Division 02 · Synthetic Media &amp; Motion
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Content That Looks Like the Future.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            JL Technologies creates AI-powered video content for marketing, advertising, product demonstrations, and social media. Produce broadcast-quality commercials and high-velocity UGC without months of traditional studio overhead.
          </p>
        </div>

        {/* Interactive Production Suite & Studio Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Cinematic Showcase Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-2xl group">
              {/* High-Fidelity Generated Studio Imagery */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <img
                  src="/src/assets/images/jl_ai_creative_suite_1790335488809.jpg"
                  alt="JL Technologies AI Video and Creative Production Studio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-[#040711]/40 to-transparent" />

                {/* Simulated Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#0084FF]/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-[0_0_32px_rgba(0,132,255,0.6)] group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300">
                  <Film className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>AI_SYNTHETIC_WORKFLOW</span>
                </div>

                {/* Bottom Active Format Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
                      Selected Format Preview
                    </span>
                    <h3 className="text-xl font-bold text-white font-display">
                      {formats[activeFormat].title}
                    </h3>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-mono text-slate-400">
                      {formats[activeFormat].specs}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Details Bar */}
              <div className="p-6 bg-slate-900/90 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-300 max-w-md">
                  {formats[activeFormat].desc}
                </p>
                <button
                  onClick={onStartProject}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] transition-colors shrink-0 cursor-pointer"
                >
                  Commission Video
                </button>
              </div>
            </div>
          </div>

          {/* Right Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Creative Production Track
            </div>

            {formats.map((fmt, index) => (
              <div
                key={fmt.id}
                onClick={() => setActiveFormat(index)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeFormat === index
                    ? 'bg-slate-900/90 border-[#0084FF]/60 shadow-[0_0_20px_rgba(0,132,255,0.15)]'
                    : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-bold font-display ${activeFormat === index ? 'text-[#38BDF8]' : 'text-white'}`}>
                    {fmt.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5">
                    {fmt.label}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {fmt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
