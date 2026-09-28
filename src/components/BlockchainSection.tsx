import React from 'react';
import { Network, ShieldCheck, Cpu, Code2, Bot, Layers, ArrowUpRight } from 'lucide-react';

interface BlockchainSectionProps {
  onStartProject: () => void;
}

export const BlockchainSection: React.FC<BlockchainSectionProps> = ({ onStartProject }) => {
  const capabilities = [
    {
      title: 'Real-World Asset Tokenization',
      icon: Layers,
      desc: 'Architecting compliant digital ownership protocols for physical commodities, real estate tranches, and private equity instruments.',
    },
    {
      title: 'Smart Contract Development',
      icon: ShieldCheck,
      desc: 'Immutable, gas-optimized contracts written in Rust (Solana) and Solidity with rigorous test coverage against reentrancy and logic vulnerabilities.',
    },
    {
      title: 'Solana Ecosystem Architecture',
      icon: Cpu,
      desc: 'Leveraging high-throughput, sub-second finality on Solana for high-frequency consumer applications, payment rails, and DeFi vaults.',
    },
    {
      title: 'Automated On-Chain Execution Bots',
      icon: Bot,
      desc: 'Custom low-latency automation engines for liquidity provisioning, arbitrage verification, Telegram bots, and contract event listeners.',
    },
    {
      title: 'Token Creation & Tokenomics',
      icon: Network,
      desc: 'Token standard configuration (SPL, ERC-20), staking mechanisms, vesting release schedules, and sustainable distribution models.',
    },
    {
      title: 'Decentralized Applications (dApps)',
      icon: Code2,
      desc: 'Consumer-grade responsive frontends connected to non-custodial wallet adapters (Phantom, Metamask, Rainbow) with clean transaction UX.',
    },
  ];

  return (
    <section id="web3" className="relative py-28 bg-[#040711]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative & Capabilities */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF]">
              Division 06 · Decentralized Architecture
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.15]">
              Build for the Next <br />
              <span className="text-[#38BDF8]">Digital Economy.</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              We engineer secure on-chain protocols, tokenized ecosystems, and automated infrastructure. No hype or speculative noise—just reliable decentralized software built to institutional standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {capabilities.slice(0, 4).map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="p-4 rounded-xl bg-slate-900/40 border border-white/6 hover:border-[#0084FF]/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#38BDF8] mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1 font-display">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] transition-all shadow-[0_0_20px_rgba(0,132,255,0.35)] cursor-pointer"
              >
                <span>Inquire About Web3 Engineering</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Abstract Network Visual Diagram */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-white/8 text-xs font-mono">
                <span className="text-slate-300">CONSENSUS_VERIFIED_NODE</span>
                <span className="text-emerald-400">NETWORK_LATENCY: 400ms</span>
              </div>

              {/* Minimalist Abstract Topology */}
              <div className="py-8 relative flex flex-col items-center justify-center min-h-[320px]">
                {/* Central Protocol Core */}
                <div className="relative z-10 w-28 h-28 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B1528] border border-[#0084FF]/50 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,132,255,0.25)]">
                  <Network className="w-8 h-8 text-[#38BDF8] mb-1.5" />
                  <span className="text-[10px] font-mono text-white font-bold">STATE_MACHINE</span>
                  <span className="text-[9px] font-mono text-slate-400">Rust / EVM</span>
                </div>

                {/* Orbiting Satellite Nodes */}
                <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 text-center shadow-lg -translate-x-2 -translate-y-20">
                    <div className="text-[10px] font-mono text-[#38BDF8]">PROGRAM</div>
                    <div className="text-xs font-bold text-white">Smart Contract</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 text-center shadow-lg translate-x-2 -translate-y-20">
                    <div className="text-[10px] font-mono text-[#38BDF8]">ASSET</div>
                    <div className="text-xs font-bold text-white">Token Standard</div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 text-center shadow-lg -translate-x-4 translate-y-24">
                    <div className="text-[10px] font-mono text-[#38BDF8]">ENGINE</div>
                    <div className="text-xs font-bold text-white">Automation Bot</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 text-center shadow-lg translate-x-4 translate-y-24">
                    <div className="text-[10px] font-mono text-[#38BDF8]">INTERFACE</div>
                    <div className="text-xs font-bold text-white">Web3 dApp</div>
                  </div>
                </div>
              </div>

              {/* Protocol Metrics Bar */}
              <div className="pt-6 border-t border-white/8 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-[10px] text-slate-400">Security</div>
                  <div className="font-semibold text-white">Zero Exploits</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-[10px] text-slate-400">Standards</div>
                  <div className="font-semibold text-[#38BDF8]">SPL &amp; ERC</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-[10px] text-slate-400">Throughput</div>
                  <div className="font-semibold text-white">Sub-Second</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
