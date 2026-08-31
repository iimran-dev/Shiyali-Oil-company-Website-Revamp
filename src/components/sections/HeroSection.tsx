'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const lineVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: 0.8 + i * 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const counterItems = [
  { label: 'Placements This Week', baseValue: 47, icon: '👥' },
  { label: 'New Roles Today', baseValue: 12, icon: '📋' },
  { label: 'Countries Active', baseValue: 8, icon: '🌍' },
];

export default function HeroSection() {
  const [counters, setCounters] = useState<number[]>(counterItems.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);

  const startCounters = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
  }, [hasStarted]);

  useEffect(() => {
    const timer = setTimeout(startCounters, 2000);
    return () => clearTimeout(timer);
  }, [startCounters]);

  // Animate counters to base values
  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000;
    const startTime = performance.now();
    const startVals = counters.slice();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounters(
        counterItems.map((item, i) =>
          Math.floor(startVals[i] + eased * (item.baseValue - startVals[i]))
        )
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted]);

  // Slow increment after reaching base values
  useEffect(() => {
    if (!hasStarted) return;
    const allReached = counterItems.every(
      (item, i) => counters[i] >= item.baseValue
    );
    if (!allReached) return;

    const interval = setInterval(() => {
      setCounters((prev) =>
        prev.map((val, i) => {
          if (i === 0) return val + (Math.random() > 0.7 ? 1 : 0); // Placements
          if (i === 1) return val + (Math.random() > 0.9 ? 1 : 0); // Roles
          return val; // Countries stays
        })
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [hasStarted, counters]);

  const headingLines = ['Connecting Global Employers', 'With Skilled Talent'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-shiyali-dark">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-shiyali-dark via-shiyali-primary to-shiyali-dark" />

        {/* Animated orb 1 */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-shiyali-secondary/15 blur-[120px]"
        />

        {/* Animated orb 2 */}
        <motion.div
          animate={{
            x: [0, -120, 60, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-shiyali-accent/10 blur-[100px]"
        />

        {/* Animated orb 3 */}
        <motion.div
          animate={{
            x: [0, 80, -30, 0],
            y: [0, -40, 70, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-shiyali-secondary/8 blur-[80px]"
        />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Dark overlay gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-shiyali-dark/80 via-transparent to-shiyali-dark/40" />

      {/* Content */}
      <div className="relative z-10 section-container section-padding pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Government Approved Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-shiyali-accent" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-shiyali-accent" />
            </span>
            <Shield className="h-4 w-4 text-shiyali-accent" />
            <span className="text-sm font-medium text-white/90">
              Government Approved Overseas Recruiter
            </span>
          </motion.div>

          {/* Headline - line by line reveal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            {headingLines.map((line, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={cn(
                  'block',
                  i === 0 ? 'text-white' : 'text-gradient'
                )}
                style={
                  i === 1
                    ? {
                        background: 'linear-gradient(135deg, #F4B400 0%, #FFD666 50%, #F4B400 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }
                    : undefined
                }
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            India&rsquo;s trusted recruitment partner for the GCC &mdash; delivering skilled
            professionals across Oil &amp; Gas, EPC, Infrastructure and more for over
            20 years.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className={cn(
                'bg-shiyali-accent text-shiyali-primary font-semibold text-base px-8 py-6 rounded-xl',
                'shadow-xl shadow-shiyali-accent/30 hover:shadow-shiyali-accent/50',
                'hover:scale-105 transition-all duration-300 h-auto'
              )}
            >
              <Search className="mr-2 h-5 w-5" />
              Hire Talent
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={cn(
                'border-white/30 text-white font-semibold text-base px-8 py-6 rounded-xl',
                'hover:bg-white/10 hover:border-white/50 hover:text-white',
                'transition-all duration-300 h-auto'
              )}
            >
              Explore Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* WOW01 Recruitment Impact Counter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {counterItems.map((item, i) => (
              <div
                key={i}
                className="glass rounded-2xl px-6 py-5 text-center group hover:bg-white/12 transition-colors duration-300"
              >
                <div className="text-2xl font-bold text-white mb-1">
                  <span>{counters[i]}</span>
                </div>
                <div className="text-xs text-white/50 font-medium uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
