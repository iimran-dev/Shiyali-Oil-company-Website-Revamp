'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  Users,
  Target,
  Zap,
  Handshake,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHY_SHIYALI_FEATURES } from '@/lib/constants';

const featureIcons: Record<string, LucideIcon> = {
  'shield-check': ShieldCheck,
  clock: Clock,
  users: Users,
  target: Target,
  zap: Zap,
  handshake: Handshake,
};

export default function WhyShiyaliSection() {
  return (
    <section id="why-shiyali" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clear & Punchy Value Statement */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <span className="text-[#FF5722] font-bold text-xs sm:text-sm tracking-wider uppercase mb-2 block">
              Why Choose Shiyali
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#061C33] tracking-tight leading-tight mb-3 sm:mb-4">
              Your Success.
              <br />
              Our Commitment.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
              We go beyond recruitment. We build long-lasting partnerships by delivering verified,
              recruitment-ready talent that drives your business forward across the GCC.
            </p>

            <div>
              <Button
                asChild
                className="w-full sm:w-auto bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-sm h-11 px-6 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <a href="#requirement">
                  <span>Know More About Us</span>
                  <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Clean, Compact 2-Column Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5"
          >
            {WHY_SHIYALI_FEATURES.map((feature) => {
              const Icon = featureIcons[feature.icon] || ShieldCheck;

              return (
                <div
                  key={feature.title}
                  className="group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] hover:bg-white border border-slate-200/70 hover:border-orange-300/80 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 group-hover:border-orange-200 group-hover:bg-orange-50/50 flex items-center justify-center text-[#061C33] group-hover:text-[#FF5722] shrink-0 mt-0.5 transition-colors duration-200 shadow-2xs">
                    <Icon className="w-4.5 h-4.5 stroke-[2]" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-[#061C33] group-hover:text-[#FF5722] transition-colors duration-200 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
