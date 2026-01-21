
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Zap, 
  BookOpen, 
  Handshake, 
  Target, 
  Clock, 
  Calendar, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const JourneyStage = ({ number, title, subtitle, items }: { number: number, title: string, subtitle?: string, items: React.ReactNode[] }) => (
  <div className="relative pl-12 pb-16 last:pb-0 border-l-2 border-slate-100 last:border-0">
    <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-[#000080] flex items-center justify-center text-white font-black text-sm z-10 shadow-lg shadow-[#000080]/20">
      {number}
    </div>
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-black text-[#000080] mb-2 uppercase">{title}</h3>
      {subtitle && <p className="text-[#4c8bf5] font-bold text-sm mb-6">{subtitle}</p>}
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 text-slate-600">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4c8bf5] flex-shrink-0" />
            <div className="text-sm font-medium leading-relaxed">{item}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ScoringTable = () => (
  <div className="overflow-x-auto rounded-[2rem] border border-slate-200 shadow-xl bg-white mb-12">
    <table className="w-full text-left border-collapse min-w-[800px]">
      <thead>
        <tr className="bg-[#000080] text-white">
          <th className="px-8 py-6 font-black uppercase tracking-widest text-xs border-r border-white/10">Feature</th>
          <th className="px-8 py-6 font-black uppercase tracking-widest text-xs border-r border-white/10 bg-[#000080]/90">Traditional Tennis</th>
          <th className="px-8 py-6 font-black uppercase tracking-widest text-xs border-r border-white/10 bg-[#4c8bf5]">Sailors Fast6 Tennis</th>
          <th className="px-8 py-6 font-black uppercase tracking-widest text-xs bg-[#4c8bf5]/80">Sailors Fast10 Tennis</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {[
          { feature: "Set Winner", traditional: "First to 6 games (must lead by 2)", fast6: "First to 6 games (must lead by 2)", fast10: "First to 10 games (must lead by 2)" },
          { feature: "Deuce", traditional: "Advantage / Deuce cycle", fast6: "Sudden Death: Next point wins the game. Receiver to choose the side (left or right)", fast10: "Sudden Death: Next point wins the game. Receiver to choose the side (left or right)" },
          { feature: "Tie-breaker", traditional: "Trigger at 6-6 games each. First to 7 points by at least 2 points margin (e.g. 7-3, 8-6)", fast6: "Trigger at 6-6 games each. First to 7 points by at least 1 point margin (e.g. 7-3, 7-6)", fast10: "Trigger at 10-10 games each. First to 7 points by at least 1 point margin (e.g. 7-3, 7-6)" },
          { feature: "Serves", traditional: "2 serves per point", fast6: "1 serve per point", fast10: "1 serve per point" },
          { feature: "Typical Duration", traditional: "60–90 minutes", fast6: "40–50 minutes", fast10: "60–80 minutes" },
        ].map((row, idx) => (
          <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
            <td className="px-8 py-5 font-black text-[#000080] text-xs uppercase tracking-wider border-r border-slate-100 bg-slate-50/30">{row.feature}</td>
            <td className="px-8 py-5 text-slate-500 font-medium text-sm border-r border-slate-100">{row.traditional}</td>
            <td className="px-8 py-5 text-[#000080] font-bold text-sm border-r border-slate-100 bg-[#4c8bf5]/5">{row.fast6}</td>
            <td className="px-8 py-5 text-[#000080] font-bold text-sm bg-[#4c8bf5]/10">{row.fast10}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RuleCard = ({ title, items }: { title: string, items: { label: string, desc: string }[] }) => (
  <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
    <h4 className="text-lg font-black text-[#000080] mb-6 flex items-center gap-3">
      <div className="w-2 h-6 bg-[#4c8bf5] rounded-full" />
      {title}
    </h4>
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i}>
          <div className="text-[#000080] font-black text-sm mb-1 uppercase tracking-tighter">{item.label}</div>
          <div className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

export const RulesSection = () => {
  return (
    <section id="rules-section" className="relative px-6 lg:px-12 xl:px-24 py-20 lg:py-32 bg-slate-50">
      <motion.div 
        {...({
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true }
        } as any)}
        className="max-w-screen-xl mx-auto"
      >
        <header className="mb-24">
          <h1 className="text-3xl lg:text-7xl font-black text-[#000080] mb-8 leading-tight">
            HOW WE PLAY
          </h1>
          <div className="max-w-4xl p-8 lg:p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4c8bf5]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-[#4c8bf5]/10 transition-colors" />
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium">
              Welcome to the Road to Finals! This competition is designed to be fun, fast-paced, and
              inclusive for all employees. Whether you are a seasoned player or a beginner, this guide will
              help you navigate through everything you need to know, from the basic rules and your first local
              match, all the way to the Global Championship Finals.
            </p>
          </div>
        </header>

        {/* 1. The Tournament Journey */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-[#000080] text-white rounded-2xl shadow-lg">
              <Trophy size={28} />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-[#000080] uppercase">The Tournament Journey</h2>
          </div>

          <div className="max-w-4xl ml-4">
            <JourneyStage 
              number={1} 
              title="Stage 1: City Qualifiers League" 
              subtitle="The Casual Start"
              items={[
                <span key="1a"><strong>Stage 1A (Casual League):</strong> A self-organized league where you match up with colleagues in your city. Win = 3 points; Loss = 1 participation point; Walkover = 3 points for winner.</span>,
                <span key="1b"><strong>Stage 1B (Play-offs):</strong> The top 32 players (based on league points and skill ranking) advance to a play-off matched randomly by your market's local committee.</span>
              ]} 
            />
            <JourneyStage 
              number={2} 
              title="Stage 2: City Finals" 
              items={[
                "The final 16 players in each city compete in a standard 4 rounds elimination tournament (R16, Quarter-finals, Semi-finals, Grand Finals) to crown the City Champion."
              ]} 
            />
            <JourneyStage 
              number={3} 
              title="Stage 3: Market Finals" 
              items={[
                "Top players from cities across the nation compete in another 16-player elimination bracket for the Market Champion."
              ]} 
            />
            <JourneyStage 
              number={4} 
              title="Stage 4: Global Finals" 
              subtitle="Singapore"
              items={[
                "The ultimate stage! Top players from across Asia, Brazil, and beyond meet in Singapore to compete for the Sailors World Championship."
              ]} 
            />
          </div>
        </div>

        {/* 2. Scoring Systems */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-[#4c8bf5] text-white rounded-2xl shadow-lg">
              <Zap size={28} />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-[#000080] uppercase">The "Sailors" Scoring Systems</h2>
          </div>
          
          <p className="text-slate-500 font-bold mb-8 flex items-center gap-2">
            <AlertCircle size={18} className="text-[#4c8bf5]" />
            To keep games exciting and predictable, we use two modified scoring formats.
          </p>

          <ScoringTable />

          <div className="p-8 bg-blue-50/60 rounded-[2.5rem] border border-blue-100 text-[#000080] shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="p-5 bg-white rounded-2xl flex-shrink-0 shadow-sm">
               <Calendar size={32} className="text-[#4c8bf5]" />
            </div>
            <div className="space-y-4">
              <p className="text-sm lg:text-base font-bold leading-relaxed">
                <span className="text-[#4c8bf5] font-black uppercase tracking-wider mr-2">Note:</span> 
                For the City Finals - Grand Final match, the Market Finals - Grand Final match and Global Finals - Grand Final match, <strong>Sailors Fast10 scoring (Best of 1 set)</strong> will be used.
              </p>
              <p className="text-sm lg:text-base font-bold leading-relaxed">
                For all other matches, <strong>Sailors Fast6 scoring (Best of 1 set)</strong> will be used.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Traditional Rules Recap */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-white border border-slate-200 text-[#000080] rounded-2xl shadow-md">
              <BookOpen size={28} />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-[#000080] uppercase whitespace-pre-line">Tennis Traditional Rules{"\n"}(A Recap for Beginners)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RuleCard 
              title="1. The Scoring System"
              items={[
                { label: "Points", desc: "Love = 0; 15 = 1 point; 30 = 2 points; 40 = 3 points; Game = The next point won after 40." },
                { label: "Deuce", desc: "If the score reaches 40-40, it is called a Deuce." },
                { label: "Winning", desc: "Sets: First to win 6 games with at least a 2-game lead. Matches: Usually best-of-three sets." }
              ]}
            />
            <RuleCard 
              title="2. Serving Rules"
              items={[
                { label: "The Start", desc: "Every point begins with a serve from behind the baseline." },
                { label: "The Let", desc: "If the ball hits the net cord but lands in the correct service box, the serve is replayed." },
                { label: "Foot Fault", desc: "Careful not to step on or over the baseline before you hit the ball." }
              ]}
            />
            <RuleCard 
              title="3. Match Rules"
              items={[
                { label: "Alternating", desc: "One player serves for an entire game, then roles switch for the next game." },
                { label: "Ends", desc: "Switch sides of the court after the 1st, 3rd, and every subsequent odd-numbered game." },
                { label: "Lines are IN", desc: "If the ball touches any part of the boundary line, it is considered IN." }
              ]}
            />
          </div>
        </div>

        {/* 4. Sailor Code of Sportsmanship */}
        <div className="relative group p-12 lg:p-20 bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4c8bf5]/5 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-[#4c8bf5]/10 transition-colors" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <Handshake size={64} className="text-[#4c8bf5] mb-8" />
            <h2 className="text-3xl lg:text-6xl font-black text-[#000080] mb-6 uppercase">The Sailor Code of Sportsmanship</h2>
            <p className="text-lg lg:text-xl text-slate-500 font-medium mb-16 max-w-2xl">
              Since we don't have professional umpires or Hawkeye technology at every court, we rely on the <span className="text-[#4c8bf5] font-black italic">Sailor Spirit</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
              {[
                { title: "You Call the Lines", desc: "You are responsible for calling lines on your side of the net." },
                { title: "Benefit of the Doubt", desc: "If you aren't 100% sure a ball was out, it is considered IN. A fair game is a fun game." },
                { title: "The Final Handshake", desc: "Win or lose, every match ends with a \"Good Game\" and a genuine handshake." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#000080] text-white flex items-center justify-center font-black text-xl mb-6 shadow-lg">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-black text-[#000080] mb-4 uppercase">{item.title}</h4>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-[#000080] font-black text-2xl lg:text-3xl uppercase tracking-tighter">
            See you on the court!
          </p>
        </div>
      </motion.div>
    </section>
  );
};
