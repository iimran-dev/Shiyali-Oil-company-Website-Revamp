'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { withBasePath } from '@/lib/utils';

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[90vh] pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#F0F5FA] flex items-center">
      {/* Full-Bleed Landscape Unsplash Background Image Across Entire Hero */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=80"
          onError={(e) => {
            (e.target as HTMLImageElement).src = withBasePath('/hero-landscape.jpg');
          }}
          alt="Engineering and Construction Landscape Background"
          className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.98]"
        />

        {/* Full Section Left-to-Right Soft Fade Gradient (Protects Left Text Legibility while Keeping Right Landscape Vivid) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0F5FA] via-[#F0F5FA]/90 via-40% sm:via-48% to-[#F0F5FA]/15 to-85% w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F5FA]/60 via-transparent to-[#F0F5FA]/80 w-full" />
      </div>

      {/* Atmospheric Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-12 w-[450px] h-[450px] rounded-full bg-sky-300/15 blur-[100px] pointer-events-none z-0"
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Subtitle Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm mb-5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5722] animate-pulse" />
            <span className="text-[#0E2A47] font-semibold text-xs sm:text-sm tracking-wide uppercase">
              Connecting Global Employers With
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#061C33] tracking-tight leading-[1.08] mb-6 drop-shadow-sm"
          >
            Right Talent<span className="text-[#FF5722]">.</span>
            <br />
            Right Time<span className="text-[#FF5722]">.</span>
          </motion.h1>

          {/* Sub-description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#334155] text-base sm:text-lg lg:text-xl max-w-xl mb-9 leading-relaxed font-normal"
          >
            Your trusted recruitment partner for GCC, Oil &amp; Gas, EPC, Infrastructure, Manufacturing &amp; Healthcare sectors.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <Button
              asChild
              className="group bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-sm px-5 sm:px-6 h-11 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <a href="#requirement">
                <span>Hire Talent</span>
                <ArrowRight className="ml-2 h-4 w-4 stroke-[2] group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group border-[#90E0EF]/80 bg-white/90 backdrop-blur-md hover:bg-white text-[#061C33] font-semibold text-sm px-5 sm:px-6 h-11 rounded-xl shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
            >
              <a href="#jobs">
                <span>Explore Jobs</span>
                <ArrowRight className="ml-2 h-4 w-4 stroke-[2] text-[#FF5722] group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
