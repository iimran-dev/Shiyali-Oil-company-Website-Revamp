'use client';

import { motion } from 'framer-motion';
import { Award, Users, UserCheck, Globe, Building2, ThumbsUp, type LucideIcon } from 'lucide-react';
import { useCounter } from '@/hooks/use-counter';
import { TRUST_METRICS } from '@/lib/constants';

const metricIcons: LucideIcon[] = [Award, Users, UserCheck, Globe, Building2, ThumbsUp];

interface MetricItemProps {
  metric: typeof TRUST_METRICS[number];
  index: number;
  isLast: boolean;
}

function MetricItem({ metric, index, isLast }: MetricItemProps) {
  const [counterRef, count] = useCounter(metric.value, 2000);
  const Icon = metricIcons[index] || Award;

  return (
    <div
      className={`flex items-start gap-3 sm:gap-4 p-2 sm:p-3 ${
        !isLast ? 'lg:border-r lg:border-slate-100' : ''
      }`}
    >
      {/* Soft Blue Line Icon Container */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0E2A47] shrink-0">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0E2A47]" strokeWidth={1.8} />
      </div>

      {/* Number & Label */}
      <div className="flex flex-col">
        <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#061C33] tracking-tight leading-none mb-1">
          <span ref={counterRef}>{count.toLocaleString()}</span>
          <span>{metric.suffix}</span>
        </div>
        <div className="text-xs sm:text-sm font-medium text-slate-500 max-w-[130px] leading-tight">
          {metric.label}
        </div>
      </div>
    </div>
  );
}

export default function TrustMetricsSection() {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 md:-mt-20 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 p-5 sm:p-7 md:p-8"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4 items-center">
          {TRUST_METRICS.map((metric, index) => (
            <MetricItem
              key={metric.label}
              metric={metric}
              index={index}
              isLast={index === TRUST_METRICS.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
