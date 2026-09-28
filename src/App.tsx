/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStatement } from './components/TrustStatement';
import { ServicesOverview } from './components/ServicesOverview';
import { DigitalMarketingSection } from './components/DigitalMarketingSection';
import { AIVideoCreativeSection } from './components/AIVideoCreativeSection';
import { DesignBrandingSection } from './components/DesignBrandingSection';
import { SoftwareDevelopmentSection } from './components/SoftwareDevelopmentSection';
import { AutomationSection } from './components/AutomationSection';
import { BlockchainSection } from './components/BlockchainSection';
import { WhyJLSection } from './components/WhyJLSection';
import { ProcessSection } from './components/ProcessSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { IndustriesSection } from './components/IndustriesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Digital Marketing');

  const handleOpenModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#040711] text-[#E2E8F0] selection:bg-[#0084FF]/30 selection:text-white flex flex-col font-sans">
      {/* Top Floating Header */}
      <Header onStartProject={() => handleOpenModal()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onStartProject={() => handleOpenModal()}
          onExploreServices={handleExploreServices}
        />

        {/* 2. Trust / Capability Statement */}
        <TrustStatement />

        {/* 3. Services Overview (6 Divisions) */}
        <ServicesOverview
          onSelectService={(serviceName) => handleOpenModal(serviceName)}
        />

        {/* 4. Digital Marketing Section */}
        <DigitalMarketingSection
          onGrowReach={() => handleOpenModal('Digital Marketing')}
        />

        {/* 5. AI Video & Creative Content */}
        <AIVideoCreativeSection
          onStartProject={() => handleOpenModal('AI Video & Creative')}
        />

        {/* 6. Design & Branding */}
        <DesignBrandingSection
          onStartProject={() => handleOpenModal('Branding & Design')}
        />

        {/* 7. App & Software Development */}
        <SoftwareDevelopmentSection
          onStartProject={() => handleOpenModal('Software Development')}
        />

        {/* 8. Automation & AI Systems (Key Highlight) */}
        <AutomationSection
          onStartProject={() => handleOpenModal('Automation')}
        />

        {/* 9. Blockchain & Web3 */}
        <BlockchainSection
          onStartProject={() => handleOpenModal('Blockchain / Web3')}
        />

        {/* 10. Why JL Technologies */}
        <WhyJLSection />

        {/* 11. Delivery Process */}
        <ProcessSection />

        {/* 12. Selected Work / Case Studies */}
        <CaseStudiesSection
          onStartProject={() => handleOpenModal()}
        />

        {/* 13. Industries We Can Support */}
        <IndustriesSection />

        {/* 14. Final Call to Action & Project Intake Form */}
        <ContactSection preselectedService={selectedService} />
      </main>

      {/* 15. Footer */}
      <Footer />

      {/* Interactive Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        preselectedService={selectedService}
      />
    </div>
  );
}
