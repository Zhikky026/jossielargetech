import React from 'react';
import { JLLogo } from './JLLogo';
import { ArrowUp, Mail, MessageSquare, Shield, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#03060E] border-t border-white/8 pt-16 pb-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <JLLogo variant="full" size="md" />
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mt-4">
              Digital marketing, design, software, AI and automation solutions for growing businesses. We engineer commercial leverage through strategy and technology.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-300">
              <a
                href="mailto:contact@jltechnologies.com"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0084FF] hover:text-white transition-colors"
                aria-label="Email JL Technologies"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://wa.me/?text=Hello%20JL%20Technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                aria-label="WhatsApp JL Technologies"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-mono">
                <Globe className="w-3 h-3 text-[#0084FF]" />
                <span>Worldwide Operations</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#automation" className="hover:text-white transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  About &amp; Principles
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Service Divisions
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#marketing" className="hover:text-white transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#creative" className="hover:text-white transition-colors">
                  AI Video &amp; Creative
                </a>
              </li>
              <li>
                <a href="#design" className="hover:text-white transition-colors">
                  Design &amp; Branding
                </a>
              </li>
              <li>
                <a href="#software" className="hover:text-white transition-colors">
                  App &amp; Software Dev
                </a>
              </li>
              <li>
                <a href="#automation" className="hover:text-white transition-colors">
                  Automation &amp; AI Systems
                </a>
              </li>
              <li>
                <a href="#web3" className="hover:text-white transition-colors">
                  Blockchain &amp; Web3
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Location */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Direct Contact
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inquiries: <br />
              <span className="text-white font-mono">contact@jltechnologies.com</span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Response Time: <br />
              <span className="text-slate-300">Within 24 business hours</span>
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-300 text-[11px]">
          <div>
            &copy; 2026 JL Technologies (JossieLarge Technologies). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#hero" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <span>·</span>
            <span className="text-slate-300">Strategy · Design · Technology · Growth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
