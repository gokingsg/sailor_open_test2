import React from 'react';
import { Info, BookOpen, Gift, UserPlus, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSETS } from '../constants';
import { AppView } from '../types';

interface SidebarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ activeView, onNavigate, isCollapsed, onToggle }: SidebarProps) => {
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
      className={`hidden lg:flex flex-col h-screen fixed left-0 top-0 bg-[#000080] text-white z-[100] overflow-hidden shadow-2xl transition-all duration-300 ${
        isCollapsed ? 'w-[100px] p-4' : 'w-[300px] xl:w-[340px] p-10'
      }`}
      style={{
        backgroundImage: `url(${ASSETS.sidebarPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <button 
        onClick={onToggle}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 text-white"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div 
        className={`relative z-10 mb-16 cursor-pointer transition-all duration-300 ${isCollapsed ? 'mt-12 scale-75' : ''}`} 
        onClick={() => onNavigate('home')}
      >
        <img 
          src={ASSETS.logo} 
          alt="Sailors Open 2026" 
          className="w-full h-auto object-contain block"
        />
      </div>

      <nav className={`relative z-10 flex flex-col gap-8 ${isCollapsed ? 'items-center w-full' : ''}`}>
        <button 
          onClick={() => scrollTo('about-section')}
          className={`group flex items-center gap-3 text-xl font-bold transition-all hover:translate-x-2 ${isCollapsed ? 'justify-center w-full' : 'text-left'}`}
          title={isCollapsed ? "About" : ""}
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors shrink-0">
            <Info size={18} className="text-[#4c8bf5]" />
          </span>
          {!isCollapsed && <span>About</span>}
        </button>
        <button 
          onClick={() => scrollTo('rules-section')}
          className={`group flex items-center gap-3 text-xl font-bold transition-all hover:translate-x-2 ${isCollapsed ? 'justify-center w-full' : 'text-left'}`}
          title={isCollapsed ? "How We Play" : ""}
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors shrink-0">
            <BookOpen size={18} className="text-[#4c8bf5]" />
          </span>
          {!isCollapsed && <span>How We Play</span>}
        </button>
        <button 
          onClick={() => scrollTo('prizes-section')}
          className={`group flex items-center gap-3 text-xl font-bold transition-all hover:translate-x-2 ${isCollapsed ? 'justify-center w-full' : 'text-left'}`}
          title={isCollapsed ? "Prizes" : ""}
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors shrink-0">
            <Gift size={18} className="text-[#4c8bf5]" />
          </span>
          {!isCollapsed && <span>Prizes</span>}
        </button>
        <button 
          onClick={() => scrollTo('registration-flow')}
          className={`group flex items-center gap-3 text-xl font-bold transition-all hover:translate-x-2 ${isCollapsed ? 'justify-center w-full' : 'text-left'}`}
          title={isCollapsed ? "Register" : ""}
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors shrink-0">
            <UserPlus size={18} className="text-[#4c8bf5]" />
          </span>
          {!isCollapsed && <span>Register</span>}
        </button>
        <button 
          onClick={() => scrollTo('contact-section')}
          className={`group flex items-center gap-3 text-xl font-bold transition-all hover:translate-x-2 ${isCollapsed ? 'justify-center w-full' : 'text-left'}`}
          title={isCollapsed ? "Contact" : ""}
        >
          <span className="w-8 h-8 rounded-lg bg-[#4c8bf5]/20 flex items-center justify-center group-hover:bg-[#4c8bf5]/40 transition-colors shrink-0">
            <MessageSquare size={18} className="text-[#4c8bf5]" />
          </span>
          {!isCollapsed && <span>Contact</span>}
        </button>
      </nav>
    </div>
  );
};
