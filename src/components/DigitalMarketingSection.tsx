import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Target, 
  Search, 
  Share2, 
  Users, 
  Mail, 
  Compass, 
  BarChart, 
  Check, 
  Sliders
} from 'lucide-react';

interface DigitalMarketingProps {
  onGrowReach: () => void;
}

export const DigitalMarketingSection: React.FC<DigitalMarketingProps> = ({ onGrowReach }) => {
  const [activeChannel, setActiveChannel] = useState<'all' | 'search' | 'social' | 'outreach'>('all');

  const channels = [
    {
      name: 'Google Ads',
      category: 'search',
      role: 'High-Intent Search & Shopping',
      description: 'Capture active demand the moment prospects search for your exact solution with keyword precision, negative matching, and conversion tracking.',
    },
    {
      name: 'Meta Ads (FB & IG)',
      category: 'social',
      role: 'Full-Funnel Social Acquisition',
      description: 'Creative-driven prospecting and algorithmic retargeting across Instagram & Facebook that turns scrollers into repeat customers.',
    },
    {
      name: 'TikTok Ads',
      category: 'social',
      role: 'High-Velocity Video Hooks',
      description: 'Native short-form video ads tailored for rapid discovery, trend-driven creative concepts, and immediate consumer engagement.',
    },
    {
      name: 'Lead Generation Funnels',
      category: 'search',
      role: 'Dedicated Landing Page Architectures',
      description: 'Frictionless qualification forms and automated follow-up sequences designed to maximize conversion rates from cold clicks.',
    },
    {
      name: 'B2B Cold Outreach',
      category: 'outreach',
      role: 'Targeted Account Ingestion',
      description: 'Verified prospecting lists, warmed infrastructure, and tailored messaging sequences that land directly in decision-makers’ inboxes.',
    },
    {
      name: 'Campaign & Promo Management',
      category: 'social',
      role: 'Seasonal & Growth Accelerators',
      description: 'Comprehensive promotion roadmaps, offer structuring, and real-time budget reallocations across performing creative assets.',
    },
  ];

  const filteredChannels = activeChannel === 'all' 
    ? channels 
    : channels.filter(c => c.category === activeChannel);

  return (
    <section id="marketing" className="relative py-28 bg-[#060A16] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative & Services */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF]">
              Division 01 · Demand &amp; Acquisition
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.12]">
              Turn Attention Into <br className="hidden sm:inline" />
              <span className="text-[#38BDF8]">Opportunity.</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              JL Technologies helps businesses reach the right audience, generate demand, and convert attention into qualified opportunities. We engineer digital marketing campaigns grounded in audience psychology, creative testing, and multi-channel attribution.
            </p>

            {/* Filter Tabs for Strategy Depth */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-white/8 w-fit text-xs">
              <button
                onClick={() => setActiveChannel('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  activeChannel === 'all' ? 'bg-[#0084FF] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Channels
              </button>
              <button
                onClick={() => setActiveChannel('search')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  activeChannel === 'search' ? 'bg-[#0084FF] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Search &amp; Inbound
              </button>
              <button
                onClick={() => setActiveChannel('social')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  activeChannel === 'social' ? 'bg-[#0084FF] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Social Ads
              </button>
              <button
                onClick={() => setActiveChannel('outreach')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  activeChannel === 'outreach' ? 'bg-[#0084FF] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cold Outreach
              </button>
            </div>

            {/* Service Capabilities Grid */}
            <div className="space-y-3 pt-2">
              {filteredChannels.map((c) => (
                <div 
                  key={c.name}
                  className="p-4 rounded-xl bg-slate-900/50 border border-white/6 hover:border-white/15 transition-colors flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{c.name}</span>
                      <span className="text-[11px] font-mono text-[#38BDF8] px-2 py-0.5 rounded bg-[#0084FF]/10">
                        {c.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onGrowReach}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] transition-all shadow-[0_0_20px_rgba(0,132,255,0.35)] cursor-pointer"
              >
                <span>Grow Your Reach</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: High-End Campaign Analytics & Architecture Console */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
              {/* Console Top Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-300 font-medium">
                    CAMPAIGN_ATTRIBUTION_MONITOR
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Sliders className="w-3.5 h-3.5 text-[#0084FF]" />
                  <span>Cross-Network Sync</span>
                </div>
              </div>

              {/* Multi-Channel Distribution Matrix */}
              <div className="py-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Google Ads · High-Intent Search</span>
                    <span className="font-mono text-slate-400">Audience: Ready-to-Buy</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-[#0084FF] rounded-full w-[82%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Meta &amp; Instagram · Creative Prospecting</span>
                    <span className="font-mono text-slate-400">Audience: Visual Engaged</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-[#38BDF8] rounded-full w-[68%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">TikTok Short-Form · Velocity Discovery</span>
                    <span className="font-mono text-slate-400">Audience: Trend Driven</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[54%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Outbound Sequences · Decision Makers</span>
                    <span className="font-mono text-slate-400">Audience: Verified Executives</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full w-[45%]" />
                  </div>
                </div>
              </div>

              {/* Attribution Architecture Flow */}
              <div className="pt-4 border-t border-white/8">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Conversion Pipeline Architecture
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[11px] text-slate-400 mb-0.5">Stage 01</div>
                    <div className="font-semibold text-white">Targeted Traffic</div>
                    <div className="text-[10px] text-slate-500 mt-1">Multi-channel reach</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[11px] text-[#38BDF8] mb-0.5">Stage 02</div>
                    <div className="font-semibold text-white">Lead Ingestion</div>
                    <div className="text-[10px] text-slate-500 mt-1">Automated scoring</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[11px] text-emerald-400 mb-0.5">Stage 03</div>
                    <div className="font-semibold text-white">CRM Handoff</div>
                    <div className="text-[10px] text-slate-500 mt-1">Instant notification</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3.5 rounded-xl bg-[#0084FF]/10 border border-[#0084FF]/20 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8]" />
                  <span>Real-time tracking without fabricated vanity figures</span>
                </div>
                <span className="font-mono text-[11px] text-[#38BDF8]">Grounded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
