import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Send, 
  CheckCircle2, 
  Mail, 
  MessageSquare, 
  Phone, 
  Clock, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: preselectedService || 'Digital Marketing',
    budget: '$1,000–$5,000',
    timeline: 'Within 1 month',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'Digital Marketing',
    'AI Video & Creative',
    'Branding & Design',
    'Website / Landing Page',
    'App Development',
    'Software Development',
    'AI Application',
    'Automation',
    'Blockchain / Web3',
    'Other',
  ];

  const budgetOptions = [
    'Under $500',
    '$500–$1,000',
    '$1,000–$5,000',
    '$5,000–$10,000',
    '$10,000+',
    'Not sure yet',
  ];

  const timelineOptions = [
    'Immediate (Urgent)',
    'Within 1 month',
    '1–3 months',
    'Flexible / Planning',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setErrorMessage('Please provide your name, valid email, and brief project description.');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable project ingestion
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#060A16] border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#0084FF]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Large Final CTA Banner */}
        <div className="glass-panel rounded-3xl border border-white/10 p-8 sm:p-14 mb-20 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF] mb-3">
            Ready to Build?
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Have a Business Idea? <br />
            <span className="text-[#38BDF8]">Let's Build It.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Tell us what you're trying to achieve and we'll help you identify the right digital, creative, or technology solution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#project-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] rounded-full transition-all shadow-[0_0_24px_rgba(0,132,255,0.4)] cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/?text=Hello%20JL%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900 border border-white/10 rounded-full transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Talk to Our Team on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Project Inquiry Section */}
        <div id="project-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct channels & Confidence */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF]">
              Project Intake &amp; Consultation
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold text-white font-display">
              Request a Formal Proposal.
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Every inquiry is reviewed by our technical and marketing directors. We typically respond within 24 business hours with initial solution recommendations and scope estimations.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="mailto:contact@jltechnologies.com"
                className="p-4 rounded-xl bg-slate-900/60 border border-white/8 hover:border-[#0084FF]/40 transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#0084FF] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-mono">DIRECT INQUIRIES</div>
                  <div className="text-sm font-semibold text-white">contact@jltechnologies.com</div>
                </div>
              </a>

              <a
                href="https://wa.me/?text=Hello%20JL%20Technologies,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-900/60 border border-white/8 hover:border-emerald-500/40 transition-colors flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-mono">DIRECT WHATSAPP</div>
                  <div className="text-sm font-semibold text-white">Chat With A Specialist</div>
                </div>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-white">
                <ShieldCheck className="w-4 h-4 text-[#0084FF]" />
                <span>Client Confidentiality Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                All business concepts, code requirements, and project specifications shared with JL Technologies are treated under mutual non-disclosure standards.
              </p>
            </div>
          </div>

          {/* Right Column: Complete Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-display">
                    Project Request Received
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our team has received your inquiry regarding <span className="text-[#38BDF8] font-semibold">{formData.service}</span>. We will review your requirements and reach out shortly via email or WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        service: 'Digital Marketing',
                        budget: '$1,000–$5,000',
                        timeline: 'Within 1 month',
                        description: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/8 pb-4 mb-2">
                    <h4 className="text-lg font-bold text-white font-display">
                      Project Specification Form
                    </h4>
                    <p className="text-xs text-slate-400">
                      Please provide details about your commercial or technical requirements.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alexander Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#0084FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Business / Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Vance Logistics Corp"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#0084FF] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#0084FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#0084FF] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Service Needed *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#0084FF] transition-colors cursor-pointer"
                      >
                        {services.map((s) => (
                          <option key={s} value={s} className="bg-slate-900 text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Budget Range *
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#0084FF] transition-colors cursor-pointer"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-slate-900 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Expected Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#0084FF] transition-colors cursor-pointer"
                      >
                        {timelineOptions.map((t) => (
                          <option key={t} value={t} className="bg-slate-900 text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Description &amp; Objectives *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe what you want to build or achieve (e.g. We need to launch paid Google Ads and automate lead qualification through WhatsApp...)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#0084FF] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold text-white bg-[#0084FF] hover:bg-[#0072E5] transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,132,255,0.4)] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
