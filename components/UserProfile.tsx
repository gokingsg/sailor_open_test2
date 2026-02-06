import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ClipboardList, Trophy, FileText, FlaskConical } from 'lucide-react';

interface UserProfileProps {
  onNavigate: (view: 'home' | 'history' | 'leaderboard' | 'registration' | 'test') => void;
  align?: 'left' | 'right';
}

export const UserProfile = ({ onNavigate, align = 'right' }: UserProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: 'history' | 'leaderboard' | 'registration' | 'test') => {
    setIsOpen(false);
    onNavigate(view);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 lg:w-12 lg:h-12 bg-[#4c8bf5] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 overflow-hidden font-black text-lg"
      >
        A
      </button>

      <AnimatePresence>
        {isOpen && (
          // Fixed Framer Motion type error by casting props to any
          <motion.div 
            {...({
              initial: { opacity: 0, y: 10, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 10, scale: 0.95 }
            } as any)}
            className={`absolute ${align === 'left' ? 'left-0' : 'right-0'} mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100]`}
          >
            <div className="p-6 border-b border-slate-50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#4c8bf5] flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-[#000080] truncate">Amax</p>
                  <p className="text-xs text-slate-400 truncate">amax@sea.com</p>
                </div>
              </div>
              <div className="py-2 px-3 bg-slate-50 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Logged In</span>
              </div>
            </div>
            
            <div className="p-2 space-y-1">
              <button 
                onClick={() => handleNavClick('history')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-[#000080] rounded-xl transition-colors font-bold text-sm"
              >
                <ClipboardList size={18} className="text-[#4c8bf5]" />
                Match History
              </button>
              
              <button 
                onClick={() => handleNavClick('leaderboard')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-[#000080] rounded-xl transition-colors font-bold text-sm"
              >
                <Trophy size={18} className="text-[#4c8bf5]" />
                Leaderboard
              </button>

               <button 
                onClick={() => handleNavClick('registration')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-[#000080] rounded-xl transition-colors font-bold text-sm"
              >
                <FileText size={18} className="text-[#4c8bf5]" />
                Score Registration
              </button>

              <button 
                onClick={() => handleNavClick('test')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-[#000080] rounded-xl transition-colors font-bold text-sm"
              >
                <FlaskConical size={18} className="text-[#4c8bf5]" />
                Test Page
              </button>

              <button 
                onClick={() => alert('Mock Logout: You would be redirected.')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-500 rounded-xl transition-colors font-bold text-sm"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};