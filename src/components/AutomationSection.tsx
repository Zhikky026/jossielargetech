import React, { useState } from 'react';
import { 
  Bot, 
  Workflow, 
  Zap, 
  Play, 
  Database, 
  MessageSquare, 
  Bell, 
  CheckCircle, 
  PhoneCall, 
  RefreshCw, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';

interface AutomationSectionProps {
  onStartProject: () => void;
}

export const AutomationSection: React.FC<AutomationSectionProps> = ({ onStartProject }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const workflowSteps = [
    {
      id: 'trigger',
      title: '01. Inbound Trigger',
      desc: 'Form submission, webhook, or incoming phone call initiates the automated event loop.',
      icon: Zap,
      status: 'Event Ingested',
    },
    {
      id: 'ai',
      title: '02. AI Intelligence',
      desc: 'Retell/Vapi or LLM parses intent, scores qualification, and extracts essential lead data.',
      icon: Bot,
      status: 'Intent Classified',
    },
    {
      id: 'orchestration',
      title: '03. Orchestration',
      desc: 'n8n or Make executes business logic, routing conditional paths and deduplicating data.',
      icon: Workflow,
      status: 'Pipeline Executed',
    },
    {
      id: 'crm',
      title: '04. CRM & Database',
      desc: 'Record logged into GoHighLevel or Odoo ERP with enriched context and contact stage.',
      icon: Database,
      status: 'Record Synced',
    },
    {
      id: 'notification',
      title: '05. Notification',
      desc: 'Immediate Slack/WhatsApp/Email dispatch sent to designated account executives.',
      icon: Bell,
      status: 'Rep Alerted',
    },
    {
      id: 'result',
      title: '06. Commercial Result',
      desc: 'Meeting booked or instant voice callback executed within 45 seconds of interest.',
      icon: CheckCircle,
      status: 'Zero Human Delay',
    },
  ];

  const tools = [
    { name: 'n8n', tag: 'Self-Hosted Orchestration' },
    { name: 'Make.com', tag: 'Cloud Scenarios' },
    { name: 'Zapier', tag: 'Micro-Integrations' },
    { name: 'Odoo ERP', tag: 'Enterprise Operations' },
    { name: 'GoHighLevel', tag: 'Sales CRM & Funnels' },
    { name: 'Retell AI', tag: 'Autonomous Voice' },
    { name: 'Vapi AI', tag: 'Real-Time Conversational' },
  ];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < workflowSteps.length) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 700);
  };

  return (
    <section id="automation" className="relative py-28 bg-[#060A16] border-y border-white/5 overflow-hidden">
      {/* Background glow node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0084FF]/8 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0084FF] mb-3">
            Division 05 · Intelligent Workflow &amp; AI
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Automate the Work. <br />
            <span className="text-[#38BDF8]">Scale the Business.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Connect your tools, automate repetitive workflows, and build intelligent systems that reduce manual work and help your team move faster.
          </p>
        </div>

        {/* Live Interactive Workflow Engine Visualization */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6 md:p-10 mb-14 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-white/8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2.5 h-2.5 rounded-full ${isSimulating ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                <span className="text-xs font-mono text-white font-semibold">
                  LIVE WORKFLOW TOPOLOGY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Trigger → AI / Logic → Automation → CRM → Notification → Result
              </p>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isSimulating
                  ? 'bg-slate-800 text-slate-400 border border-white/10 cursor-not-allowed'
                  : 'bg-[#0084FF] hover:bg-[#0072E5] text-white shadow-[0_0_20px_rgba(0,132,255,0.4)]'
              }`}
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Simulating Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Simulate Real-Time Trigger</span>
                </>
              )}
            </button>
          </div>

          {/* Workflow Steps Node Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 py-8">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === idx;
              const isPassed = activeStep > idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-slate-900 border-[#0084FF] shadow-[0_0_24px_rgba(0,132,255,0.3)] -translate-y-1'
                      : isPassed
                      ? 'bg-slate-900/70 border-emerald-500/40'
                      : 'bg-slate-900/30 border-white/6 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isCurrent
                          ? 'bg-[#0084FF] text-white'
                          : isPassed
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      Step 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white font-display mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-3 mb-3">
                    {step.desc}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className={isCurrent ? 'text-[#38BDF8]' : isPassed ? 'text-emerald-400' : 'text-slate-500'}>
                      {step.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Diagnostic Inspector */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-400 text-[11px]">INSPECTOR:</span>
              <span className="font-semibold text-white">
                {workflowSteps[activeStep].title}
              </span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <span className="text-slate-300 text-[11px] hidden sm:inline">
                {workflowSteps[activeStep].desc}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>LATENCY: 0.18s</span>
            </div>
          </div>
        </div>

        {/* Technology Ecosystem & Automation Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#0084FF]">
              Supported Integration Ecosystem
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Enterprise Tools You Already Rely On.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We do not build fragile, siloed scripts. We engineer resilient orchestration pipelines using industry-leading automation hubs and state-of-the-art voice &amp; language APIs.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {tools.map((t) => (
                <div
                  key={t.name}
                  className="px-3 py-2 rounded-xl bg-slate-900/60 border border-white/8 hover:border-[#0084FF]/40 transition-colors"
                >
                  <span className="text-xs font-semibold text-white mr-1.5">{t.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({t.tag})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/40 border border-white/6 space-y-2">
              <h4 className="text-sm font-semibold text-white font-display">Voice AI Reception &amp; Sales</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deploy human-sounding Retell/Vapi agents that answer inbound calls, qualify leads, and schedule calendar slots 24/7.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/40 border border-white/6 space-y-2">
              <h4 className="text-sm font-semibold text-white font-display">CRM &amp; Sales Pipeline Sync</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bi-directional sync between advertising forms, GoHighLevel, HubSpot, or Odoo with automated deal stage transitions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/40 border border-white/6 space-y-2">
              <h4 className="text-sm font-semibold text-white font-display">Autonomous AI Agents</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Custom reasoning agents that draft emails, research prospect companies, and generate executive summaries automatically.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/40 border border-white/6 space-y-2">
              <h4 className="text-sm font-semibold text-white font-display">Operational Error-Handling</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated retries, dead-letter queues, and instant Slack notifications ensure zero missed leads or lost revenue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
