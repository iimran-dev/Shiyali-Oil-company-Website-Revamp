'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Briefcase, Clock, FileText, Target, Globe, Award } from 'lucide-react';
import { EMPLOYER_SOLUTIONS, MILESTONES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ElementType> = {
  users: Users,
  briefcase: Briefcase,
  clock: Clock,
  'file-text': FileText,
  target: Target,
  globe: Globe,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function EmployerSolutionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useInView(sectionRef, { once: true, amount: 0.1 });
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineVisible = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative bg-shiyali-dark section-padding py-20 lg:py-28 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Top accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-shiyali-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-shiyali-accent/10 text-shiyali-accent text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Enterprise Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Employer Solutions
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Comprehensive recruitment services tailored to enterprise needs.
          </p>
        </motion.div>

        {/* Solution Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isSectionVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {EMPLOYER_SOLUTIONS.map((solution, index) => {
            const IconComponent = ICON_MAP[solution.icon] || Briefcase;
            return (
              <motion.div
                key={solution.title}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(14, 122, 196, 0.4)',
                  boxShadow: '0 8px 30px rgba(14, 122, 196, 0.15)',
                }}
                transition={{ duration: 0.3 }}
                className="group glass-dark rounded-2xl p-6 lg:p-8 cursor-default transition-colors duration-300 hover:border-shiyali-secondary/30"
              >
                <div className="w-12 h-12 rounded-xl bg-shiyali-secondary/20 flex items-center justify-center mb-5 group-hover:bg-shiyali-accent/20 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-shiyali-secondary group-hover:text-shiyali-accent transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {solution.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* WOW04 Success Milestones Timeline */}
        <div ref={timelineRef} className="mt-20 lg:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTimelineVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Our Journey
            </h3>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              Two decades of excellence in connecting global talent with GCC opportunities.
            </p>
          </motion.div>

          {/* Desktop Horizontal Timeline */}
          <div className="hidden md:block relative">
            {/* Horizontal connecting line */}
            <div className="absolute top-6 left-0 right-0 h-[2px] bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isTimelineVisible ? { scaleX: 1 } : {}}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.4 }}
                className="h-full bg-gradient-to-r from-shiyali-secondary to-shiyali-accent origin-left"
              />
            </div>

            <div className="relative flex justify-between">
              {MILESTONES.map((milestone, index) => (
                <MilestoneDot
                  key={milestone.year}
                  milestone={milestone}
                  index={index}
                  isVisible={isTimelineVisible}
                />
              ))}
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="md:hidden relative pl-8">
            {/* Vertical connecting line */}
            <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-white/10">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isTimelineVisible ? { scaleY: 1 } : {}}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.4 }}
                className="h-full bg-gradient-to-b from-shiyali-secondary to-shiyali-accent origin-top"
              />
            </div>

            <div className="flex flex-col gap-8">
              {MILESTONES.map((milestone, index) => (
                <MilestoneDotMobile
                  key={milestone.year}
                  milestone={milestone}
                  index={index}
                  isVisible={isTimelineVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneDot({
  milestone,
  index,
  isVisible,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
  isVisible: boolean;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const isDotVisible = useInView(dotRef, { once: true, amount: 0.5 });

  return (
    <div
      ref={dotRef}
      className="relative flex flex-col items-center w-[140px] lg:w-[160px]"
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isDotVisible ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        className={cn(
          'relative z-10 w-4 h-4 rounded-full border-2 transition-colors duration-500',
          isDotVisible
            ? 'bg-shiyali-accent border-shiyali-accent shadow-[0_0_12px_rgba(244,180,0,0.5)]'
            : 'bg-shiyali-dark border-white/30'
        )}
      >
        {isDotVisible && (
          <motion.div
            className="absolute inset-0 rounded-full bg-shiyali-accent/40"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isDotVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-5 text-center"
      >
        <span className="text-shiyali-accent font-bold text-lg">
          {milestone.year}
        </span>
        <h4 className="text-white font-semibold text-sm mt-1 leading-tight">
          {milestone.title}
        </h4>
        <p className="text-white/40 text-xs mt-2 leading-relaxed">
          {milestone.description}
        </p>
      </motion.div>
    </div>
  );
}

function MilestoneDotMobile({
  milestone,
  index,
  isVisible,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
  isVisible: boolean;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const isDotVisible = useInView(dotRef, { once: true, amount: 0.5 });

  return (
    <div ref={dotRef} className="relative">
      {/* Dot on the line */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isDotVisible ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'absolute -left-5 top-1 w-4 h-4 rounded-full border-2 transition-colors duration-500',
          isDotVisible
            ? 'bg-shiyali-accent border-shiyali-accent shadow-[0_0_12px_rgba(244,180,0,0.5)]'
            : 'bg-shiyali-dark border-white/30'
        )}
      >
        {isDotVisible && (
          <motion.div
            className="absolute inset-0 rounded-full bg-shiyali-accent/40"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={isDotVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <span className="text-shiyali-accent font-bold text-base">
          {milestone.year}
        </span>
        <h4 className="text-white font-semibold text-sm mt-0.5">
          {milestone.title}
        </h4>
        <p className="text-white/40 text-xs mt-1.5 leading-relaxed">
          {milestone.description}
        </p>
      </motion.div>
    </div>
  );
}
