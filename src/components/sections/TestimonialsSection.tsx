'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, CheckCircle2, Award, MessageSquareQuote } from 'lucide-react';
import { TESTIMONIALS, SUCCESS_STORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCounter } from '@/hooks/use-counter';

function MetricCounter({ metric }: { metric: string }) {
  const numericPart = parseInt(metric.replace(/[^0-9]/g, ''), 10);
  const hasPlus = metric.includes('+');
  const [ref, count] = useCounter(numericPart, 1800, true);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {hasPlus ? '+' : ''}
    </span>
  );
}

export default function TestimonialsSection() {
  // Testimonials Carousel State
  const [testiIdx, setTestiIdx] = useState(0);
  const [testiDir, setTestiDir] = useState(0);

  // Success Stories Carousel State
  const [storyIdx, setStoryIdx] = useState(0);
  const [storyDir, setStoryDir] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Testimonials navigation
  const nextTesti = useCallback(() => {
    setTestiDir(1);
    setTestiIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);
  const prevTesti = useCallback(() => {
    setTestiDir(-1);
    setTestiIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Success Stories navigation
  const nextStory = useCallback(() => {
    setStoryDir(1);
    setStoryIdx((prev) => (prev + 1) % SUCCESS_STORIES.length);
  }, []);
  const prevStory = useCallback(() => {
    setStoryDir(-1);
    setStoryIdx((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const currentTestimonial = TESTIMONIALS[testiIdx];
  const currentStory = SUCCESS_STORIES[storyIdx];

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#FF5722] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">
            Client Trust &amp; Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#061C33] tracking-tight mb-4">
            Testimonials &amp; Success Stories
          </h2>
          <p className="text-slate-600 font-medium text-base lg:text-lg">
            Discover why leading enterprise clients across the GCC trust Shiyali.
          </p>
        </motion.div>

        {/* Side-by-Side Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Client Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5722]">
                    <MessageSquareQuote className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#061C33]">Client Reviews</h3>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {testiIdx + 1} of {TESTIMONIALS.length}
                </span>
              </div>

              {/* Quote Content */}
              <div className="relative min-h-[160px] sm:min-h-[180px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testiIdx}
                    initial={{ opacity: 0, x: testiDir * 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -testiDir * 30 }}
                    transition={{ duration: 0.35 }}
                    className="w-full"
                  >
                    <Quote className="w-8 h-8 text-orange-400/30 mb-3" />
                    <p className="text-base sm:text-lg italic font-medium text-[#061C33] leading-relaxed mb-6">
                      &ldquo;{currentTestimonial.quote}&rdquo;
                    </p>

                    {/* Author Details */}
                    <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                      <div className="w-12 h-12 rounded-full bg-[#061C33] text-white flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
                        {getInitials(currentTestimonial.name)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#061C33] text-sm sm:text-base leading-snug">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                          {currentTestimonial.title} • <span className="text-[#FF5722]">{currentTestimonial.company}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTestiDir(i > testiIdx ? 1 : -1);
                      setTestiIdx(i);
                    }}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      i === testiIdx
                        ? 'bg-[#FF5722] w-6'
                        : 'bg-slate-200 w-2 hover:bg-slate-300'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTesti}
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#061C33] flex items-center justify-center shadow-xs transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTesti}
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#061C33] flex items-center justify-center shadow-xs transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Proven Success Stories */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                    <Award className="w-5 h-5 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#061C33]">Proven Outcomes</h3>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  {storyIdx + 1} of {SUCCESS_STORIES.length}
                </span>
              </div>

              {/* Story Content */}
              <div className="relative min-h-[160px] sm:min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={storyIdx}
                    initial={{ opacity: 0, x: storyDir * 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -storyDir * 30 }}
                    transition={{ duration: 0.35 }}
                    className="w-full"
                  >
                    {/* Metric Highlight */}
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#FF5722]">
                        <MetricCounter metric={currentStory.metric} />
                      </span>
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        {currentStory.metricLabel}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-extrabold text-[#061C33] mb-3 leading-snug">
                      {currentStory.title}
                    </h4>

                    {/* Solution Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4 leading-relaxed line-clamp-2">
                      {currentStory.solution}
                    </p>

                    {/* Key Results Checklist */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      {currentStory.results.slice(0, 3).map((res, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0 stroke-[2.5]" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Bar */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                {SUCCESS_STORIES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setStoryDir(i > storyIdx ? 1 : -1);
                      setStoryIdx(i);
                    }}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      i === storyIdx
                        ? 'bg-[#FF5722] w-6'
                        : 'bg-slate-200 w-2 hover:bg-slate-300'
                    )}
                    aria-label={`Go to story ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevStory}
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#061C33] flex items-center justify-center shadow-xs transition-colors"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextStory}
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#061C33] flex items-center justify-center shadow-xs transition-colors"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
