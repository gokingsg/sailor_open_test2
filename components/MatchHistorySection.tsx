import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, MapPin, XCircle } from 'lucide-react';
import { MATCH_HISTORY_DATA } from '../constants';
import { MatchRecord, MatchPlayer } from '../types';

const CURRENT_USER = "Arran Kenna";

interface MatchCardProps {
  match: MatchRecord;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const renderPlayer = (player: MatchPlayer) => {
    const isMe = player.name === CURRENT_USER;
    const isWinner = player.isWinner;

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white ${
            isMe ? 'bg-[#4c8bf5]' : 'bg-slate-300'
          }`}>
            {player.name.charAt(0)}
          </div>
          <span className={`font-bold text-sm ${
            isMe ? 'text-[#000080]' : 'text-slate-500'
          }`}>
            {player.name} {isMe && <span className="text-[#4c8bf5] text-xs opacity-70">(You)</span>}
          </span>
          {isWinner && <CheckCircle size={16} className="text-green-500" />}
          {!isWinner && isMe && <XCircle size={16} className="text-red-500" />}
        </div>
        <div className="flex gap-2">
          {player.scores.map((s, i) => (
            <span key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
               isMe ? 'bg-slate-100 text-[#000080]' : 'bg-slate-50 text-slate-500'
            }`}>
              {s}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
      {/* Card Header */}
      <div className="bg-[#4c8bf5]/10 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-[#4c8bf5]/10">
        <div>
          <h3 className="font-black text-[#000080] text-sm">{match.leagueName}</h3>
          <p className="text-[#000080]/60 text-xs font-bold mt-1 flex items-center gap-1">
            <MapPin size={12} />
            {match.market}, {match.city}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#000080] text-xs font-bold">{match.season}</p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
          <Calendar size={14} className="text-[#4c8bf5]" />
          {match.date} &bull; {match.time}
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          match.status === 'Completed' ? 'bg-green-100 text-green-700' : 
          match.status === 'Walkover' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
        }`}>
          {match.status}
        </div>
      </div>

      {/* Players & Scores */}
      <div className="px-6 py-4 space-y-4">
        {renderPlayer(match.player1)}
        {renderPlayer(match.player2)}
      </div>
    </div>
  );
};

export const MatchHistorySection = () => {
  return (
    <section className="relative px-6 lg:px-12 xl:px-24 py-12 lg:py-20 bg-slate-50 min-h-screen">
       {/* Fixed Framer Motion type error by casting props to any */}
      <motion.div 
        {...({
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        } as any)}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-10">
          <h1 className="text-3xl lg:text-5xl font-black text-[#000080] mb-4">MATCH HISTORY</h1>
          <p className="text-slate-500 font-medium">View your past matches, results, and performance stats.</p>
        </div>

        <div className="space-y-6">
          {MATCH_HISTORY_DATA.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">End of Record</p>
        </div>
      </motion.div>
    </section>
  );
};