'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Fuel,
  HardHat,
  Building2,
  Construction as Crane,
  Factory,
  HeartPulse,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn, withBasePath } from '@/lib/utils';
import { useHeaderScroll } from '@/hooks/use-header-scroll';
import { NAV_INDUSTRIES } from '@/lib/constants';

const DIRECT_NAV_LINKS = [
  { label: 'Industries', href: '#industries', hasDropdown: true },
  { label: 'Why Us', href: '#why-shiyali', hasDropdown: false },
  { label: 'Process', href: '#recruitment-process', hasDropdown: false },
  { label: 'Featured Jobs', href: '#jobs', hasDropdown: false },
  { label: 'Testimonials', href: '#testimonials', hasDropdown: false },
];

const MENU_ICONS: Record<string, React.ReactNode> = {
  'oil-gas': <Fuel className="h-4 w-4" />,
  'epc-projects': <HardHat className="h-4 w-4" />,
  'infrastructure': <Building2 className="h-4 w-4" />,
  'construction': <Crane className="h-4 w-4" />,
  'manufacturing': <Factory className="h-4 w-4" />,
  'healthcare': <HeartPulse className="h-4 w-4" />,
};

function IndustriesMegaMenu({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn(
            'absolute left-0 top-full mt-2 w-[420px] rounded-2xl',
            'bg-white shadow-2xl shadow-[#061C33]/10 border border-slate-200/90 p-5',
            'z-50'
          )}
          onMouseLeave={onClose}
        >
          <div className="text-xs font-bold text-[#FF5722] uppercase tracking-wider mb-3 px-2">
            Sectors We Hire For
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {NAV_INDUSTRIES.map((item) => (
              <a
                key={item.slug}
                href="#industries"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold text-[#061C33] hover:bg-sky-50 hover:text-[#FF5722] transition-all duration-200 group"
                onClick={onClose}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 group-hover:bg-[#FF5722] group-hover:text-white transition-all duration-200">
                  {MENU_ICONS[item.slug] || <ArrowRight className="h-3.5 w-3.5" />}
                </span>
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const { scrolled, mobileOpen, setMobileOpen } = useHeaderScroll();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuEnter = (label: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100/60 py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={withBasePath('/logo.svg')}
              alt="Shiyali HR Services"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {DIRECT_NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && handleMenuEnter(link.label)}
                onMouseLeave={handleMenuLeave}
              >
                <a
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-[#061C33] hover:text-[#FF5722] rounded-lg transition-colors duration-200'
                  )}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 text-slate-400 transition-transform duration-200',
                        activeMenu === link.label && 'rotate-180 text-[#FF5722]'
                      )}
                    />
                  )}
                </a>

                {link.hasDropdown && (
                  <IndustriesMegaMenu
                    isOpen={activeMenu === link.label}
                    onClose={() => setActiveMenu(null)}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden sm:inline-flex bg-[#FF5722] hover:bg-[#E64A19] text-white font-extrabold text-xs sm:text-sm h-10 px-5 rounded-xl shadow-md shadow-orange-500/20 transition-all duration-200 hover:scale-105"
            >
              <a href="#requirement">
                Submit Requirement
                <ArrowRight className="ml-1.5 h-4 w-4 stroke-[2.5]" />
              </a>
            </Button>

            {/* Mobile Navigation Trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-slate-100 text-[#061C33] hover:bg-slate-200 transition-colors"
                  aria-label="Open menu"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-md p-0 bg-white">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-5 border-b border-slate-100">
                    <img
                      src="/logo.png"
                      alt="Shiyali HR Services"
                      className="h-8 w-auto object-contain"
                    />
                  </div>

                  {/* Mobile Nav Links */}
                  <div className="flex-1 py-4 overflow-y-auto">
                    <div className="space-y-1 px-4">
                      {DIRECT_NAV_LINKS.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between w-full px-4 py-3 text-base font-extrabold text-[#061C33] hover:bg-sky-50 hover:text-[#FF5722] rounded-xl transition-all"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-4 w-4 text-slate-400" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <div className="p-5 border-t border-slate-100 bg-slate-50">
                    <Button
                      asChild
                      className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-extrabold h-11 text-sm rounded-xl shadow-md shadow-orange-500/20"
                      onClick={() => setMobileOpen(false)}
                    >
                      <a href="#requirement">
                        Submit Requirement
                        <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5]" />
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
