'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Shield,
  Globe,
  Users,
  Zap,
  CheckCircle2,
  Award,
  HardHat,
  HeartPulse,
  UserPlus,
  TrendingUp,
} from 'lucide-react';
import { WHY_SHIYALI_FEATURES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCounter } from '@/hooks/use-counter';

const featureIcons = [
  Shield,
  Globe,
  Users,
  Zap,
  CheckCircle2,
  Award,
];

const talentDashboard = [
  { label: 'Engineers', value: 3200, max: 5000, color: 'bg-shiyali-secondary', icon: HardHat },
  { label: 'Technicians', value: 5800, max: 8000, color: 'bg-shiyali-primary', icon: UserPlus },
  { label: 'Healthcare', value: 2400, max: 4000, color: 'bg-shiyali-accent', icon: HeartPulse },
  { label: 'Executives', value: 800, max: 1500, color: 'bg-emerald-500', icon: TrendingUp },
];

function TalentStat({ item, index }: { item: (typeof talentDashboard)[number]; index: number }) {
  const Icon = item.icon;
  const [counterRef, count] = useCounter(item.value, 2500);
  const progress = useMemo(() => {
    if (count > 0) return Math.min((count / item.max) * 100, 100);
    return 0;
  }, [count, item.max]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="glass-light rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:shadow-shiyali-primary/5 transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl',
          index === 2 ? 'bg-shiyali-accent/15 text-shiyali-accent' : 'bg-shiyali-secondary/10 text-shiyali-secondary'
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <span ref={counterRef} className="text-2xl sm:text-3xl font-bold text-shiyali-primary">
            {count.toLocaleString()}
          </span>
          <span className="text-shiyali-accent font-bold">+</span>
        </div>
      </div>
      <div className="mb-2 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-1000 ease-out', item.color)}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {item.label}
      </p>
    </motion.div>
  );
}

function FeatureCard({ feature, index }: { feature: (typeof WHY_SHIYALI_FEATURES)[number]; index: number }) {
  const Icon = featureIcons[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group rounded-2xl bg-white p-5 sm:p-6 shadow-md shadow-shiyali-primary/5 hover:shadow-xl hover:shadow-shiyali-primary/10 transition-all duration-300 border border-gray-100/80"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-shiyali-secondary/10 text-shiyali-secondary mb-4 group-hover:bg-shiyali-secondary group-hover:text-white transition-all duration-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-shiyali-primary mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

function PremiumVisual() {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[520px]">
      {/* Base gradient composition */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-shiyali-dark via-shiyali-primary to-shiyali-secondary" />

        {/* Animated accent shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-shiyali-accent/20"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-white/10"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-shiyali-accent/10 blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-shiyali-secondary/15 blur-3xl"
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Diagonal accent lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
            className="absolute top-0 left-0 w-[200%] h-px bg-gradient-to-r from-transparent via-shiyali-accent/30 to-transparent"
            style={{ transform: 'rotate(-30deg)', transformOrigin: 'left top' }}
          />
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear', repeatDelay: 5, delay: 2 }}
            className="absolute top-0 left-0 w-[200%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ transform: 'rotate(-30deg)', transformOrigin: 'left top', top: '40%' }}
          />
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <div className="relative">
              <div className="h-24 w-24 rounded-2xl bg-shiyali-accent/20 backdrop-blur-sm border border-shiyali-accent/30 flex items-center justify-center">
                <Award className="h-12 w-12 text-shiyali-accent" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 rounded-2xl border-2 border-shiyali-accent/30"
              />
            </div>
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-3"
          >
            Trusted Since 2003
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-white/60 max-w-[260px] leading-relaxed"
          >
            Two decades of excellence in connecting talent with opportunity across the GCC
          </motion.p>

          {/* Mini stats inside visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-6 mt-8"
          >
            {[
              { val: '20+', label: 'Years' },
              { val: '6', label: 'Countries' },
              { val: '10K+', label: 'Placed' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-bold text-shiyali-accent">{s.val}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function WhyShiyaliSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-shiyali-light-bg">
      <div className="section-container section-padding">
        {/* Main Content: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16 sm:mb-20">
          {/* Left Side - 60% */}
          <div className="lg:col-span-3">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-sm font-semibold text-shiyali-secondary uppercase tracking-widest mb-4"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shiyali-primary mb-4"
            >
              Why Shiyali
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed mb-10 max-w-xl"
            >
              The recruitment partner trusted by global enterprises.
            </motion.p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {WHY_SHIYALI_FEATURES.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>
          </div>

          {/* Right Side - 40% - Premium Visual */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="sticky top-28"
            >
              <PremiumVisual />
            </motion.div>
          </div>
        </div>

        {/* WOW02 Talent Availability Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold text-shiyali-secondary uppercase tracking-widest mb-3">
              Talent Pool
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-shiyali-primary">
              Talent Availability Dashboard
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {talentDashboard.map((item, index) => (
              <TalentStat key={item.label} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
