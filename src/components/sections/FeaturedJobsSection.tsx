'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Search, Briefcase, Clock, Sparkles } from 'lucide-react';
import { FEATURED_JOBS } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

  return (
    <section ref={sectionRef} id="jobs" className="bg-white py-14 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-100"
        >
          <div>
            <span className="text-[#FF5722] font-bold text-xs sm:text-sm tracking-widest uppercase mb-1 block">
              Careers &amp; Openings
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#061C33] tracking-tight">
              Featured Opportunities
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-md">
            Explore current overseas vacancies across the GCC region.
          </p>
        </motion.div>

        {/* Compact Unified Search & Filter Bar ("In One") */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-3 sm:p-4 mb-8 flex flex-wrap md:flex-nowrap items-center gap-3 shadow-sm"
        >
          <div className="flex items-center gap-2 text-[#061C33] font-bold text-sm shrink-0 px-1">
            <Search className="w-4 h-4 text-[#FF5722]" />
            <span>Search:</span>
          </div>

          {/* Industry Filter Dropdown */}
          <div className="flex-1 min-w-[140px]">
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full text-sm font-medium border-slate-200 bg-white text-[#061C33] hover:border-orange-300">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt === 'All' ? 'All Industries' : opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter Dropdown */}
          <div className="flex-1 min-w-[140px]">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full text-sm font-medium border-slate-200 bg-white text-[#061C33] hover:border-orange-300">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt === 'All' ? 'All Locations' : opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experience Filter Dropdown */}
          <div className="flex-1 min-w-[140px]">
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-full text-sm font-medium border-slate-200 bg-white text-[#061C33] hover:border-orange-300">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt === 'All' ? 'All Experience' : opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Job Count Badge */}
          <div className="ml-auto shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
            <span>{filteredJobs.length * 4} Positions</span>
          </div>
        </motion.div>

        {/* Compact Job Cards Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${industryFilter}-${locationFilter}-${experienceFilter}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.role}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-orange-300/80 transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Top Row: Role & Salary */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#061C33] group-hover:text-[#FF5722] transition-colors duration-200 leading-snug">
                        {job.role}
                      </h3>
                      <span className="text-sm font-extrabold text-[#FF5722] shrink-0 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                        {job.salary}
                      </span>
                    </div>

                    {/* Tags Row */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge className="bg-sky-50 text-sky-700 border border-sky-100 text-xs font-medium px-2.5 py-0.5 rounded-md hover:bg-sky-50">
                        {job.industry}
                      </Badge>
                      <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}, {job.country}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Apply Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#FF5722] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Actively Hiring
                    </span>
                    <Button
                      size="sm"
                      className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm group-hover:shadow transition-all duration-200 h-auto"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 stroke-[2.5]" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-[#F8FAFC] rounded-2xl border border-slate-200">
                <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-700 font-bold text-base">No matching positions found</p>
                <p className="text-slate-500 text-xs mt-1">Try clearing or adjusting your filters</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
