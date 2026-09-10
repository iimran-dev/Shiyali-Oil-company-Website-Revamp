'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Briefcase, Clock, Sparkles } from 'lucide-react';
import { FEATURED_JOBS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  'All',
  'Oil & Gas',
  'EPC Projects',
  'Construction',
  'Healthcare',
  'Infrastructure',
];

export default function FeaturedJobsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredJobs = useMemo(() => {
    if (selectedCategory === 'All') return FEATURED_JOBS;
    return FEATURED_JOBS.filter((job) => job.industry === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="jobs" className="bg-white py-14 sm:py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#FF5722] font-bold text-xs sm:text-sm tracking-wider uppercase mb-2 block">
            Careers &amp; Openings
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#061C33] tracking-tight mb-3">
            Featured Opportunities
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Active vacancies across premier energy, infrastructure, and healthcare projects in the GCC.
          </p>
        </div>

        {/* Compact Horizontal Filter Chips */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 mb-6 sm:mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? FEATURED_JOBS.length
                : FEATURED_JOBS.filter((j) => j.industry === cat).length;

            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all duration-200 cursor-pointer flex items-center gap-1.5',
                  isSelected
                    ? 'bg-[#061C33] text-white shadow-xs'
                    : 'bg-[#F8FAFC] border border-slate-200/80 text-slate-600 hover:text-[#061C33] hover:border-slate-300'
                )}
              >
                <span>{cat}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-md font-mono',
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modern Compact Job Rows List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.role}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-300/80 hover:shadow-md transition-all duration-200 gap-3.5 sm:gap-4"
                >
                  {/* Left: Role Info & Badges */}
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center text-[#061C33] group-hover:bg-[#FF5722] group-hover:text-white group-hover:border-[#FF5722] transition-colors shrink-0 mt-0.5 sm:mt-0 shadow-2xs">
                      <Briefcase className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-[#061C33] group-hover:text-[#FF5722] transition-colors leading-snug truncate">
                          {job.role}
                        </h3>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100">
                          {job.industry}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location}, {job.country}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {job.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Salary & Quick Apply Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-slate-400 block sm:hidden">Salary</span>
                      <span className="text-sm sm:text-base font-bold text-[#061C33] group-hover:text-[#FF5722] transition-colors block">
                        {job.salary}
                      </span>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="bg-[#061C33] group-hover:bg-[#FF5722] text-white font-semibold text-xs h-9 px-4 rounded-xl shadow-2xs group-hover:shadow transition-colors duration-200 shrink-0"
                    >
                      <a href="#requirement">
                        <span>Apply Now</span>
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 stroke-[2.5]" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10 bg-[#F8FAFC] rounded-2xl border border-slate-200/80">
                <p className="text-slate-700 font-bold text-sm">No vacancies found in this category</p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs text-[#FF5722] font-semibold mt-1 hover:underline cursor-pointer"
                >
                  View all positions
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Compact General Application Bar */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
          <div>
            <h4 className="text-sm font-bold text-[#061C33]">
              Don&apos;t see your specialization listed?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              We manage 100+ unadvertised client requirements across the GCC.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto text-xs font-semibold h-9 px-4 rounded-xl border-slate-300 bg-white hover:bg-slate-50 text-[#061C33] shrink-0"
          >
            <a href="#requirement">
              <span>Submit General Application</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
