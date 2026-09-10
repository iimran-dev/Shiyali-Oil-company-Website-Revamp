'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Star, Building2, Sparkles } from 'lucide-react';
import { TESTIMONIALS, SUCCESS_STORIES } from '@/lib/constants';

interface CaseStudyStory {
  metric: string;
  metricLabel: string;
  market: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  results: string[];
}

const CASE_STORIES: CaseStudyStory[] = [
  {
    metric: SUCCESS_STORIES[0].metric,
    metricLabel: SUCCESS_STORIES[0].metricLabel,
    market: 'Saudi Arabia',
    title: SUCCESS_STORIES[0].title,
    quote: TESTIMONIALS[0].quote,
    author: TESTIMONIALS[0].name,
    role: TESTIMONIALS[0].title,
    company: TESTIMONIALS[0].company,
    results: ['45-Day Turnaround', 'Zero Compliance Errors'],
  },
  {
    metric: SUCCESS_STORIES[1].metric,
    metricLabel: SUCCESS_STORIES[1].metricLabel,
    market: 'UAE',
    title: SUCCESS_STORIES[1].title,
    quote: TESTIMONIALS[1].quote,
    author: TESTIMONIALS[1].name,
    role: TESTIMONIALS[1].title,
    company: TESTIMONIALS[1].company,
    results: ['12 Facilities Staffed', '98% Retention Rate'],
  },
  {
    metric: SUCCESS_STORIES[2].metric,
    metricLabel: SUCCESS_STORIES[2].metricLabel,
    market: 'Oman',
    title: SUCCESS_STORIES[2].title,
    quote: TESTIMONIALS[2].quote,
    author: TESTIMONIALS[2].name,
    role: TESTIMONIALS[2].title,
    company: TESTIMONIALS[2].company,
    results: ['180 Crew in 30 Days', 'Zero Safety Incidents'],
  },
];

export default function TestimonialsSection() {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section
      id="testimonials"
      className="py-10 sm:py-14 lg:py-16 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[#FF5722] font-bold text-xs tracking-wider uppercase mb-1.5 block">
            Proven Outcomes
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#061C33] tracking-tight mb-2">
            Real Impact for GCC Industry Leaders
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Verified recruitment velocity and long-term retention across Saudi Arabia, UAE, and Oman.
          </p>
        </div>

        {/* 3 Compact Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {CASE_STORIES.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-orange-300/80 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Metric & Country Pill */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#FF5722] leading-none">
                      {story.metric}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {story.metricLabel}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 shrink-0">
                    {story.market}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="text-sm font-bold text-[#061C33] group-hover:text-[#FF5722] transition-colors leading-snug mb-2">
                  {story.title}
                </h3>

                {/* Stars & Quote */}
                <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[10px] font-bold text-slate-400 ml-1">5.0</span>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed mb-3 line-clamp-3">
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Outcome Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {story.results.map((res, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/70 px-1.5 py-0.5 rounded"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                      <span>{res}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                <div className="w-8 h-8 rounded-full bg-[#061C33] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  {getInitials(story.author)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-[#061C33] text-xs leading-tight truncate">
                    {story.author}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                    {story.role} • <span className="text-[#FF5722] font-semibold">{story.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Bottom Trust Strip */}
        <div className="mt-6 sm:mt-8 py-2.5 px-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-around gap-3 text-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#061C33]">
            <Building2 className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>500+ Enterprise Clients</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#061C33]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>10,000+ Mobilizations</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#061C33]">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>98% Retention Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
