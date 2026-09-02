'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function ContactStripSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="bg-[#061C33] border-t border-slate-800 py-6 sm:py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6"
        >
          {/* Contact Details Grid / Flex Wrap */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8">
            <a
              href="tel:+971XXXXXXX"
              className="inline-flex items-center gap-2.5 text-white/90 hover:text-white font-medium transition-colors text-xs sm:text-sm"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF5722] shrink-0">
                <Phone className="w-3.5 h-3.5 text-[#FF5722]" />
              </div>
              <span>+971-XX-XXX-XXXX</span>
            </a>

            <a
              href="mailto:info@shiyali.com"
              className="inline-flex items-center gap-2.5 text-white/90 hover:text-white font-medium transition-colors text-xs sm:text-sm"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF5722] shrink-0">
                <Mail className="w-3.5 h-3.5 text-[#FF5722]" />
              </div>
              <span>info@shiyali.com</span>
            </a>

            <div className="inline-flex items-center gap-2.5 text-white/90 font-medium text-xs sm:text-sm">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF5722] shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
              </div>
              <span>Dubai, UAE</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Button
              asChild
              className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm h-10 px-5 rounded-xl transition-all justify-center"
            >
              <a href="https://wa.me/971XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2 stroke-[2.5]" />
                WhatsApp Us
              </a>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs sm:text-sm h-10 px-5 rounded-xl shadow-md shadow-orange-500/20 transition-all justify-center"
            >
              <a href="#requirement">
                <CalendarDays className="w-4 h-4 mr-2 stroke-[2.5]" />
                Schedule Consultation
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
