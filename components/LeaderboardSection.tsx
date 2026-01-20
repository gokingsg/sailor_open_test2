
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, HelpCircle, ChevronDown, Filter } from 'lucide-react';
import { LEADERBOARD_DATA, LOCATIONS } from '../constants';

const CATEGORIES_LEADERBOARD = ["Mens", "Womens"];

export const LeaderboardSection = () => {
  const [selectedMarket, setSelectedMarket] = useState('Singapore');
  const [selectedCity, setSelectedCity] = useState('Singapore');
  const [selectedCategory, setSelectedCategory] = useState('Mens');

  // Update city when market changes
  useEffect(() => {
    if (LOCATIONS[selectedMarket]) {
      setSelectedCity(LOCATIONS[selectedMarket][0]);
    }
  }, [selectedMarket]);

  return (
    <section id="leaderboard-section" className="relative py-16 lg:py-24 px-6 lg:px-12 xl:px-24 bg-white">
      {/* Fixed Framer Motion type error by casting props to any */}
      <motion.div 
        {...({
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true }
        } as any)}
        className="w-full mx-auto"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-3xl lg:text-7xl font-black text-[#000080] leading-tight text-left mb-2">
              LEADERBOARD
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <Filter size={14} className="text-[#4c8bf5]" />
              Filter by region & category
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            {/* Market Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#000080] uppercase tracking-wider ml-1">Market</label>
              <div className="relative">
                <select 
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  className="w-full lg:w-48 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none font-bold text-[#000080] text-sm cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  {Object.keys(LOCATIONS).sort().map(market => (
                    <option key={market} value={market}>{market}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4c8bf5] pointer-events-none" size={16} />
              </div>
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#000080] uppercase tracking-wider ml-1">City</label>
              <div className="relative">
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full lg:w-48 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none font-bold text-[#000080] text-sm cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  {LOCATIONS[selectedMarket]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4c8bf5] pointer-events-none" size={16} />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#000080] uppercase tracking-wider ml-1">Category</label>
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full lg:w-48 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none font-bold text-[#000080] text-sm cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  {CATEGORIES_LEADERBOARD.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4c8bf5] pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="px-4 py-1 bg-[#000080] text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                {selectedMarket}
             </div>
             <div className="px-4 py-1 bg-[#4c8bf5] text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                {selectedCity}
             </div>
             <div className="px-4 py-1 bg-slate-200 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {selectedCategory}
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#d3e3f6]">
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">Rank</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">Player Name</th>
                <th className="px-10 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center bg-[#c5daf3]">P</th>
                <th className="px-10 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center bg-[#b8d2f0]">W</th>
                <th className="px-10 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center bg-[#abc9ec]">L</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Sets W</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Sets L</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Games W</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Games L</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Games % Won</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider text-center">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LEADERBOARD_DATA.map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5 font-bold text-[#000080] border-r border-slate-50 text-center">{entry.rank}</td>
                  <td className="px-6 py-5 font-bold text-[#000080] border-r border-slate-50">{entry.name}</td>
                  <td className="px-10 py-5 font-black text-[#000080] border-r border-slate-50 text-center bg-slate-50/40">{entry.played}</td>
                  <td className="px-10 py-5 font-black text-[#000080] border-r border-slate-50 text-center bg-slate-50/60">{entry.won}</td>
                  <td className="px-10 py-5 font-black text-[#000080] border-r border-slate-50 text-center bg-slate-50/80">{entry.lost}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.setsW}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.setsL}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.gamesW}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.gamesL}</td>
                  <td className="px-6 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.gamesPct}</td>
                  <td className="px-6 py-5 font-black text-[#000080] text-center">{entry.points}</td>
                </tr>
              ))}
              {LEADERBOARD_DATA.length === 0 && (
                <tr>
                   <td colSpan={11} className="px-6 py-12 text-center text-slate-400 font-bold italic">
                      No match results recorded yet for this selection.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 max-w-2xl">
          <h3 className="text-[#000080] font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
            <HelpCircle size={18} className="text-[#4c8bf5]" />
            Table Glossary
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <li className="flex gap-2 text-sm">
              <span className="font-black text-[#000080] min-w-[80px]">P:</span>
              <span className="text-slate-500 font-medium">Matches Played.</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="font-black text-[#000080] min-w-[80px]">W/L:</span>
              <span className="text-slate-500 font-medium">Matches Won and Lost.</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="font-black text-[#000080] min-w-[80px]">Sets W/L:</span>
              <span className="text-slate-500 font-medium">Sets Won and Lost for the season.</span>
            </li>
            <li className="flex gap-2 text-sm">
              <span className="font-black text-[#000080] min-w-[80px]">Games W/L:</span>
              <span className="text-slate-500 font-medium">Your total games Won and Lost.</span>
            </li>
            <li className="flex gap-2 text-sm md:col-span-2">
              <span className="font-black text-[#000080] min-w-[80px]">Games % Won:</span>
              <span className="text-slate-500 font-medium">Percentage of Games Won.</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-8 flex items-center gap-2 text-slate-400 font-medium text-sm">
          <Info size={14} />
          <span>Last updated: October 24, 2025</span>
        </div>
      </motion.div>
    </section>
  );
};
