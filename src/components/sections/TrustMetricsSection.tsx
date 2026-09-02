'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Globe, Zap, Building2 } from 'lucide-react';
import { useCounter } from '@/hooks/use-counter';
import { TRUST_METRICS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const metricIcons = [Award, Users, Zap, Globe, Building2];

const floatKeyframes = [
  { y: [0, -6, 0], transition: { duration: 4, repeat: Infinity, delay: 0, ease: 'easeInOut' } },
  { y: [0, -8, 0], transition: { duration: 4.5, repeat: Infinity, delay: 0.3, ease: 'easeInOut' } },
  { y: [0, -5, 0], transition: { duration: 3.8, repeat: Infinity, delay: 0.6, ease: 'easeInOut' } },
  { y: [0, -7, 0], transition: { duration: 4.2, repeat: Infinity, delay: 0.9, ease: 'easeInOut' } },
  { y: [0, -6, 0], transition: { duration: 4, repeat: Infinity, delay: 1.2, ease: 'easeInOut' } },
];

function MetricCard({ metric, index }: { metric: typeof TRUST_METRICS[number]; index: number }) {
  const [counterRef, count] = useCounter(metric.value, 2200);
  const Icon = metricIcons[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.03 }}
      animate={floatKeyframes[index]}
      className={cn(
        'glass-light rounded-2xl p-6 sm:p-8 text-center cursor-default',
        'shadow-lg shadow-shiyali-primary/5 hover:shadow-xl hover:shadow-shiyali-primary/10',
        'transition-shadow duration-300'
      )}
    >
      <div className="flex justify-center mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-shiyali-secondary/10 text-shiyali-secondary">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-shiyali-primary mb-2">
        <span ref={counterRef}>{count.toLocaleString()}</span>
        <span className="text-shiyali-accent">{metric.suffix}</span>
      </div>
      <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {metric.label}
      </div>
    </motion.div>
  );
}

export default function TrustMetricsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section className="relative py-16 sm:py-20 bg-white">
      <div ref={containerRef} className="section-container section-padding">
        {/* Row 1: 3 cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto mb-5"
        >
          {TRUST_METRICS.slice(0, 3).map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </motion.div>

        {/* Row 2: 2 cards centered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[27rem] mx-auto"
        >
          {TRUST_METRICS.slice(3).map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index + 3} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
