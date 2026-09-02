'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Fuel,
  HardHat,
  Building2,
  Construction as Crane,
  Factory,
  HeartPulse,
  ArrowRight,
} from 'lucide-react';
import { INDUSTRIES_DATA } from '@/lib/constants';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  fuel: Fuel,
  'hard-hat': HardHat,
  'building-2': Building2,
  crane: Crane,
  factory: Factory,
  'heart-pulse': HeartPulse,
};

const industryGradients: Record<string, string> = {
  'oil-gas': 'from-amber-900/90 via-amber-800/70 to-transparent',
  'epc-projects': 'from-shiyali-primary/90 via-shiyali-secondary/70 to-transparent',
  'infrastructure': 'from-slate-900/90 via-slate-700/70 to-transparent',
  'construction': 'from-orange-900/90 via-orange-700/70 to-transparent',
  'manufacturing': 'from-emerald-900/90 via-emerald-700/70 to-transparent',
  'healthcare': 'from-rose-900/90 via-rose-700/70 to-transparent',
};

const industryBgGradients: Record<string, string> = {
  'oil-gas': 'from-amber-800 via-amber-700 to-yellow-600',
  'epc-projects': 'from-shiyali-dark via-shiyali-primary to-shiyali-secondary',
  'infrastructure': 'from-slate-800 via-slate-600 to-gray-500',
  'construction': 'from-orange-800 via-orange-600 to-amber-500',
  'manufacturing': 'from-emerald-800 via-emerald-600 to-green-500',
  'healthcare': 'from-rose-800 via-rose-600 to-pink-500',
};

function IndustryCard({
  industry,
  index,
}: {
  industry: (typeof INDUSTRIES_DATA)[number];
  index: number;
}) {
  const Icon = iconMap[industry.icon] || Building2;

  return (
    <motion.a
      href={`#${industry.slug}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl h-72 sm:h-80 cursor-pointer',
        'shadow-lg hover:shadow-2xl hover:shadow-shiyali-primary/15',
        'transition-shadow duration-500'
      )}
    >
      {/* Gradient background (replaces image) */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110',
          industryBgGradients[industry.slug]
        )}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Bottom gradient overlay for text readability */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t',
          industryGradients[industry.slug]
        )}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-7">
        <div className="mt-auto">
          {/* Icon */}
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 mb-4 transition-all duration-500 group-hover:bg-shiyali-accent group-hover:border-shiyali-accent"
          >
            <Icon className="h-7 w-7 text-white transition-colors duration-500 group-hover:text-shiyali-primary" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {industry.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/75 leading-relaxed line-clamp-3 mb-4">
            {industry.description}
          </p>

          {/* Explore link */}
          <div className="flex items-center gap-1.5 text-sm font-semibold text-shiyali-accent opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Explore Roles
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-white">
      <div className="section-container section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-sm font-semibold text-shiyali-secondary uppercase tracking-widest mb-4"
          >
            Expertise
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shiyali-primary mb-4">
            Industries We Serve
          </h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
            Specialized recruitment expertise across critical sectors.
          </p>
        </motion.div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_DATA.map((industry, index) => (
            <IndustryCard key={industry.slug} industry={industry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
