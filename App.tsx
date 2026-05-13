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
import { DrawSection } from './components/DrawSection';
import { AppView } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleNavigate = (view: AppView) => {
    setActiveView(view);
    
    // Auto-collapse logic for data-heavy views
    if (view === 'draw' || view === 'history' || view === 'leaderboard' || view === 'registration') {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
    }

    // If navigating to history explicitly via menu, clear selected player (show own history)
    // If navigating to other pages, clear it as well.
    // The only time we keep it is if we are navigating FROM leaderboard TO history via click
    if (view !== 'history') {
      setSelectedPlayer(null);
    } else {
      // Navigating to history via menu button -> clear selected player to show "My History"
      // Note: If this function is called from Leaderboard click, we handle that separately below
      setSelectedPlayer(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayerClick = (playerName: string) => {
    setSelectedPlayer(playerName);
    setActiveView('history');
    setIsSidebarCollapsed(true); // Ensure collapsed when drilling down
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      <Sidebar 
        activeView={activeView} 
        onNavigate={handleNavigate} 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <MobileNav activeView={activeView} onNavigate={handleNavigate} />
      
      <div className={`flex-1 relative min-h-screen flex flex-col pt-32 lg:pt-0 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-[100px]' : 'lg:ml-[300px] xl:ml-[340px]'
      }`}>
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
        ) : activeView === 'draw' ? (
          <div className="flex-1 flex flex-col">
            <DrawSection />
            <Footer />
          </div>
        ) : activeView === 'history' ? (
          <div className="flex-1 flex flex-col">
            <MatchHistorySection 
              filterPlayer={selectedPlayer} 
              onBack={() => {
                setActiveView('leaderboard');
                setSelectedPlayer(null);
              }}
            />
            <Footer />
          </div>
        ) : activeView === 'leaderboard' ? (
          <div className="flex-1 flex flex-col">
            <LeaderboardSection onPlayerClick={handlePlayerClick} />
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
