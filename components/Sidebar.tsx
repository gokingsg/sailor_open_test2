
import React from 'react';
import { Info, BookOpen, Gift, UserPlus, MessageSquare } from 'lucide-react';
import { ASSETS } from '../constants';

export const Sidebar = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
      <div className="relative z-10 mb-16 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
        {/* Leaderboard button hidden */}
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
      </nav>
    </div>
  );
};
