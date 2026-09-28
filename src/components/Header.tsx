import React, { useState, useEffect } from 'react';
import { JLLogo } from './JLLogo';
import { Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onStartProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Solutions', href: '#automation' },
    { label: 'Work', href: '#work' },
    { label: 'Why JL', href: '#why-us' },
    { label: 'Process', href: '#process' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-4 ${
          isScrolled
            ? 'bg-[#040711]/85 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
            aria-label="JL Technologies Home"
          >
            <JLLogo variant="header" size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/8 backdrop-blur-md shadow-inner shadow-white/5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full transition-colors relative hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onStartProject}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(0,132,255,0.35)] hover:shadow-[0_0_28px_rgba(0,132,255,0.55)] cursor-pointer active:scale-95"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900/70 border border-white/10 backdrop-blur-sm"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#040711]/95 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
              Navigation
            </p>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-lg font-semibold text-slate-200 hover:text-[#0084FF] border-b border-white/5 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartProject();
              }}
              className="w-full py-3.5 px-4 text-center text-sm font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] rounded-xl flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,132,255,0.4)]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 text-center text-sm font-medium text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
            >
              Explore Services
            </a>
          </div>
        </div>
      )}
    </>
  );
};
