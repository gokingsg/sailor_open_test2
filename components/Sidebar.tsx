import React from 'react';
import { Info, BookOpen, Gift, UserPlus, MessageSquare, ClipboardList, Trophy, FileText, FlaskConical } from 'lucide-react';
import { ASSETS } from '../constants';

interface SidebarProps {
  activeView: 'home' | 'history' | 'leaderboard' | 'registration' | 'test';
  onNavigate: (view: 'home' | 'history' | 'leaderboard' | 'registration' | 'test') => void;
}

export const Sidebar = ({ activeView, onNavigate }: SidebarProps) => {
  const scrollTo = (id: string) => {
    if (activeView !== 'home') {
      onNavigate('home');
      // Give time for render
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="hidden lg:flex flex-col w-[300px] xl:w-[340px] h-screen fixed left-0 top-0 bg-[#000080] p-10 text-white z-[100] overflow-hidden shadow-2xl"
      style={{
        backgroundImage: `url(${ASSETS.sidebarPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10 mb-16 cursor-pointer" onClick={() => onNavigate('home')}>
        <img 
          src={ASSETS.logo} 
          alt="Sailors Open 2026" 
          className="w-full h-auto object-contain block"
        />
      </div>

      <nav className="relative z-10 flex flex-col gap-8">
        <button 
          onClick={() => scrollTo('about-section')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors">
            <Info size={18} className="text-[#4c8bf5]" />
          </span>
          About
        </button>
        <button 
          onClick={() => scrollTo('rules-section')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors">
            <BookOpen size={18} className="text-[#4c8bf5]" />
          </span>
          How We Play
        </button>
        <button 
          onClick={() => scrollTo('prizes-section')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors">
            <Gift size={18} className="text-[#4c8bf5]" />
          </span>
          Prizes
        </button>
        <button 
          onClick={() => scrollTo('registration-flow')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors">
            <UserPlus size={18} className="text-[#4c8bf5]" />
          </span>
          Register
        </button>
        <button 
          onClick={() => scrollTo('contact-section')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors">
            <MessageSquare size={18} className="text-[#4c8bf5]" />
          </span>
          Contact
        </button>
        
        <div className="w-full h-px bg-white/10 my-2"></div>
        
        <button 
          onClick={() => onNavigate('history')}
          className={`group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2 ${activeView === 'history' ? 'text-[#4c8bf5]' : 'text-white'}`}
        >
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeView === 'history' ? 'bg-[#4c8bf5] text-white' : 'bg-[#4c8bf5]/20 text-[#4c8bf5] group-hover:bg-[#4c8bf5]/40'}`}>
            <ClipboardList size={18} />
          </span>
          Personal Records
        </button>

        <button 
          onClick={() => onNavigate('leaderboard')}
          className={`group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2 ${activeView === 'leaderboard' ? 'text-[#4c8bf5]' : 'text-white'}`}
        >
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeView === 'leaderboard' ? 'bg-[#4c8bf5] text-white' : 'bg-[#4c8bf5]/20 text-[#4c8bf5] group-hover:bg-[#4c8bf5]/40'}`}>
            <Trophy size={18} />
          </span>
          Leaderboard
        </button>

        <button 
          onClick={() => onNavigate('registration')}
          className={`group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2 ${activeView === 'registration' ? 'text-[#4c8bf5]' : 'text-white'}`}
        >
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeView === 'registration' ? 'bg-[#4c8bf5] text-white' : 'bg-[#4c8bf5]/20 text-[#4c8bf5] group-hover:bg-[#4c8bf5]/40'}`}>
            <FileText size={18} />
          </span>
          Score Registration
        </button>

         <button 
          onClick={() => onNavigate('test')}
          className={`group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2 ${activeView === 'test' ? 'text-[#4c8bf5]' : 'text-white'}`}
        >
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeView === 'test' ? 'bg-[#4c8bf5] text-white' : 'bg-[#4c8bf5]/20 text-[#4c8bf5] group-hover:bg-[#4c8bf5]/40'}`}>
            <FlaskConical size={18} />
          </span>
          Test Page
        </button>
      </nav>
    </div>
  );
};