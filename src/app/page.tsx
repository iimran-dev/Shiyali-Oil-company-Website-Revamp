'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import TrustMetricsSection from '@/components/sections/TrustMetricsSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import WhyShiyaliSection from '@/components/sections/WhyShiyaliSection';
import GlobalPresenceSection from '@/components/sections/GlobalPresenceSection';
import RecruitmentProcessSection from '@/components/sections/RecruitmentProcessSection';
import EmployerSolutionsSection from '@/components/sections/EmployerSolutionsSection';
import FeaturedJobsSection from '@/components/sections/FeaturedJobsSection';
import ClientLogosSection from '@/components/sections/ClientLogosSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection';
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
        <GlobalPresenceSection />
        <RecruitmentProcessSection />
        <EmployerSolutionsSection />
        <FeaturedJobsSection />
        <ClientLogosSection />
        <TestimonialsSection />
        <SuccessStoriesSection />
        <RequirementFormSection />
        <ContactStripSection />
      </main>
      <Footer />
    </div>
  );
}
