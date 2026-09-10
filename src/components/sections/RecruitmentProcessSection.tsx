'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  Search,
  ClipboardCheck,
  UserCheck,
  ShieldCheck,
  Send,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StageItem {
  step: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

const FLOW_STAGES: StageItem[] = [
  {
    step: '01',
    icon: Briefcase,
    title: 'Requirement',
    desc: 'Scoping role specs, volume & deployment targets',
  },
  {
    step: '02',
    icon: Search,
    title: 'Sourcing',
    desc: 'Active outreach across 10,000+ verified talent pool',
  },
  {
    step: '03',
    icon: ClipboardCheck,
    title: 'Trade Testing',
    desc: 'Hands-on vetting at accredited technical workshops',
  },
  {
    step: '04',
    icon: UserCheck,
    title: 'Client Interview',
    desc: 'Direct in-person interview camps or virtual rounds',
  },
  {
    step: '05',
    icon: ShieldCheck,
    title: 'Visa & Medical',
    desc: 'MEA clearance, GAMCA medicals & visa stamping',
  },
  {
    step: '06',
    icon: Send,
    title: 'Deployment',
    desc: 'Air ticketing, travel briefing & site onboarding',
  },
];

export default function RecruitmentProcessSection() {
  return (
    <section
      id="recruitment-process"
      className="py-14 sm:py-20 lg:py-24 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#FF5722] font-bold text-xs sm:text-sm tracking-wider uppercase mb-2 block">
            How We Deliver
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#061C33] tracking-tight mb-3">
            Our Recruitment <span className="text-[#FF5722]">Process</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A structured, 6-stage compliance-first workflow ensuring zero delays and verified candidate delivery.
          </p>
        </div>

        {/* Desktop Linear Flow Pipeline (lg and up) */}
        <div className="hidden lg:grid grid-cols-6 gap-4 relative">
          {FLOW_STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const isLast = index === FLOW_STAGES.length - 1;

            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connecting Line to Next Step with Arrow */}
                {!isLast && (
                  <div className="absolute top-9 left-[calc(50%+28px)] right-[calc(-50%+28px)] flex items-center z-0 pointer-events-none">
                    <div className="w-full h-[2px] bg-slate-200 group-hover:bg-orange-200 transition-colors duration-200" />
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#FF5722] -ml-1.5 shrink-0 transition-colors duration-200" />
                  </div>
                )}

                {/* Step Indicator */}
                <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-[#FF5722] transition-colors duration-200 mb-2.5">
                  {stage.step}
                </span>

                {/* Node Icon Box */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 group-hover:border-[#FF5722] shadow-2xs group-hover:shadow-md group-hover:shadow-orange-500/15 flex items-center justify-center text-[#061C33] group-hover:text-[#FF5722] group-hover:-translate-y-1 transition-all duration-200">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-[#061C33] group-hover:text-[#FF5722] transition-colors duration-200 mt-3.5 mb-1 leading-snug">
                  {stage.title}
                </h3>

                {/* Concise Description */}
                <p className="text-xs text-slate-500 leading-relaxed max-w-[160px]">
                  {stage.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / Tablet Vertical Connected Flow (< lg) */}
        <div className="lg:hidden relative pl-6 sm:pl-8 max-w-md mx-auto">
          {/* Continuous Vertical Timeline Line */}
          <div className="absolute left-[23px] sm:left-[31px] top-6 bottom-6 w-[2px] bg-slate-200" />

          <div className="space-y-6 sm:space-y-8">
            {FLOW_STAGES.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="relative flex items-start gap-4 sm:gap-5 group"
                >
                  {/* Node Icon */}
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-white border-2 border-slate-200 group-hover:border-[#FF5722] shadow-2xs flex items-center justify-center text-[#061C33] group-hover:text-[#FF5722] shrink-0 transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  {/* Content Block */}
                  <div className="pt-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-orange-50 text-[#FF5722]">
                        {stage.step}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#061C33] leading-tight">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Minimal Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            asChild
            className="w-full sm:w-auto bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-sm h-11 px-7 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <a href="#requirement">
              <span>Start Your Recruitment</span>
              <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
