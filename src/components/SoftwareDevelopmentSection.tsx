import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Cpu, 
  Database, 
  Cloud, 
  Terminal, 
  Check, 
  ArrowUpRight 
} from 'lucide-react';

interface SoftwareDevelopmentProps {
  onStartProject: () => void;
}

export const SoftwareDevelopmentSection: React.FC<SoftwareDevelopmentProps> = ({ onStartProject }) => {
  const [activePlatform, setActivePlatform] = useState<'mobile' | 'web' | 'enterprise'>('mobile');

  const platforms = {
    mobile: {
      title: 'iOS & Android Native & Cross-Platform',
      desc: 'Swift, Kotlin, and React Native architectures crafted for 60fps responsiveness, offline caching, and seamless biometric authentication.',
      stack: ['Swift / SwiftUI', 'Kotlin / Compose', 'React Native', 'SQLite / CoreData', 'Push Services'],
    },
    web: {
      title: 'Cloud Applications & SaaS Platforms',
      desc: 'High-availability web applications built with TypeScript, React, Next.js, and serverless backends engineered for rapid scale.',
      stack: ['React / TypeScript', 'Node.js / Express', 'PostgreSQL / Redis', 'Tailwind CSS', 'Docker / AWS'],
    },
    enterprise: {
      title: 'Custom Software & AI Integrations',
      desc: 'Internal tooling, inventory portals, LLM API orchestration, and proprietary enterprise software tailored to bespoke operational logic.',
      stack: ['Python Microservices', 'REST / GraphQL APIs', 'Vector Embeddings', 'Role-Based Access (RBAC)', 'CI/CD Pipelines'],
    },
  };

  return (
    <section id="software" className="relative py-28 bg-[#040711]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF]">
              Division 04 · Full-Cycle Engineering
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.15]">
              From Idea to <br />
              <span className="text-[#38BDF8]">Working Product.</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              We design and build digital products that solve real business problems—from mobile applications to custom enterprise software. Clean codebases, automated tests, and scalable architectures designed for longevity.
            </p>

            {/* Platform Selector */}
            <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-white/8 w-fit text-xs">
              <button
                onClick={() => setActivePlatform('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activePlatform === 'mobile' ? 'bg-[#0084FF] text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Apps</span>
              </button>

              <button
                onClick={() => setActivePlatform('web')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activePlatform === 'web' ? 'bg-[#0084FF] text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Cloud &amp; Web</span>
              </button>

              <button
                onClick={() => setActivePlatform('enterprise')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activePlatform === 'enterprise' ? 'bg-[#0084FF] text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Enterprise &amp; AI</span>
              </button>
            </div>

            {/* Platform Details Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/8 space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                {platforms[activePlatform].title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {platforms[activePlatform].desc}
              </p>

              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Engineered With:
                </div>
                <div className="flex flex-wrap gap-2">
                  {platforms[activePlatform].stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/8 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] transition-all shadow-[0_0_20px_rgba(0,132,255,0.35)] cursor-pointer"
              >
                <span>Scope Your Software Build</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Tech Architecture Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-2xl group">
              <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                <img
                  src="/src/assets/images/jl_tech_architecture_1790335500571.jpg"
                  alt="JL Technologies Software Engineering and Architecture Environment"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-transparent to-transparent opacity-75" />

                {/* Architecture Overlay Diagnostics */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/75 border border-white/10 backdrop-blur-md text-[11px] font-mono text-emerald-400 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ARCHITECTURE: DEPLOYED</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px]">Testing</div>
                      <div className="font-semibold text-white">Full CI/CD</div>
                    </div>
                    <div className="border-x border-white/10">
                      <div className="text-slate-400 text-[10px]">Delivery</div>
                      <div className="font-semibold text-[#38BDF8]">Clean Code</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Ownership</div>
                      <div className="font-semibold text-white">100% IP Handover</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
