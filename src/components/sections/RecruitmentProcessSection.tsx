'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ClipboardCheck,
  Search,
  FileText,
  ShieldCheck,
  Users,
  Send,
  UserCheck,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { PROCESS_STAGES } from '@/lib/constants';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const CANDIDATE_JOURNEY = [
  { icon: FileText, title: 'Apply / Register', description: 'Submit your CV and credentials through our portal or direct application.' },
  { icon: ClipboardCheck, title: 'Assessment & Screening', description: 'Our team evaluates your qualifications, experience, and cultural fit.' },
  { icon: Users, title: 'Interview & Selection', description: 'Client interviews and final selection with full support from our team.' },
  { icon: Send, title: 'Mobilization & Onboarding', description: 'Visa processing, travel arrangements, and smooth onboarding in your new role.' },
];

const EMPLOYER_JOURNEY = [
  { icon: Briefcase, title: 'Submit Requirement', description: 'Share your staffing needs, role specifications, and project timelines with us.' },
  { icon: Search, title: 'Candidate Shortlisting', description: 'We source, screen, and present qualified candidates matching your criteria.' },
  { icon: UserCheck, title: 'Interview & Evaluation', description: 'Coordinate interviews, technical assessments, and reference verification.' },
  { icon: ShieldCheck, title: 'Hiring & Mobilization', description: 'Offer management, visa processing, and mobilization of selected candidates.' },
];

function ProcessStage({ stage, index, isInView }: { stage: (typeof PROCESS_STAGES)[0]; index: number; isInView: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={stageRef}
      className="relative flex flex-col items-center text-center group pt-2"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
    >
      {/* Connecting Line (Desktop Only) */}
      {index > 0 && (
        <div
          className="hidden md:block absolute top-9 h-[2px]"
          style={{ left: '-50%', right: '50%' }}
        >
          <div className="h-full bg-slate-200 rounded-full w-full" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#FF5722] rounded-full"
            initial={{ width: 0 }}
            animate={stageInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* Circle Badge with Vibrant Hover Inversion */}
      <motion.div
        className={cn(
          'relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300',
          'border-2 border-[#FF5722] bg-white shadow-md shadow-orange-500/10',
          'group-hover:bg-[#FF5722] group-hover:border-[#FF5722] group-hover:shadow-lg group-hover:shadow-orange-500/30'
        )}
        whileHover={{ scale: 1.08, y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-base sm:text-lg font-extrabold text-[#FF5722] group-hover:text-white transition-colors duration-300">
          {stage.number}
        </span>
      </motion.div>

      {/* Title */}
      <h3 className="text-xs sm:text-base font-bold text-[#061C33] mb-1 group-hover:text-[#FF5722] transition-colors duration-200 leading-snug">
        {stage.title}
      </h3>

      {/* High Contrast Visible Description */}
      <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 font-medium leading-relaxed max-w-[170px] sm:max-w-[210px]">
        {stage.description}
      </p>
    </motion.div>
  );
}

function JourneyStep({ step, index, isInView, total }: { step: (typeof CANDIDATE_JOURNEY)[0]; index: number; isInView: boolean; total: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      className="relative flex flex-col items-center text-center group pt-2"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      {/* Connecting line (Desktop Only) */}
      {index < total - 1 && (
        <div
          className="hidden md:block absolute top-8 h-[2px]"
          style={{ left: 'calc(50% + 28px)', right: 'calc(50% + 28px)' }}
        >
          <div className="h-full bg-slate-200 rounded-full w-full" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#FF5722] rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
          />
        </div>
      )}

      {/* Circle Icon Container & Anchored Step Badge */}
      <div className="relative mb-3">
        <motion.div
          className={cn(
            'relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center',
            'bg-[#FF5722] text-white shadow-md shadow-orange-500/20'
          )}
          whileHover={{ scale: 1.08, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.div>

        {/* Step Number Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#061C33] text-white text-[10px] font-bold flex items-center justify-center z-20 shadow-sm border border-white">
          {index + 1}
        </div>
      </div>

      <h4 className="text-xs sm:text-sm font-bold text-[#061C33] mb-1">{step.title}</h4>
      <p className="text-[11px] sm:text-xs text-slate-600 font-medium max-w-[160px] sm:max-w-[180px] leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

function JourneyTabs() {
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsInView = useInView(tabsRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={tabsRef}
      initial={{ opacity: 0, y: 30 }}
      animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <Tabs defaultValue="candidate" className="w-full">
        <TabsList className="mx-auto h-11 p-1 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-center max-w-sm">
          <TabsTrigger
            value="candidate"
            className={cn(
              'h-9 px-4 sm:px-5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex-1',
              'data-[state=active]:bg-[#FF5722] data-[state=active]:text-white',
              'data-[state=active]:shadow-md data-[state=active]:shadow-orange-500/20',
              'text-slate-600 hover:text-[#061C33]'
            )}
          >
            Candidate Journey
          </TabsTrigger>
          <TabsTrigger
            value="employer"
            className={cn(
              'h-9 px-4 sm:px-5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex-1',
              'data-[state=active]:bg-[#FF5722] data-[state=active]:text-white',
              'data-[state=active]:shadow-md data-[state=active]:shadow-orange-500/20',
              'text-slate-600 hover:text-[#061C33]'
            )}
          >
            Employer Journey
          </TabsTrigger>
        </TabsList>

        <TabsContent value="candidate">
          <JourneyTabContent steps={CANDIDATE_JOURNEY} />
        </TabsContent>
        <TabsContent value="employer">
          <JourneyTabContent steps={EMPLOYER_JOURNEY} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function JourneyTabContent({ steps }: { steps: typeof CANDIDATE_JOURNEY }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: false, margin: '-30px' });

  return (
    <motion.div ref={contentRef} key={steps[0].title} className="mt-6 sm:mt-8">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-8 md:p-10 shadow-sm">
        {/* Responsive Grid - Entire Section Visible on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-1 pb-2">
          {steps.map((step, index) => (
            <JourneyStep key={step.title} step={step} index={index} isInView={contentInView} total={steps.length} />
          ))}
        </div>
        <motion.div
          className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-slate-100 text-center"
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
          <span className="text-xs font-semibold text-slate-700">
            Every step is managed by our dedicated team for a seamless experience
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function RecruitmentProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="recruitment-process" className="relative bg-[#F8FAFC] py-12 sm:py-20 lg:py-28 overflow-hidden">
      {/* Subtle Dot Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #061C33 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-14 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#FF5722] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">
            How We Work
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#061C33] mb-3 sm:mb-4 tracking-tight">
            Our Recruitment <span className="text-[#FF5722]">Process</span>
          </h2>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto text-sm sm:text-lg">
            A structured, transparent approach to delivering the right talent.
          </p>
        </motion.div>

        {/* Process Stages Responsive Grid - 100% Entirely Visible on Mobile */}
        <motion.div
          ref={sectionRef}
          className="relative mb-10 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 sm:gap-4 pt-1">
            {PROCESS_STAGES.map((stage, index) => (
              <ProcessStage key={stage.number} stage={stage} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Journey Tabs */}
        <div className="mt-10 sm:mt-16 lg:mt-24 max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg sm:text-2xl font-extrabold text-[#061C33]">
              Your Journey With Shiyali
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1 sm:mt-2">
              Tailored experiences for candidates and employers
            </p>
          </motion.div>
          <JourneyTabs />
        </div>
      </div>
    </section>
  );
}
