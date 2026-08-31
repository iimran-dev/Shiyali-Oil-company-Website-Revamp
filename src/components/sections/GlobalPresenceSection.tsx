'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, Globe } from 'lucide-react';
import { GCC_COUNTRIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const TALENT_REGIONS = [
  { name: 'South Asia', percentage: 45, color: 'from-shiyali-secondary to-blue-400' },
  { name: 'Southeast Asia', percentage: 25, color: 'from-shiyali-primary to-shiyali-secondary' },
  { name: 'Middle East', percentage: 30, color: 'from-shiyali-accent to-amber-300' },
];

function CountryTooltip({
  country,
  visible,
}: {
  country: (typeof GCC_COUNTRIES)[0];
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn(
            'absolute z-50 w-52 glass-dark rounded-xl p-4 text-white pointer-events-none',
            'shadow-2xl shadow-shiyali-dark/30'
          )}
          style={{
            left: country.x > 55 ? 'auto' : '0%',
            right: country.x > 55 ? '0%' : 'auto',
            top: '100%',
            marginTop: '12px',
          }}
        >
          <div className="absolute -top-2 left-6 w-4 h-4 glass-dark rotate-45 rounded-sm" />
          <p className="font-semibold text-sm text-shiyali-accent mb-2">{country.name}</p>
          <div className="flex items-center gap-2 mb-1.5">
            <Users className="w-3.5 h-3.5 text-shiyali-accent shrink-0" />
            <span className="text-xs text-white/80">Placements:</span>
            <span className="text-xs font-semibold text-white ml-auto">
              {country.placements.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-shiyali-accent shrink-0" />
            <span className="text-xs text-white/80">Active Roles:</span>
            <span className="text-xs font-semibold text-white ml-auto">
              {country.activeRoles}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CountryMarker({
  country,
  index,
  isInView,
}: {
  country: (typeof GCC_COUNTRIES)[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="absolute z-30"
      style={{ left: `${country.x}%`, top: `${country.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.12, ease: 'backOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative w-4 h-4 cursor-pointer"
          whileHover={{ scale: 1.4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <span className="absolute inset-0 rounded-full bg-shiyali-accent pulse-dot" />
          <span className="relative block w-4 h-4 rounded-full bg-shiyali-accent border-2 border-white shadow-lg shadow-shiyali-accent/40" />
        </motion.div>
        <motion.span
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-shiyali-dark whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6 + index * 0.12 }}
        >
          {country.name}
        </motion.span>
      </div>
      <CountryTooltip country={country} visible={hovered} />
    </motion.div>
  );
}

function HeatBar({
  region,
  index,
  isInView,
}: {
  region: (typeof TALENT_REGIONS)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-shiyali-dark">{region.name}</span>
        <span className="text-sm font-bold text-shiyali-secondary">{region.percentage}%</span>
      </div>
      <div className="h-3 bg-shiyali-light-bg rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r', region.color)}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${region.percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.4 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  );
}

export default function GlobalPresenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const heatRef = useRef<HTMLDivElement>(null);
  const heatInView = useInView(heatRef, { once: true, margin: '-50px' });

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="section-padding py-20 lg:py-28">
        <div className="section-container">
          {/* Section Header */}
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
              GCC Operations
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-shiyali-dark mb-4">
              Global{' '}
              <span className="text-gradient">Presence</span>
            </h2>
            <p className="text-shiyali-dark/60 max-w-2xl mx-auto text-base lg:text-lg">
              Strategic recruitment operations across the GCC region.
            </p>
          </motion.div>

          {/* Map Container */}
          <motion.div
            ref={sectionRef}
            className="relative w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-shiyali-primary/10">
              {/* Grid pattern background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(8,43,91,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,43,91,0.04) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Subtle radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,122,196,0.06)_0%,transparent_70%)]" />

              {/* SVG Map */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#082B5B" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="#0E7AC4" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#082B5B" stopOpacity="0.06" />
                  </linearGradient>
                  <linearGradient id="landStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#082B5B" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#0E7AC4" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient id="coastGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0E7AC4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#0E7AC4" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#0E7AC4" stopOpacity="0" />
                  </linearGradient>
                  <filter id="landShadow" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#082B5B" floodOpacity="0.1" />
                  </filter>
                </defs>

                {/* Main Arabian Peninsula shape - stylized */}
                <motion.path
                  d="
                    M 28 12
                    C 30 10, 35 9, 38 11
                    C 40 12, 41 14, 42 13
                    C 44 11, 46 10, 48 11
                    L 50 12
                    C 48 14, 47 16, 48 18
                    C 49 20, 50 22, 48 24
                    C 47 26, 46 28, 45 30
                    C 44 32, 45 34, 47 35
                    C 49 36, 51 37, 53 36
                    C 55 35, 57 34, 58 36
                    C 59 38, 60 40, 62 41
                    C 64 42, 65 44, 66 46
                    C 67 48, 69 50, 70 52
                    C 71 54, 70 56, 68 58
                    C 66 60, 64 62, 62 64
                    C 60 66, 57 68, 55 70
                    C 53 72, 50 74, 48 76
                    C 46 78, 44 80, 42 78
                    C 40 76, 38 74, 37 72
                    C 36 70, 34 68, 33 66
                    C 32 64, 30 62, 29 60
                    C 28 58, 27 56, 26 54
                    C 25 52, 24 50, 24 48
                    C 24 46, 25 44, 25 42
                    C 25 40, 24 38, 25 36
                    C 26 34, 26 32, 27 30
                    C 28 28, 27 26, 28 24
                    C 29 22, 28 20, 27 18
                    C 26 16, 27 14, 28 12
                    Z
                  "
                  fill="url(#landGradient)"
                  stroke="url(#landStroke)"
                  strokeWidth="0.3"
                  filter="url(#landShadow)"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, pathLength: 1 }
                      : { opacity: 0, pathLength: 0 }
                  }
                  transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
                />

                {/* UAE outline hint */}
                <motion.path
                  d="
                    M 58 38
                    C 59 39, 61 40, 62 41
                    C 63 42, 64 43, 65 44
                    C 65 45, 64 46, 63 46
                    C 62 46, 61 45, 60 44
                    C 59 43, 58 42, 58 40
                    Z
                  "
                  fill="rgba(14,122,196,0.1)"
                  stroke="rgba(14,122,196,0.25)"
                  strokeWidth="0.2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />

                {/* Qatar peninsula hint */}
                <motion.path
                  d="
                    M 53 36
                    C 54 36, 55 37, 56 38
                    C 56.5 38.5, 56 39, 55 39
                    C 54 39, 53 38, 53 37
                    Z
                  "
                  fill="rgba(14,122,196,0.1)"
                  stroke="rgba(14,122,196,0.25)"
                  strokeWidth="0.2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />

                {/* Oman coast accent line */}
                <motion.path
                  d="
                    M 62 45
                    C 64 47, 67 50, 69 53
                    C 70 55, 69 57, 67 58
                  "
                  fill="none"
                  stroke="rgba(14,122,196,0.15)"
                  strokeWidth="0.3"
                  strokeLinecap="round"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                />

                {/* Water/coast glow line on right side */}
                <motion.path
                  d="
                    M 62 41
                    C 64 43, 67 47, 69 51
                    C 70 53, 70 55, 68 58
                    C 66 60, 64 62, 62 64
                  "
                  fill="none"
                  stroke="url(#coastGlow)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />

                {/* Decorative connecting lines between countries */}
                <motion.line
                  x1="42" y1="20" x2="50" y2="33"
                  stroke="rgba(14,122,196,0.08)"
                  strokeWidth="0.15"
                  strokeDasharray="0.8 0.8"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
                <motion.line
                  x1="50" y1="33" x2="54" y2="35"
                  stroke="rgba(14,122,196,0.08)"
                  strokeWidth="0.15"
                  strokeDasharray="0.8 0.8"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                />
                <motion.line
                  x1="54" y1="35" x2="62" y2="42"
                  stroke="rgba(14,122,196,0.08)"
                  strokeWidth="0.15"
                  strokeDasharray="0.8 0.8"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                />
                <motion.line
                  x1="42" y1="38" x2="50" y2="33"
                  stroke="rgba(14,122,196,0.08)"
                  strokeWidth="0.15"
                  strokeDasharray="0.8 0.8"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                />
              </svg>

              {/* Country Markers */}
              {GCC_COUNTRIES.map((country, index) => (
                <CountryMarker
                  key={country.name}
                  country={country}
                  index={index}
                  isInView={isInView}
                />
              ))}

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-shiyali-secondary/20 rounded-tl-sm" />
              <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-shiyali-secondary/20 rounded-tr-sm" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-shiyali-secondary/20 rounded-bl-sm" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-shiyali-secondary/20 rounded-br-sm" />
            </div>

            {/* Legend below map */}
            <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
              {GCC_COUNTRIES.map((country, index) => (
                <motion.div
                  key={country.name}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.08 }}
                >
                  <span className="relative w-2.5 h-2.5 rounded-full bg-shiyali-accent">
                    <span className="absolute inset-0 rounded-full bg-shiyali-accent animate-ping opacity-50" />
                  </span>
                  <span className="text-xs font-medium text-shiyali-dark/70">{country.name}</span>
                  <span className="text-xs font-semibold text-shiyali-secondary">
                    {country.placements.toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* WOW03 - Global Talent Heat Map */}
          <motion.div
            ref={heatRef}
            className="mt-16 lg:mt-20 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={heatInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-shiyali-primary/15" />
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-shiyali-light-bg">
                <Globe className="w-4 h-4 text-shiyali-secondary" />
                <span className="text-xs font-semibold tracking-wider uppercase text-shiyali-dark/70">
                  Talent Source Regions
                </span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-shiyali-primary/15" />
            </div>

            <div className="space-y-5">
              {TALENT_REGIONS.map((region, index) => (
                <HeatBar
                  key={region.name}
                  region={region}
                  index={index}
                  isInView={heatInView}
                />
              ))}
            </div>

            <motion.p
              className="text-center text-xs text-shiyali-dark/40 mt-6"
              initial={{ opacity: 0 }}
              animate={heatInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Distribution of our global talent sourcing network
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
