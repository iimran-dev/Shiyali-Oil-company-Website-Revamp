'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import TrustMetricsSection from '@/components/sections/TrustMetricsSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import WhyShiyaliSection from '@/components/sections/WhyShiyaliSection';
import RecruitmentProcessSection from '@/components/sections/RecruitmentProcessSection';
import FeaturedJobsSection from '@/components/sections/FeaturedJobsSection';
import ClientLogosSection from '@/components/sections/ClientLogosSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import RequirementFormSection from '@/components/sections/RequirementFormSection';
import ContactStripSection from '@/components/sections/ContactStripSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <TrustMetricsSection />
        <IndustriesSection />
        <WhyShiyaliSection />
        <RecruitmentProcessSection />
        <FeaturedJobsSection />
        <ClientLogosSection />
        <TestimonialsSection />
        <RequirementFormSection />
        <ContactStripSection />
      </main>
      <Footer />
    </div>
  );
}
