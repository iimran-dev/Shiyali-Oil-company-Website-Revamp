'use client';

import { useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, ArrowRight, Search, Briefcase, Clock } from 'lucide-react';
import { FEATURED_JOBS, INDUSTRY_TICKERS } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const INDUSTRY_OPTIONS = [
  'All',
  'Oil & Gas',
  'EPC Projects',
  'Construction',
  'Healthcare',
  'Infrastructure',
  'Manufacturing',
];

const LOCATION_OPTIONS = [
  'All',
  'UAE',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Kuwait',
  'Bahrain',
];

const EXPERIENCE_OPTIONS = [
  'All',
  '3-5 Years',
  '5-8 Years',
  '8-12 Years',
  '12+ Years',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.97,
    transition: { duration: 0.25 },
  },
};

export default function FeaturedJobsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useInView(sectionRef, { once: true, amount: 0.08 });

  const [industryFilter, setIndustryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [experienceFilter, setExperienceFilter] = useState('All');

  const filteredJobs = useMemo(() => {
    return FEATURED_JOBS.filter((job) => {
      if (industryFilter !== 'All' && job.industry !== industryFilter) return false;
      if (locationFilter !== 'All' && job.country !== locationFilter) return false;
      if (experienceFilter !== 'All') {
        const expNums = job.experience.match(/\d+/g);
        if (!expNums) return false;
        const minExp = parseInt(expNums[0]);
        const maxExp = expNums.length > 1 ? parseInt(expNums[1]) : minExp;
        const midExp = (minExp + maxExp) / 2;
        if (experienceFilter === '3-5 Years' && midExp > 6.5) return false;
        if (experienceFilter === '5-8 Years' && (midExp < 4.5 || midExp > 9)) return false;
        if (experienceFilter === '8-12 Years' && (midExp < 7 || midExp > 13)) return false;
        if (experienceFilter === '12+ Years' && minExp < 10) return false;
      }
      return true;
    });
  }, [industryFilter, locationFilter, experienceFilter]);

  const duplicatedTickers = [...INDUSTRY_TICKERS, ...INDUSTRY_TICKERS];

  return (
    <section ref={sectionRef} className="bg-white section-padding py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-shiyali-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-shiyali-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-shiyali-secondary/10 text-shiyali-secondary text-sm font-medium mb-4">
            <Briefcase className="w-4 h-4" />
            Career Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shiyali-primary mb-4">
            Featured Opportunities
          </h2>
          <p className="text-shiyali-primary/60 text-lg max-w-2xl mx-auto">
            Current openings across the GCC region.
          </p>
        </motion.div>

        {/* WOW05 Industries Recruiting Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3 px-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-shiyali-primary/50 uppercase tracking-wider">Live Recruiting</span>
          </div>
          <div className="overflow-hidden rounded-lg bg-shiyali-light-bg border border-shiyali-primary/5 py-3">
            <div className="infinite-scroll flex whitespace-nowrap">
              {duplicatedTickers.map((industry, i) => (
                <span key={i} className="inline-flex items-center px-4">
                  <span className="text-sm font-medium text-shiyali-primary/40">
                    {industry}
                  </span>
                  {i < duplicatedTickers.length - 1 && (
                    <span className="ml-4 mr-4 w-1 h-1 rounded-full bg-shiyali-accent/60" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-shiyali-primary/40" />
            <span className="text-sm font-medium text-shiyali-primary/60">Filter:</span>
          </div>

          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[160px] text-sm border-shiyali-primary/10 bg-white hover:border-shiyali-secondary/30">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRY_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[160px] text-sm border-shiyali-primary/10 bg-white hover:border-shiyali-secondary/30">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {LOCATION_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={experienceFilter} onValueChange={setExperienceFilter}>
            <SelectTrigger className="w-[160px] text-sm border-shiyali-primary/10 bg-white hover:border-shiyali-secondary/30">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Live Job Counter Badge */}
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-semibold text-emerald-700">
              {filteredJobs.length * 4} Active Positions
            </span>
          </div>
        </motion.div>

        {/* Job Cards Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${industryFilter}-${locationFilter}-${experienceFilter}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.role}
                  variants={cardVariants}
                  layout
                  whileHover={{
                    y: -4,
                    boxShadow: '0 12px 40px rgba(8, 43, 91, 0.1)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl border border-shiyali-primary/8 p-6 lg:p-7 hover:border-shiyali-secondary/20 transition-colors duration-300"
                >
                  {/* Top row: Industry badge + Salary */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Badge className="bg-shiyali-secondary/10 text-shiyali-secondary border-0 text-xs font-medium px-2.5 py-0.5 rounded-md">
                      {job.industry}
                    </Badge>
                    <span className="text-shiyali-accent font-bold text-sm whitespace-nowrap">
                      {job.salary}
                    </span>
                  </div>

                  {/* Role title */}
                  <h3 className="text-lg font-bold text-shiyali-primary mb-3 group-hover:text-shiyali-secondary transition-colors duration-300">
                    {job.role}
                  </h3>

                  {/* Details row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
                    <div className="flex items-center gap-1.5 text-shiyali-primary/50 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}, {job.country}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-shiyali-primary/50 text-sm">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  {/* Apply button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-shiyali-accent text-shiyali-primary font-semibold text-sm rounded-xl hover:bg-shiyali-accent/90 transition-colors duration-200"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={cardVariants}
                className="col-span-full text-center py-16"
              >
                <Search className="w-10 h-10 text-shiyali-primary/20 mx-auto mb-4" />
                <p className="text-shiyali-primary/40 text-lg font-medium">No matching positions found</p>
                <p className="text-shiyali-primary/30 text-sm mt-1">Try adjusting your filters</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
