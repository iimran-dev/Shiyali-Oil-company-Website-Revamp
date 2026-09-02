'use client';

import { motion } from 'framer-motion';
import {
  Droplets,
  FileText,
  Landmark,
  Factory,
  HeartPulse,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { INDUSTRIES_DATA } from '@/lib/constants';
import { withBasePath } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  'file-text': FileText,
  landmark: Landmark,
  factory: Factory,
  'heart-pulse': HeartPulse,
  layers: Layers,
};

interface IndustryCardProps {
  industry: (typeof INDUSTRIES_DATA)[number];
  index: number;
}

function IndustryCard({ industry, index }: IndustryCardProps) {
  const Icon = iconMap[industry.icon] || BuildingIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer text-center"
    >
      {/* Top Image Portion */}
      <div className="relative h-28 sm:h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={withBasePath(industry.image)}
          onError={(e) => {
            if (industry.unsplashUrl) {
              (e.target as HTMLImageElement).src = industry.unsplashUrl;
            }
          }}
          alt={industry.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Center Overlapping Floating Icon Badge */}
      <div className="relative flex justify-center -mt-6 z-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-[#FF5722] group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5722] stroke-[1.8]" />
        </div>
      </div>

      {/* Bottom Title Container */}
      <div className="pt-4 pb-4 px-2 sm:px-3 flex-1 flex items-center justify-center">
        <h3 className="text-xs sm:text-sm font-extrabold text-[#061C33] group-hover:text-[#FF5722] transition-colors duration-200 leading-snug line-clamp-2">
          {industry.title}
        </h3>
      </div>
    </motion.div>
  );
}

// Fallback icon definition
function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-12 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching reference image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#061C33] tracking-tight mb-2">
            Industries We Serve
          </h2>
          <div className="w-12 h-1 bg-[#FF5722] rounded-full mx-auto mb-3" />
          <p className="text-slate-500 text-sm sm:text-lg">
            Specialized recruitment solutions across diverse sectors
          </p>
        </motion.div>

        {/* 6-Card Horizontal Grid matching reference image */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {INDUSTRIES_DATA.map((industry, index) => (
            <IndustryCard key={industry.slug} industry={industry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
