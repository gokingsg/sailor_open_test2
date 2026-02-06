import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { TopHeader } from './components/TopHeader';
import { AboutSection } from './components/AboutSection';
import { RulesSection } from './components/RulesSection';
import { PrizesSection } from './components/PrizesSection';
import { RegistrationFlow } from './components/RegistrationFlow';
import { ContactSection } from './components/ContactSection';
import { MatchHistorySection } from './components/MatchHistorySection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { ScoreRegistrationSection } from './components/ScoreRegistrationSection';
import { TestEmptyStateSection } from './components/TestEmptyStateSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'history' | 'leaderboard' | 'registration' | 'test'>('home');

  const handleNavigate = (view: 'home' | 'history' | 'leaderboard' | 'registration' | 'test') => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />
      <MobileNav activeView={activeView} onNavigate={handleNavigate} />
      
      <div className="flex-1 lg:ml-[300px] xl:ml-[340px] relative min-h-screen flex flex-col pt-32 lg:pt-0">
        <TopHeader onNavigate={handleNavigate} />
        
        {activeView === 'home' ? (
          <div className="flex-1 flex flex-col">
            <AboutSection />
            <RulesSection />
            <PrizesSection />
            <RegistrationFlow />
            <ContactSection />
            <Footer />
          </div>
        ) : activeView === 'history' ? (
          <div className="flex-1 flex flex-col">
            <MatchHistorySection />
            <Footer />
          </div>
        ) : activeView === 'leaderboard' ? (
          <div className="flex-1 flex flex-col">
            <LeaderboardSection />
            <Footer />
          </div>
        ) : activeView === 'registration' ? (
           <div className="flex-1 flex flex-col">
            <ScoreRegistrationSection />
            <Footer />
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <TestEmptyStateSection />
            <Footer />
          </div>
        )}
      </div>

      {/* Background layer for mobile view aesthetics */}
      <div className="lg:hidden w-full h-screen fixed inset-0 z-[-1] bg-[#000080]" />
    </main>
  );
}