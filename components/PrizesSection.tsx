
import React from 'react';
import { motion } from 'framer-motion';
import { Info, Sparkles, Globe2, MapPin } from 'lucide-react';
import { GLOBAL_PRIZES } from '../constants';
import { PrizeEntry } from '../types';

const PrizeTable = ({ data, title, icon: Icon, headerColor = "bg-[#d3e3f6]" }: { data: PrizeEntry[], title: string, icon: any, headerColor?: string }) => (
  <div className="w-full">
    <h2 className="text-xl lg:text-3xl font-black text-[#000080] mb-6 text-left flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#4c8bf5]/10 flex items-center justify-center text-[#4c8bf5]">
        <Icon size={20} />
      </div>
      {title}
    </h2>
    
    <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 bg-white">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className={headerColor}>
            <th className="px-8 py-6 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 w-1/3">Position</th>
            <th className="px-8 py-6 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center w-1/3">Men's Singles</th>
            <th className="px-8 py-6 font-black text-[#000080] text-sm uppercase tracking-wider text-center w-1/3">Women's Singles</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((entry, idx) => (
            <tr key={idx} className="hover:bg-slate-50 transition-colors">
              <td className="px-8 py-6 font-black text-[#000080] border-r border-slate-50 bg-slate-50/30">{entry.position}</td>
              <td className="px-8 py-6 font-bold text-slate-600 border-r border-slate-50 text-center">{entry.mensSingles}</td>
              <td className="px-8 py-6 font-bold text-slate-600 text-center">{entry.womensSingles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

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
        <h1 className="text-3xl lg:text-7xl font-black text-[#000080] mb-12 leading-tight text-left">
          PRIZES
        </h1>

        <div className="flex flex-col gap-12">
          <PrizeTable 
            title="Global Finals" 
            data={GLOBAL_PRIZES} 
            icon={Globe2}
            headerColor="bg-[#d3e3f6]"
          />
          {/* Market Finals removed */}
        </div>
        
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
            <Info size={14} />
            <span>* Amounts indicated are in USD.</span>
          </div>
          <div className="flex items-center gap-2 text-[#4c8bf5] font-bold text-sm">
            <Sparkles size={14} />
            <span>Stay tuned for the announcement of attractive fun prizes.</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
