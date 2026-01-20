
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Zap, ShieldCheck, Handshake } from 'lucide-react';

// Simplified data type for RuleTable to ensure React nodes are handled correctly
const RuleTable = ({ title, data }: { title: string, data: { label: string, value: React.ReactNode }[] }) => (
  <div className="mb-12 w-full">
    <h4 className="text-xl font-black text-[#000080] mb-5 uppercase tracking-widest flex items-center gap-3">
      <span className="w-2 h-6 bg-[#4c8bf5] rounded-full"></span>
      {title}
    </h4>
    <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm bg-white">
      <table className="w-full text-left">
        <tbody className="divide-y divide-slate-100">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-8 py-5 font-bold text-[#000080] border-r border-slate-100 bg-slate-50/30 w-1/3 text-sm">
                {row.label}
              </td>
              <td className="px-8 py-5 text-slate-600 font-medium text-sm leading-relaxed">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Fix: Make children optional to resolve the "missing children" TS error during JSX validation
const SailorsEditionNote = ({ children }: { children?: React.ReactNode }) => (
  <div className="mt-3 p-4 bg-blue-50/50 border-l-4 border-[#4c8bf5] rounded-r-xl">
    <div className="flex items-center gap-2 mb-1 text-[#4c8bf5] font-black text-[10px] uppercase tracking-wider">
      <Zap size={14} />
      Sailor's Edition Rule
    </div>
    <div className="text-[#4c8bf5] text-sm font-bold italic leading-relaxed">
      {children}
    </div>
  </div>
);

export const RulesSection = () => {
  return (
    <section id="rules-section" className="relative min-h-screen px-6 lg:px-12 xl:px-24 py-20 lg:py-32 bg-slate-50">
      {/* Fix: casting Framer Motion props to any to avoid common library type mismatches */}
      <motion.div 
        {...({
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true }
        } as any)}
        className="max-w-screen-xl mx-auto"
      >
        <header className="mb-16">
          <h1 className="text-4xl lg:text-7xl font-black text-[#000080] mb-8 leading-tight">
            HOW WE PLAY
          </h1>
          <div className="max-w-4xl p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40">
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium">
              Tennis scoring can feel like a different language, but it’s easy once you get the rhythm! To keep things fun, fast-moving and less formal, we have adapted the traditional rules into <span className="text-[#4c8bf5] font-black">The Sailor’s Edition Rules.</span>
            </p>
          </div>
        </header>

        <section className="mb-24">
          <h2 className="text-2xl lg:text-4xl font-black text-[#000080] mb-12 uppercase tracking-tight">
            Traditional Match Rules (The Sailor's Cut)
          </h2>

          <RuleTable 
            title="1. Basic Scoring System"
            data={[
              { label: "Points", value: "Scored in a unique sequence: Love (0), 15, 30, 40. The next point wins the game." },
              { 
                label: "Deuce (40-40)", 
                value: (
                  <>
                    Traditional rule requires winning two consecutive points (Advantage/Game).
                    <SailorsEditionNote>
                      To win from a deuce we use "Sudden Death." The next point wins the game — no long deuce battles!
                    </SailorsEditionNote>
                  </>
                )
              },
              { label: "Sets", value: "A set is won by the first player to win six games with at least a two-game lead (e.g., 6–4). If tied at 5–5, it can be won 7–5." },
              { label: "Tiebreak", value: "Triggered if a set reaches 6–6. Points are counted 1, 2, 3, etc. First player to seven points with a two-point lead wins the set." },
              { 
                label: "Match", 
                value: (
                  <>
                    Matches are played as best-of-three sets (first player to win two sets wins).
                    <SailorsEditionNote>
                      The “Third Set Super Tie-breaker”: If the match goes to the third set tie-breaker, the first player who reaches the score of 10 wins the tie-breaker along with the match - no endless tie-breaker points!
                    </SailorsEditionNote>
                  </>
                )
              }
            ]}
          />

          <RuleTable 
            title="2. Serving Rules"
            data={[
              { label: "Starting Point", value: "Every point begins with a serve from behind the baseline." },
              { label: "Direction", value: "The serve must be hit diagonally into the opponent’s opposite service box." },
              { label: "Attempts", value: "A server gets two chances. Missing the first is a \"fault\"; missing the second is a \"double fault,\" and the receiver wins the point." },
              { label: "Let", value: "If a serve hits the net cord but lands in the correct box, it is a \"let\" and is replayed without penalty." },
              { label: "Foot Fault", value: "Stepping on or over the baseline before hitting the ball results in a fault." }
            ]}
          />

          <RuleTable 
            title="3. General Match Rules"
            data={[
              { label: "Alternating Service", value: "One player serves for an entire game, then the players switch roles for the next game." },
              { label: "Changing Ends", value: "Players switch sides of the court after the first, third, and every subsequent odd-numbered game." },
              { label: "In-Bounds", value: "Balls landing on the line are considered \"in\"." },
              { label: "Ball in Play", value: "A point continues (the \"rally\") until the ball bounces twice, hits the net, or lands out of bounds." }
            ]}
          />
        </section>

        <section className="mb-24">
          <div className="p-10 lg:p-16 bg-white rounded-[3rem] border border-slate-200 text-[#000080] shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4c8bf5]/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#4c8bf5]/10 transition-colors" />
            
            <h2 className="text-3xl lg:text-5xl font-black mb-10">
              Sailor Sportsmanship
            </h2>
            
            <p className="text-xl lg:text-2xl font-bold mb-12 text-[#4c8bf5]">
              We don’t have VAR or Hawkeye on these courts, but we do have the Sailor Sportsmanship.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: 1, text: "You call the lines on your side of the net." },
                { id: 2, text: "If a ball is 99% out but you aren't 100% sure, give the benefit of the doubt to your opponent. A fair game is a fun game." },
                { id: 3, text: "The Final Handshake: Win or lose, every match ends with a \"Good Game\" and a genuine handshake." }
              ].map(item => (
                <div key={item.id} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-[#4c8bf5]/20 hover:shadow-lg transition-all">
                  <div className="text-3xl font-black text-[#4c8bf5] mb-4">0{item.id}</div>
                  <p className="text-lg font-medium leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-2xl lg:text-4xl font-black text-[#000080] mb-12 uppercase tracking-tight">
            Sailor’s Open League Rules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              "Matches are self-umpired and should be conducted in the spirit of fair play.",
              "The winner receives 3 points, the loser receives 1 participation point.",
              "Players are responsible for booking their own courts and arranging the time & venue with their opponents.",
              "Each player is only allowed to play against the same opponent once in the league.",
              "Players are to submit their match results via the provided template after the match.",
              "At the end of the tournament period, the Top 4 players / doubles pairings per category per city will participate in the semi-finals."
            ].map((rule, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4c8bf5]/10 flex items-center justify-center text-[#4c8bf5] font-black text-xs">
                  {i + 1}
                </div>
                <p className="text-slate-600 font-bold text-sm leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4 items-start">
            <AlertCircle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
            <p className="text-amber-900 text-sm font-medium leading-relaxed italic">
              Players compete at their own risk, and it is the player's responsibility to ensure any courts used are safe for play. By entering you agree to all terms as outlined in the competition rules & regulations.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl lg:text-4xl font-black text-[#000080] mb-12 uppercase tracking-tight">
            FAQs
          </h2>

          <RuleTable 
            title="Match Completion"
            data={[
              { label: "Incomplete/Retirements", value: "The winner gets 3 points, and the loser gets 1 participation point" }
            ]}
          />

          <RuleTable 
            title="Walkovers & Withdrawals"
            data={[
              { label: "Scoring Rule", value: "The winner gets 3 points, and the loser gets 0 points" },
              { label: "Claiming Rule", value: "Walkovers can only be claimed when the match is confirmed and cancelled within 24 hours of the start time." }
            ]}
          />
        </section>
      </motion.div>
    </section>
  );
};
