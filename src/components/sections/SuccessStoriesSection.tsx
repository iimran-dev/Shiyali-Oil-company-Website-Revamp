'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SUCCESS_STORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
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

export default function SuccessStoriesSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [sectionRef, isVisible] = useScrollAnimation();
  const [key, setKey] = useState(0);
  const total = SUCCESS_STORIES.length;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + total) % total);
      setKey((k) => k + 1);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  const story = SUCCESS_STORIES[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section ref={sectionRef} className="bg-shiyali-light-bg section-padding py-20 lg:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-shiyali-primary mb-4">
            Success Stories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real outcomes, real impact.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative overflow-hidden min-h-[500px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="p-6 md:p-10 lg:p-12"
                >
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="lg:w-1/3 flex flex-col items-center justify-center text-center lg:text-left">
                      <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-shiyali-accent leading-none">
                        <MetricCounter key={key} metric={story.metric} />
                      </div>
                      <p className="text-lg font-medium text-shiyali-primary mt-2">
                        {story.metricLabel}
                      </p>
                    </div>

                    <div className="lg:w-2/3 flex flex-col gap-6">
                      <h3 className="text-xl md:text-2xl font-bold text-shiyali-primary">
                        {story.title}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-shiyali-secondary uppercase tracking-wider">
                            Challenge
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {story.challenge}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-shiyali-secondary uppercase tracking-wider">
                            Solution
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {story.solution}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-shiyali-secondary uppercase tracking-wider">
                            Results
                          </h4>
                          <ul className="space-y-2">
                            {story.results.map((result, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between px-6 md:px-10 lg:px-12 py-4 border-t border-shiyali-primary/10">
              <div className="flex items-center gap-2">
                {SUCCESS_STORIES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === current
                        ? 'bg-shiyali-accent w-8'
                        : 'bg-shiyali-primary/15 w-1.5 hover:bg-shiyali-primary/30'
                    )}
                    aria-label={`Go to story ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-shiyali-primary/20 flex items-center justify-center text-shiyali-primary hover:bg-shiyali-primary hover:text-white transition-colors"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border border-shiyali-primary/20 flex items-center justify-center text-shiyali-primary hover:bg-shiyali-primary hover:text-white transition-colors"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
