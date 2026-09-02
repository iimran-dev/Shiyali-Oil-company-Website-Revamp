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
    <section id="why-shiyali" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            {/* Subtitle */}
            <span className="text-[#FF5722] font-semibold text-sm sm:text-base mb-3 block">
              Why Employers Choose Shiyali
            </span>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061C33] tracking-tight leading-[1.12] mb-6">
              Your Success.
              <br />
              Our Commitment.
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              We go beyond recruitment. We build long-lasting partnerships by delivering quality talent that drives your business.
            </p>

            {/* CTA Button */}
            <div>
              <Button
                size="lg"
                className="group bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold text-base px-7 py-6 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all duration-300 h-auto"
              >
                <span>Know More About Us</span>
                <ArrowRight className="ml-2.5 h-5 w-5 stroke-[2.5] group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column: 6 Feature Cards inside Light Blue Container Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 bg-[#F4F8FC] rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-100/90 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {WHY_SHIYALI_FEATURES.map((feature) => {
                const Icon = featureIcons[feature.icon] || ShieldCheck;
                return (
                  <div key={feature.title} className="flex items-start gap-4">
                    {/* Floating White Circular Icon Badge */}
                    <div className="w-12 h-12 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-sky-600 shrink-0">
                      <Icon className="w-5 h-5 stroke-[1.8] text-sky-600" />
                    </div>

                    {/* Feature Title & Description */}
                    <div className="flex flex-col">
                      <h3 className="text-base sm:text-lg font-bold text-[#061C33] leading-snug mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
