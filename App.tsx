
import React from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { TopHeader } from './components/TopHeader';
import { AboutSection } from './components/AboutSection';
import { RulesSection } from './components/RulesSection';
import { PrizesSection } from './components/PrizesSection';
import { RegistrationFlow } from './components/RegistrationFlow';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      <Sidebar />
      <MobileNav />
      
      <div className="flex-1 lg:ml-[300px] xl:ml-[340px] relative min-h-screen flex flex-col pt-32 lg:pt-0">
        <TopHeader />
        <div className="flex-1 flex flex-col">
          <AboutSection />
          <RulesSection />
          {/* LeaderboardSection hidden as requested */}
          <PrizesSection />
          <RegistrationFlow />
          <ContactSection />
          <Footer />
        </div>
      </div>

      {/* Background layer for mobile view aesthetics */}
      <div className="lg:hidden w-full h-screen fixed inset-0 z-[-1] bg-[#000080]" />
    </main>
  );
}
