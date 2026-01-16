
import React from 'react';
import { motion } from 'framer-motion';
import { Info, Sparkles } from 'lucide-react';
import { PRIZES_DATA } from '../constants';

export const PrizesSection = () => {
  return (
    <section id="prizes-section" className="relative py-16 lg:py-24 px-6 lg:px-12 xl:px-24 bg-slate-50">
      {/* Fixed Framer Motion type error by casting props to any */}
      <motion.div 
        {...({
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true }
        } as any)}
        className="w-full mx-auto"
      >
        <h1 className="text-3xl lg:text-7xl font-black text-[#000080] mb-4 leading-tight text-left">
          PRIZES
        </h1>
        <h2 className="text-xl lg:text-3xl font-black text-[#000080] mb-8 lg:mb-12 text-left opacity-90">
          City Level
        </h2>
        
        <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 bg-white">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#d3e3f6]">
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">Position</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Men's Singles</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Men's Doubles</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Women's Singles</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider text-center">Women's Doubles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PRIZES_DATA.map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-[#000080] border-r border-slate-50">{entry.position}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.mensSingles}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.mensDoubles}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.womensSingles}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 text-center">{entry.womensDoubles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
            <Info size={14} />
            <span>* Prize amounts are in USD</span>
          </div>
          <div className="flex items-center gap-2 text-[#4c8bf5] font-bold text-sm">
            <Sparkles size={14} />
            <span>Stay tuned for the announcement of attractive fun prizes i.e. Best Dressed Award</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
