
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smile, Users, Wind } from 'lucide-react';

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  
  const scrollToRegister = () => {
    const el = document.getElementById('registration-flow');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
    {
      overline: "Introduction",
      navLabel: "INTRODUCTION",
      title: "ABOUT SAILORS OPEN",
      content: "Welcome to the official homepage of the Sailors Open 2026—the inaugural tennis tournament where we trade our keyboards for rackets and our screens for the baseline!\n\nAt Sea, we believe that even the most dedicated crews should find time to drop anchor, recharge, and enjoy the breeze. The Sailors Open is more than just a tournament; it’s a vibrant celebration of our community and a chance to smash some aces with colleagues you’ve only ever met on a video call.",
      icon: null,
    },
    {
      navLabel: "WHY JOIN",
      title: "Why Join?",
      subtitle: "From Local Courts to Global Glory",
      content: "The Sailors Open is a celebration of tennis at every level. We are calling on all aspiring athletes to showcase their talent in this high-stakes battle for attractive prizes and the honour of being named the Inaugural Sailors Open Global Champion. We welcome you to come join us whether you are playing for the championship point or just for the breather from work.",
      icon: null,
    },
    {
      overline: "OUR CORE VALUES",
      navLabel: "VALUES",
      title: "Living Our Values",
      subtitle: "One Rally at a Time",
      content: "We’re bringing the Sea spirit to the playing courts. Here’s how our core values are guiding the tournament:",
      values: [
        { label: "We Serve (Aces)", desc: "This tournament is our way of serving the well-being of our greatest asset—you. By taking time away from serving our users to serving up “Aces” on the court, we hope that our Sailors can come back feeling refreshed and ready to make a difference at work.", icon: "🎾" },
        { label: "We Run (for Every Ball)", desc: "We are known for our speed of execution and sense of urgency. At the Sailors Open, “We Run” for every drop shot and chase every ball with that same relentless energy. It’s about moving our bodies and pushing our limits, all while having a blast.", icon: "🏃" },
        { label: "We Adapt (to Match Conditions)", desc: "The weather might shift, and the ballspin might be tricky, but Sailors find a way. Whether you’re learning a new stroke or playing with a new teammate, We Adapt to the game conditions, embracing every new challenge with a smile.", icon: "🔄" },
        { label: "We Commit (to the Final Match Point)", desc: "We play with integrity, honoring the rules and our opponents. When the scoreline is tight, we dig deep and finish what we started.", icon: "🤝" },
        { label: "We Stay Humble (Win or Lose)", desc: "Whether you win the match point or miss the ball entirely, We Stay Humble in victory and gracious in defeat. Everyone has something to learn from the experience. We celebrate the great shots, laugh off the misses, and always end with a high-five.", icon: "🌱" }
      ]
    },
    {
      overline: "EXPERIENCE",
      navLabel: "EXPERIENCE",
      title: "What to Expect",
      items: [
        { title: "Create Happy Moments", desc: "Music, refreshments, and enjoyment are the priority.", icon: <Smile size={24} className="text-[#4c8bf5]" /> },
        { title: "Forge New Connections", desc: "Partner up with someone from a different department and expand your crew.", icon: <Users size={24} className="text-[#4c8bf5]" /> },
        { title: "The Breather You Needed", desc: "Physical activity is the best way to clear the mind and boost creativity.", icon: <Wind size={24} className="text-[#4c8bf5]" /> }
      ]
    },
    {
      id: "ready-to-sail",
      navLabel: "JOIN",
      title: "Ready to Set Sail?",
      content: "The court is calling, and the energy is building. Don't worry about the scoreboard—just bring your energy, your team spirit, and your desire to have fun!",
      cta: true,
      slogan: "Sailors Open 2026: Work Hard, Play Harder, Stay Connected."
    }
  ];

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, offsetHeight } = containerRef.current;
      const index = Math.round(scrollTop / offsetHeight);
      setActiveIdx(index);
    }
  };

  const navigateTo = (idx: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: idx * containerRef.current.offsetHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about-section" className="relative lg:h-[calc(100vh-5rem)] overflow-hidden bg-white">
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {sections.map((section, idx) => (
          <div 
            key={idx}
            className="h-full w-full snap-start flex flex-col items-center justify-center px-6 lg:px-24 xl:px-32 py-20"
          >
            {/* Fixed Framer Motion type error by casting props to any */}
            <motion.div 
              {...({
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: false, amount: 0.5 },
                transition: { duration: 0.8, ease: "easeOut" }
              } as any)}
              className="max-w-6xl w-full"
            >
              {section.id === "ready-to-sail" ? (
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-16 px-10 bg-slate-50/40 rounded-[2.5rem] border border-slate-100/60 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#4c8bf5]/5 rounded-full -mr-24 -mt-24 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#000080]/5 rounded-full -ml-32 -mb-32 blur-3xl" />
                  
                  {/* Fixed Framer Motion type error by casting props to any */}
                  <motion.h2 
                    {...({
                      initial: { scale: 0.98, opacity: 0 },
                      whileInView: { scale: 1, opacity: 1 }
                    } as any)}
                    className="text-4xl lg:text-6xl font-black text-[#000080] leading-tight uppercase mb-6 tracking-tight"
                  >
                    {section.title}
                  </motion.h2>

                  <p className="text-base lg:text-xl text-slate-500 font-medium mb-12 max-w-xl leading-relaxed">
                    {section.content}
                  </p>

                  <div className="relative group mb-16">
                    <div className="absolute inset-0 bg-[#4c8bf5] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full" />
                    <button 
                      onClick={scrollToRegister}
                      className="relative flex items-center gap-3 px-12 py-5 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-2xl font-black text-lg lg:text-xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-wider"
                    >
                      Join the Tournament
                      <ArrowRight size={20} />
                    </button>
                  </div>

                  <div className="w-full max-w-lg">
                    <p className="text-[#000080] font-black text-xl lg:text-2xl tracking-tight leading-snug">
                      {section.slogan.split(': ').map((part, i) => (
                        <span key={i} className={i === 1 ? "block mt-1 text-[#4c8bf5] italic" : ""}>{part}</span>
                      ))}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-start">
                  <div className="lg:col-span-12">
                    {section.overline && (
                      <span className="inline-block text-[#4c8bf5] font-black text-xs tracking-[0.3em] uppercase mb-4 opacity-80">
                        {section.overline}
                      </span>
                    )}
                    <h2 className="text-3xl lg:text-5xl font-black text-[#000080] leading-tight uppercase mb-12 tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div className="lg:col-span-8">
                    {section.subtitle && (
                      <p className="text-lg lg:text-xl font-bold text-[#4c8bf5] mb-6 leading-relaxed flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-[#4c8bf5]/30"></span>
                        {section.subtitle}
                      </p>
                    )}

                    {section.content && (
                      <div className="text-base lg:text-lg text-slate-500 leading-relaxed font-medium mb-12 whitespace-pre-line max-w-2xl">
                        {section.content}
                      </div>
                    )}
                  </div>

                  {section.values && (
                    <div className="lg:col-span-12 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {section.values.map((v, i) => (
                          <div key={i} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-[#4c8bf5]/30 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                            <div className="text-2xl mb-4 grayscale group-hover:grayscale-0 transition-all">{v.icon}</div>
                            <h4 className="font-bold text-[#000080] text-sm mb-2 group-hover:text-[#4c8bf5] transition-colors">{v.label}</h4>
                            <p className="text-[12px] text-slate-400 font-medium leading-relaxed">{v.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.items && (
                    <div className="lg:col-span-12 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {section.items.map((item, i) => (
                          <div key={i} className="flex flex-col gap-5 p-8 bg-slate-50/40 rounded-3xl border border-slate-50 hover:bg-white transition-colors">
                            <div className="p-3 bg-white shadow-sm rounded-xl w-fit">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="text-lg font-black text-[#000080] mb-2">{item.title}</h4>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
      
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-10 hidden lg:flex">
        {sections.map((section, i) => (
           <button 
            key={i} 
            onClick={() => navigateTo(i)}
            className="relative group p-2"
            aria-label={`Go to section ${i + 1}`}
           >
            <div className={`transition-all duration-500 rounded-full bg-[#000080]/10 ${
              activeIdx === i 
                ? 'w-2 h-8 bg-[#4c8bf5] shadow-[0_0_15px_rgba(76,139,245,0.4)]' 
                : 'w-2 h-2 group-hover:h-4 group-hover:bg-[#4c8bf5]/40'
            }`} />
            {activeIdx === i && (
              // Fixed Framer Motion type error by casting props to any
              <motion.span 
                {...({ layoutId: "active-label" } as any)}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#4c8bf5] uppercase tracking-[0.2em] whitespace-nowrap"
              >
                {section.navLabel || section.overline || "START"}
              </motion.span>
            )}
           </button>
        ))}
      </div>
    </section>
  );
};
