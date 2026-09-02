'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Handshake } from 'lucide-react';
import { CLIENT_LOGOS } from '@/lib/constants';

export default function ClientLogosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useInView(sectionRef, { once: true, amount: 0.1 });

  const duplicatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const secondRowLogos = [...CLIENT_LOGOS.slice().reverse(), ...CLIENT_LOGOS.slice().reverse(), ...CLIENT_LOGOS.slice().reverse(), ...CLIENT_LOGOS.slice().reverse()];

  return (
    <section ref={sectionRef} className="bg-shiyali-light-bg section-padding py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-shiyali-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-shiyali-primary/5 text-shiyali-primary text-sm font-medium mb-4">
            <Handshake className="w-4 h-4" />
            Trusted Partners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-shiyali-primary mb-4">
            Trusted By Industry Leaders
          </h2>
          <p className="text-shiyali-primary/50 text-lg max-w-2xl mx-auto">
            Partnerships built on trust and results.
          </p>
        </motion.div>

        {/* Logo Carousel - Row 1 (Left to Right) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isSectionVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-4"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-shiyali-light-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-shiyali-light-bg to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div className="infinite-scroll flex items-center" style={{ width: 'max-content' }}>
              {duplicatedLogos.map((name, i) => (
                <div
                  key={`row1-${i}`}
                  className="flex-shrink-0 mx-3 sm:mx-4 lg:mx-5"
                >
                  <LogoCard name={name} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Logo Carousel - Row 2 (Right to Left) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isSectionVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-shiyali-light-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-shiyali-light-bg to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div
              className="infinite-scroll-reverse flex items-center"
              style={{ width: 'max-content' }}
            >
              {secondRowLogos.map((name, i) => (
                <div
                  key={`row2-${i}`}
                  className="flex-shrink-0 mx-3 sm:mx-4 lg:mx-5"
                >
                  <LogoCard name={name} />
                </div>
              ))}
            </div>
          </div>


        </motion.div>
      </div>
    </section>
  );
}

function LogoCard({ name }: { name: string }) {
  return (
    <div className="group relative px-6 sm:px-8 lg:px-10 py-5 sm:py-6 rounded-xl border border-shiyali-primary/6 bg-white/60 hover:bg-white transition-all duration-300 hover:scale-105 hover:border-shiyali-secondary/20 hover:shadow-lg hover:shadow-shiyali-secondary/5">
      <span className="block text-lg sm:text-xl lg:text-2xl font-bold text-shiyali-primary/25 group-hover:text-shiyali-primary transition-all duration-300 whitespace-nowrap tracking-tight">
        {name}
      </span>
    </div>
  );
}
