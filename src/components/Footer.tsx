'use client';

import { useState } from 'react';
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FOOTER_NAV } from '@/lib/constants';

import { withBasePath } from '@/lib/utils';

const socials = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const legalLinks = ['Privacy Policy', 'Terms of Service', 'Sitemap'];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  const navGroups = Object.entries(FOOTER_NAV) as [string, string[]][];

  return (
    <footer className="bg-[#061C33] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div>
          {/* Footer Brand Logo & Accreditation */}
          <div className="mb-10 pb-6 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <a href={withBasePath('/')} className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 inline-flex items-center">
              <img
                src={withBasePath('/logo.svg')}
                alt="Shiyali HR Services"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </a>
            <p className="text-slate-400 text-xs max-w-md font-medium">
              Government-Approved Overseas Recruitment Specialist (Lic: B-0872/MUM/PER/1000+/5/8863/2012)
            </p>
          </div>

          {/* Nav Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
            {navGroups.map(([title, links]) => (
              <div key={title}>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-white/90">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-300 hover:text-[#FF5722] font-medium transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="md:max-w-md">
                <h4 className="font-bold text-base text-white mb-1">
                  Subscribe to Recruitment Insights
                </h4>
                <p className="text-sm text-slate-400 font-medium">
                  Get monthly updates on overseas labor trends, visa updates, and manpower intelligence.
                </p>
              </div>
              <form
                onSubmit={handleSubscribe}
                className="flex w-full md:w-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 bg-[#0A2540] border-slate-700 text-white placeholder:text-slate-400 rounded-r-none focus-visible:ring-[#FF5722]/50 focus-visible:border-[#FF5722]"
                />
                <Button
                  type="submit"
                  className="h-11 px-6 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold rounded-l-none shrink-0"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF5722] hover:text-white flex items-center justify-center text-white/80 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
                <span>© {new Date().getFullYear()} Shiyali HR Services. All rights reserved.</span>
                {legalLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="hover:text-[#FF5722] transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
