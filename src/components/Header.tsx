'use client';

import { useState, useEffect, useRef } from 'react';
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
  Users,
  Briefcase,
  Clock,
  FileText,
  Target,
  Globe,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useHeaderScroll } from '@/hooks/use-header-scroll';
import { NAV_INDUSTRIES, NAV_SERVICES, NAV_JOBS } from '@/lib/constants';

const NAV_ITEMS = [
  { label: 'Industries', items: NAV_INDUSTRIES },
  { label: 'Services', items: NAV_SERVICES },
  { label: 'Jobs', items: NAV_JOBS },
];

const MENU_ICONS: Record<string, React.ReactNode> = {
  'oil-gas': <Fuel className="h-4 w-4" />,
  'epc-projects': <HardHat className="h-4 w-4" />,
  'infrastructure': <Building2 className="h-4 w-4" />,
  'construction': <Crane className="h-4 w-4" />,
  'manufacturing': <Factory className="h-4 w-4" />,
  'healthcare': <HeartPulse className="h-4 w-4" />,
  'bulk-hiring': <Users className="h-4 w-4" />,
  'project-staffing': <Briefcase className="h-4 w-4" />,
  'shutdown-recruitment': <Clock className="h-4 w-4" />,
  'contract-staffing': <FileText className="h-4 w-4" />,
  'executive-search': <Target className="h-4 w-4" />,
  'overseas-recruitment': <Globe className="h-4 w-4" />,
  'jobs-uae': <MapPin className="h-4 w-4" />,
  'jobs-saudi': <MapPin className="h-4 w-4" />,
  'jobs-qatar': <MapPin className="h-4 w-4" />,
  'jobs-oman': <MapPin className="h-4 w-4" />,
  'jobs-kuwait': <MapPin className="h-4 w-4" />,
  'jobs-bahrain': <MapPin className="h-4 w-4" />,
};

function MegaMenu({ items, isOpen, onClose }: {
  items: { name: string; slug: string }[];
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
            'mega-menu-enter absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[480px] rounded-2xl',
            'bg-white shadow-2xl shadow-shiyali-primary/10 border border-gray-100 p-6',
            'z-50'
          )}
          onMouseLeave={onClose}
        >
          <div className="grid grid-cols-2 gap-2">
            {items.map((item) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-shiyali-primary hover:bg-shiyali-light-bg hover:text-shiyali-secondary transition-all duration-200 group"
                onClick={onClose}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-shiyali-light-bg text-shiyali-secondary group-hover:bg-shiyali-secondary group-hover:text-white transition-all duration-200">
                  {MENU_ICONS[item.slug] || <ArrowRight className="h-4 w-4" />}
                </span>
                <span>{item.name}</span>
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

  const navTextColor = scrolled ? 'text-shiyali-primary' : 'text-white';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-shiyali-primary/5'
            : 'bg-transparent'
        )}
      >
        <div className="section-container section-padding">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="relative flex items-center h-10 w-auto shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="Shiyali HR Services"
                className="h-10 w-auto object-cover object-top"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(item.label)}
                  onMouseLeave={handleMenuLeave}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300',
                      navTextColor,
                      activeMenu === item.label && 'bg-white/10'
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-300',
                        activeMenu === item.label && 'rotate-180'
                      )}
                    />
                  </button>
                  <MegaMenu
                    items={item.items}
                    isOpen={activeMenu === item.label}
                    onClose={() => setActiveMenu(null)}
                  />
                </div>
              ))}

              <a
                href="#about"
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300',
                  navTextColor
                )}
              >
                About
              </a>
              <a
                href="#contact"
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300',
                  navTextColor
                )}
              >
                Contact
              </a>
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Button
                className={cn(
                  'hidden sm:inline-flex font-semibold shadow-lg shadow-shiyali-accent/25 hover:shadow-shiyali-accent/40 transition-all duration-300 hover:scale-105',
                  'bg-shiyali-accent text-shiyali-primary'
                )}
              >
                Submit Requirement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button
                    className={cn(
                      'lg:hidden flex items-center justify-center h-10 w-10 rounded-lg transition-colors',
                      scrolled
                        ? 'text-shiyali-primary hover:bg-shiyali-light-bg'
                        : 'text-white hover:bg-white/10'
                    )}
                    aria-label="Open menu"
                  >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-md p-0 overflow-y-auto">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center gap-3 p-6 border-b border-gray-100">
                      <div className="relative h-10 w-auto overflow-hidden">
                        <img
                          src="/logo.png"
                          alt="Shiyali HR Services"
                          className="h-10 w-auto object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Mobile Nav Items */}
                    <div className="flex-1 py-4">
                      {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="border-b border-gray-50">
                          <button
                            className="flex items-center justify-between w-full px-6 py-4 text-base font-semibold text-shiyali-primary hover:bg-shiyali-light-bg transition-colors"
                          >
                            {item.label}
                            <ChevronDown className="h-4 w-4 text-shiyali-secondary" />
                          </button>
                          <div className="pb-3 px-6">
                            <div className="grid grid-cols-1 gap-1">
                              {item.items.map((subItem) => (
                                <a
                                  key={subItem.slug}
                                  href={`#${subItem.slug}`}
                                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:text-shiyali-secondary hover:bg-shiyali-light-bg transition-all"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <ArrowRight className="h-3.5 w-3.5" />
                                  {subItem.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}

                      <a
                        href="#about"
                        className="flex items-center px-6 py-4 text-base font-semibold text-shiyali-primary hover:bg-shiyali-light-bg transition-colors border-b border-gray-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        About
                      </a>
                      <a
                        href="#contact"
                        className="flex items-center px-6 py-4 text-base font-semibold text-shiyali-primary hover:bg-shiyali-light-bg transition-colors border-b border-gray-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        Contact
                      </a>
                    </div>

                    {/* Mobile CTA */}
                    <div className="p-6 border-t border-gray-100">
                      <Button className="w-full font-semibold text-shiyali-primary bg-shiyali-accent hover:bg-shiyali-accent/90 shadow-lg shadow-shiyali-accent/25">
                        Submit Requirement
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
