import React from 'react';
import { 
  Rocket, 
  ShoppingBag, 
  Building2, 
  HeartPulse, 
  Briefcase, 
  Hotel, 
  Utensils, 
  Cpu, 
  Coins, 
  GraduationCap 
} from 'lucide-react';

export const IndustriesSection: React.FC = () => {
  const industries = [
    { name: 'Startups & Ventures', icon: Rocket, solution: 'MVP scoping, brand identity, and rapid initial user acquisition funnels.' },
    { name: 'E-Commerce Brands', icon: ShoppingBag, solution: 'High-converting TikTok/Meta creative, Shopify engineering, and retargeting.' },
    { name: 'Real Estate & Property', icon: Building2, solution: 'Automated buyer lead qualification, WhatsApp notifications, and portal sites.' },
    { name: 'Healthcare & Wellness', icon: HeartPulse, solution: 'HIPAA-conscious appointment booking, patient intake bots, and local reach.' },
    { name: 'Professional Services', icon: Briefcase, solution: 'B2B executive outreach, high-authority brand websites, and CRM pipeline sync.' },
    { name: 'Hospitality & Luxury', icon: Hotel, solution: 'Visual storytelling, dynamic reservation flows, and premium creative assets.' },
    { name: 'Restaurants & Dining', icon: Utensils, solution: 'Local search domination, menu interfaces, and promotional event campaigns.' },
    { name: 'Technology & SaaS', icon: Cpu, solution: 'Product demo videos, developer documentation, and subscription app builds.' },
    { name: 'Finance & FinTech', icon: Coins, solution: 'Secure token protocols, compliance portals, and rigorous UX architectures.' },
    { name: 'Education & Training', icon: GraduationCap, solution: 'Interactive student platforms, course funnels, and AI talking tutors.' },
  ];

  return (
    <section className="relative py-24 bg-[#040711]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF] mb-3">
            Domain Versatility
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Industries We Can Support
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Our modular approach to marketing, design, and software architecture can be adapted across diverse commercial domains.
          </p>
        </div>

        {/* 10 Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="p-5 rounded-2xl bg-slate-900/40 border border-white/6 hover:border-[#0084FF]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#0084FF] group-hover:text-white transition-colors mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 font-display">
                    {ind.name}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                  {ind.solution}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
