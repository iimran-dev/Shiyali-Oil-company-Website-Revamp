'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function ContactStripSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="bg-[#061C33] border-t border-slate-800 py-8 lg:py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8"
        >
          {/* Contact Methods */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-left">
            <a
              href="tel:+971XXXXXXX"
              className="flex items-center gap-2.5 text-white/90 hover:text-white font-medium transition-colors text-sm"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF5722]">
                <Phone className="w-4 h-4 text-[#FF5722]" />
              </div>
              <span>+971-XX-XXX-XXXX</span>
            </a>
            <a
              href="mailto:info@shiyali.com"
              className="flex items-center gap-2.5 text-white/90 hover:text-white font-medium transition-colors text-sm"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF5722]">
                <Mail className="w-4 h-4 text-[#FF5722]" />
              </div>
              <span>info@shiyali.com</span>
            </a>
            <div className="flex items-center gap-2.5 text-white/90 font-medium text-sm">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF5722]">
                <MapPin className="w-4 h-4 text-[#FF5722]" />
              </div>
              <span>Dubai, UAE</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm h-10 px-5 rounded-xl transition-all"
            >
              <a href="https://wa.me/971XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2 stroke-[2.5]" />
                WhatsApp Us
              </a>
            </Button>
            <Button
              asChild
              className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-sm h-10 px-5 rounded-xl shadow-md shadow-orange-500/20 transition-all"
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
