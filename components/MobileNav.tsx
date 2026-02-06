
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Info, BookOpen, Gift, UserPlus, MessageSquare, ClipboardList, Trophy } from 'lucide-react';
import { ASSETS } from '../constants';

interface MobileNavProps {
  activeView: 'home' | 'history' | 'leaderboard';
  onNavigate: (view: 'home' | 'history' | 'leaderboard') => void;
}

export const MobileNav = ({ activeView, onNavigate }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], ["8rem", "4rem"]);
  const logoSize = useTransform(scrollY, [0, 100], ["8rem", "4rem"]);
  const logoY = useTransform(scrollY, [0, 100], ["1rem", "0rem"]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (activeView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (view: 'home' | 'history' | 'leaderboard') => {
    setIsOpen(false);
    onNavigate(view);
  };

  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-[100]">
      {/* Fixed Framer Motion type error by casting style to any */}
      <motion.div 
        style={{ height: headerHeight } as any}
        className="relative flex items-center justify-center bg-[#000080] text-white shadow-lg px-6 overflow-visible"
      >
        {/* Fixed Framer Motion type error by casting style to any including transform property 'y' */}
        <motion.div 
          style={{ width: logoSize, height: logoSize, y: logoY } as any}
          className="flex items-center justify-center cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
           <img src={ASSETS.logo} alt="Logo" className="w-full h-full object-contain" />
        </motion.div>
        
        <button onClick={() => setIsOpen(!isOpen)} className="absolute right-6 p-2 z-[110]">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          // Fixed Framer Motion type error by casting animation props to any
          <motion.div 
            {...({
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 }
            } as any)}
            className="bg-[#000080] p-8 text-white flex flex-col gap-8 shadow-2xl absolute top-full left-0 w-full z-[105]"
          >
            <button onClick={() => scrollTo('about-section')} className="text-2xl font-bold flex items-center gap-4">
              <Info className="text-[#4c8bf5]" /> About
            </button>
            <button onClick={() => scrollTo('rules-section')} className="text-2xl font-bold flex items-center gap-4">
              <BookOpen className="text-[#4c8bf5]" /> How We Play
            </button>
            <button onClick={() => scrollTo('prizes-section')} className="text-2xl font-bold flex items-center gap-4">
              <Gift className="text-[#4c8bf5]" /> Prizes
            </button>
            <button onClick={() => scrollTo('registration-flow')} className="text-2xl font-bold flex items-center gap-4">
              <UserPlus className="text-[#4c8bf5]" /> Register
            </button>
            <button onClick={() => scrollTo('contact-section')} className="text-2xl font-bold flex items-center gap-4">
              <MessageSquare className="text-[#4c8bf5]" /> Contact
            </button>

            <div className="w-full h-px bg-white/10"></div>

            <button onClick={() => handleNavClick('history')} className={`text-2xl font-bold flex items-center gap-4 ${activeView === 'history' ? 'text-[#4c8bf5]' : ''}`}>
              <ClipboardList className="text-[#4c8bf5]" /> Personal Records
            </button>

            <button onClick={() => handleNavClick('leaderboard')} className={`text-2xl font-bold flex items-center gap-4 ${activeView === 'leaderboard' ? 'text-[#4c8bf5]' : ''}`}>
              <Trophy className="text-[#4c8bf5]" /> Leaderboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
