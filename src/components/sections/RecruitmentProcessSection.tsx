'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Search,
  ClipboardCheck,
  UserCheck,
  ShieldCheck,
  Send,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StageItem {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const EMPLOYER_STAGES: StageItem[] = [
  {
    step: '01',
    icon: Briefcase,
    title: 'Requirement & Scoping',
    description: 'We define role specifications, trade skills, volume, and targeted mobilization dates.',
  },
  {
    step: '02',
    icon: Search,
    title: 'Database & Active Sourcing',
    description: 'Activating our verified 10,000+ candidate network and industry pipelines across India.',
  },
  {
    step: '03',
    icon: ClipboardCheck,
    title: 'Trade Testing & Screening',
    description: 'Hands-on skill validation at accredited trade centers, background checks, and vetting.',
  },
  {
    step: '04',
    icon: UserCheck,
    title: 'Client Interviews',
    description: 'In-person interview camps or virtual assessment sessions with pre-screened shortlists.',
  },
  {
    step: '05',
    icon: ShieldCheck,
    title: 'Compliance & Visa Issuance',
    description: 'MEA-authorized documentation, GAMCA medical clearance, and fast-track GCC visa endorsement.',
  },
  {
    step: '06',
    icon: Send,
    title: 'Deployment & Site Onboarding',
    description: 'Flight ticketing, pre-departure briefings, airport transit, and deployment to project sites.',
  },
];

const CANDIDATE_STAGES: StageItem[] = [
  {
    step: '01',
    icon: FileText,
    title: 'Profile Registration',
    description: 'Submit your CV and trade credentials for active overseas mega-project opportunities.',
  },
  {
    step: '02',
    icon: Search,
    title: 'Skill Assessment',
    description: 'Our technical team verifies your qualifications, GCC experience, and domain competency.',
  },
  {
    step: '03',
    icon: ClipboardCheck,
    title: 'Trade Test & Preparation',
    description: 'Practical evaluation at authorized workshops with interview preparation support.',
  },
  {
    step: '04',
    icon: Users,
    title: 'Employer Interview',
    description: 'Direct selection rounds with official delegates from leading Gulf enterprises.',
  },
  {
    step: '05',
    icon: ShieldCheck,
    title: 'Medical & Visa Clearance',
    description: 'Full assistance with GAMCA medical checkups, documentation, and visa stamping.',
  },
  {
    step: '06',
    icon: Send,
    title: 'Deployment to GCC',
    description: 'Confirmed air tickets, travel briefings, and client site reception with zero placement fee.',
  },
];

export default function RecruitmentProcessSection() {
  const [activePerspective, setActivePerspective] = useState<'employer' | 'candidate'>('employer');

  const currentStages = activePerspective === 'employer' ? EMPLOYER_STAGES : CANDIDATE_STAGES;

  return (
    <section
      id="recruitment-process"
      className="py-14 sm:py-20 lg:py-24 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#FF5722] font-bold text-xs sm:text-sm tracking-wider uppercase mb-2 block">
            How We Deliver
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#061C33] tracking-tight mb-3">
            Our Recruitment <span className="text-[#FF5722]">Process</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A transparent, compliance-first methodology delivering verified talent from initial brief to site deployment.
          </p>

          {/* Perspective Toggle Switcher */}
          <div className="inline-flex p-1 bg-white border border-slate-200/90 rounded-xl shadow-xs mt-6 sm:mt-8">
            <button
              onClick={() => setActivePerspective('employer')}
              className={cn(
                'px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer',
                activePerspective === 'employer'
                  ? 'bg-[#061C33] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#061C33]'
              )}
            >
              For Employers (Hiring)
            </button>
            <button
              onClick={() => setActivePerspective('candidate')}
              className={cn(
                'px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer',
                activePerspective === 'candidate'
                  ? 'bg-[#061C33] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#061C33]'
              )}
            >
              For Job Seekers
            </button>
          </div>
        </div>

        {/* 6 Step Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePerspective}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {currentStages.map((stage) => {
              const Icon = stage.icon;

              return (
                <div
                  key={stage.step}
                  className="group bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-orange-300/80 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header: Icon & Step Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#061C33] group-hover:bg-[#FF5722] group-hover:text-white group-hover:border-[#FF5722] transition-colors duration-200 shrink-0 shadow-2xs">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-[#FF5722] transition-colors">
                        STEP {stage.step}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#061C33] group-hover:text-[#FF5722] transition-colors duration-200 mb-1.5 leading-snug">
                      {stage.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Trust Highlights & Next Action Bar */}
        <div className="mt-8 sm:mt-10 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Govt. of India MEA Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 shrink-0" />
              <span>15–21 Days Average Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5722] shrink-0" />
              <span>Zero Recruitment Fee for Candidates</span>
            </div>
          </div>

          <div>
            <Button
              asChild
              className="w-full sm:w-auto bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-sm h-11 px-6 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              {activePerspective === 'employer' ? (
                <a href="#requirement">
                  <span>Submit Staffing Requirement</span>
                  <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
                </a>
              ) : (
                <a href="#jobs">
                  <span>Explore Open Positions</span>
                  <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
                </a>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
