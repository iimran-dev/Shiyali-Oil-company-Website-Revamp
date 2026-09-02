'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <footer className="bg-shiyali-primary text-white">
      <div className="section-padding py-14 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
            {navGroups.map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-sm mb-4 text-white">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/60 hover:text-shiyali-accent transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="md:max-w-md">
                <h4 className="font-semibold text-sm mb-2">
                  Subscribe to our recruitment insights
                </h4>
                <p className="text-sm text-white/50">
                  Stay updated with the latest industry trends and opportunities.
                </p>
              </div>
              <form
                onSubmit={handleSubscribe}
                className="flex w-full md:w-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-r-none focus-visible:ring-shiyali-accent/50 focus-visible:border-shiyali-accent/50"
                />
                <Button
                  type="submit"
                  className="h-10 px-6 bg-shiyali-accent hover:bg-shiyali-accent/90 text-shiyali-primary font-medium rounded-l-none"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-shiyali-accent hover:text-shiyali-primary flex items-center justify-center text-white/60 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-white/50">
                <span>© 2024 Shiyali HR Services. All rights reserved.</span>
                {legalLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="hover:text-shiyali-accent transition-colors"
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
