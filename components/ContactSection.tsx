
import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_DATA } from '../constants';

export const ContactSection = () => {
  return (
    <section id="contact-section" className="relative py-16 lg:py-24 px-6 lg:px-12 xl:px-24 bg-slate-50">
      {/* Fixed Framer Motion type error by casting props to any */}
      <motion.div 
        {...({
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true }
        } as any)}
        className="w-full mx-auto"
      >
        <div className="space-y-4 mb-12">
          <h1 className="text-3xl lg:text-5xl font-black text-[#000080] leading-tight text-left">
            Have more queries about Sailors Open?
          </h1>
          <p className="text-xl font-black text-[#000080]">Please check out the Rules / FAQ page.</p>
          <p className="text-lg font-bold text-slate-600">You may contact the following for Sailors Open related enquiries:</p>
        </div>

        <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#d3e3f6]">
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">Market</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">City (Match Location)</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider">Local Committee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {CONTACT_DATA.map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-[#000080] border-r border-slate-50">{entry.market}</td>
                  <td className="px-6 py-5 text-slate-600 border-r border-slate-50 whitespace-pre-line">{entry.city}</td>
                  <td className="px-6 py-5 text-slate-600">
                    {entry.committee.map((pic, i) => <div key={i} className="mb-1 last:mb-0">{pic}</div>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 p-8 bg-white/50 rounded-3xl border border-slate-100 text-center max-w-screen-lg mx-auto">
          <p className="text-lg font-black text-[#000080]">
            For feedback on the website, please contact <a href="mailto:sailorstennis@sea.com" className="text-[#4c8bf5] hover:underline">sailorstennis@sea.com</a>
          </p>
        </div>
      </motion.div>
    </section>
  );
};