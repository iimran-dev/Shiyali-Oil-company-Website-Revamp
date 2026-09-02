'use client';

import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ClipboardCheck,
  Search,
  FileText,
  ShieldCheck,
  Users,
  Send,
  UserCheck,
  Briefcase,
  ArrowRight,
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
      className="relative flex flex-col items-center text-center min-w-[180px] md:min-w-0 md:flex-1 shrink-0"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
    >
      {index > 0 && (
        <div
          className="hidden md:block absolute top-7 h-[2px]"
          style={{ left: 'calc(50% + 32px)', right: 'calc(50% + 32px)' }}
        >
          <div className="h-full bg-shiyali-primary/10 rounded-full w-full" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-shiyali-secondary to-shiyali-accent rounded-full"
            initial={{ width: 0 }}
            animate={stageInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
          />
        </div>
      )}

      <motion.div
        className={cn(
          'relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-4',
          'border-2 border-shiyali-accent bg-white',
          'shadow-lg shadow-shiyali-accent/10'
        )}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 8px 30px rgba(244, 180, 0, 0.25)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <span className="text-lg font-bold text-shiyali-accent">{stage.number}</span>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-shiyali-accent/30"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={stageInView ? { scale: 1.3, opacity: 0 } : { scale: 1, opacity: 0.5 }}
          transition={{
            duration: 1.5,
            delay: 0.5 + index * 0.1,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      </motion.div>

      <h3 className="text-sm md:text-base font-semibold text-shiyali-dark mb-1.5">{stage.title}</h3>
      <p className="text-xs md:text-sm text-shiyali-dark/50 max-w-[200px] leading-relaxed">{stage.description}</p>
    </motion.div>
  );
}

function JourneyStep({ step, index, isInView, total }: { step: (typeof CANDIDATE_JOURNEY)[0]; index: number; isInView: boolean; total: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      className="relative flex flex-col items-center text-center flex-1 min-w-[160px] shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
    >
      {index < total - 1 && (
        <div
          className="hidden md:block absolute top-6 h-[2px]"
          style={{ left: 'calc(50% + 28px)', right: 'calc(50% + 28px)' }}
        >
          <div className="h-full bg-shiyali-accent/15 rounded-full w-full" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-shiyali-accent to-amber-300 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
          />
        </div>
      )}

      <motion.div
        className={cn(
          'relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-3',
          'bg-gradient-to-br from-shiyali-accent to-amber-500',
          'shadow-lg shadow-shiyali-accent/20'
        )}
        whileHover={{ scale: 1.1, y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <Icon className="w-5 h-5 text-white" />
      </motion.div>

      <div className="absolute -top-1 -right-1 md:right-auto md:-top-1 w-5 h-5 rounded-full bg-shiyali-dark text-white text-[10px] font-bold flex items-center justify-center z-20" style={{ left: 'calc(50% + 20px)' }}>
        {index + 1}
      </div>

      <h4 className="text-sm font-semibold text-shiyali-dark mb-1">{step.title}</h4>
      <p className="text-xs text-shiyali-dark/50 max-w-[180px] leading-relaxed">{step.description}</p>
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
        <TabsList className="mx-auto h-12 p-1.5 bg-white border border-shiyali-primary/10 shadow-sm rounded-xl">
          <TabsTrigger
            value="candidate"
            className={cn(
              'h-9 px-5 rounded-lg text-sm font-medium transition-all',
              'data-[state=active]:bg-shiyali-accent data-[state=active]:text-shiyali-dark',
              'data-[state=active]:shadow-md data-[state=active]:shadow-shiyali-accent/20',
              'text-shiyali-dark/50 hover:text-shiyali-dark/80'
            )}
          >
            Candidate Journey
          </TabsTrigger>
          <TabsTrigger
            value="employer"
            className={cn(
              'h-9 px-5 rounded-lg text-sm font-medium transition-all',
              'data-[state=active]:bg-shiyali-accent data-[state=active]:text-shiyali-dark',
              'data-[state=active]:shadow-md data-[state=active]:shadow-shiyali-accent/20',
              'text-shiyali-dark/50 hover:text-shiyali-dark/80'
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
    <motion.div ref={contentRef} key={steps[0].title} className="mt-8">
      <div className="bg-white rounded-2xl border border-shiyali-accent/15 p-8 md:p-10 shadow-sm">
        <div className="flex md:justify-between gap-8 md:gap-4 overflow-x-auto pb-4 md:pb-0 -mx-2 px-2 snap-x snap-mandatory">
          {steps.map((step, index) => (
            <JourneyStep key={step.title} step={step} index={index} isInView={contentInView} total={steps.length} />
          ))}
        </div>
        <motion.div
          className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-shiyali-accent/10"
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <CheckCircle2 className="w-4 h-4 text-shiyali-accent" />
          <span className="text-xs text-shiyali-dark/50">
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
    <section className="relative bg-shiyali-light-bg overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(8,43,91,0.03) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="section-padding py-20 lg:py-28 relative z-10">
        <div className="section-container">
          <motion.div
            className="text-center mb-14 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-shiyali-accent mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              How We Work
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-shiyali-dark mb-4">
              Our Recruitment{' '}
              <span className="text-gradient">Process</span>
            </h2>
            <p className="text-shiyali-dark/60 max-w-2xl mx-auto text-base lg:text-lg">
              A structured, transparent approach to delivering the right talent.
            </p>
          </motion.div>

          <motion.div
            ref={sectionRef}
            className="relative mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex md:justify-between gap-6 md:gap-0 overflow-x-auto pb-6 md:pb-0 -mx-2 px-2 snap-x snap-mandatory">
              {PROCESS_STAGES.map((stage, index) => (
                <ProcessStage key={stage.number} stage={stage} index={index} isInView={isInView} />
              ))}
            </div>

            <motion.div
              className="flex md:hidden items-center justify-center gap-2 mt-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <ArrowRight className="w-3.5 h-3.5 text-shiyali-dark/30 rotate-[-45deg]" />
              <span className="text-[11px] text-shiyali-dark/30">Scroll to see all stages</span>
              <ArrowRight className="w-3.5 h-3.5 text-shiyali-dark/30 rotate-[45deg]" />
            </motion.div>
          </motion.div>

          <div className="mt-16 lg:mt-24 max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-shiyali-dark">
                Your Journey With Shiyali
              </h3>
              <p className="text-sm text-shiyali-dark/50 mt-2">
                Tailored experiences for candidates and employers
              </p>
            </motion.div>
            <JourneyTabs />
          </div>
        </div>
      </div>
    </section>
  );
}
