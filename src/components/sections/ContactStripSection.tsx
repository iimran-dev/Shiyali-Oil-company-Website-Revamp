'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function ContactStripSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="bg-shiyali-dark section-padding py-8 lg:py-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-left">
            <a
              href="tel:+971XXXXXXX"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-shiyali-accent" />
              <span>+971-XX-XXX-XXXX</span>
            </a>
            <a
              href="mailto:info@shiyali.com"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4 text-shiyali-accent" />
              <span>info@shiyali.com</span>
            </a>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <MapPin className="w-4 h-4 text-shiyali-accent" />
              <span>Dubai, UAE</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm h-9 px-4"
            >
              <a href="https://wa.me/971XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                WhatsApp
              </a>
            </Button>
            <Button
              asChild
              className="bg-shiyali-accent hover:bg-shiyali-accent/90 text-shiyali-primary font-medium text-sm h-9 px-4"
            >
              <a href="#requirement">
                <CalendarDays className="w-4 h-4 mr-1.5" />
                Schedule Consultation
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
