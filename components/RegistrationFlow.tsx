
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Trophy } from 'lucide-react';
import { CATEGORIES, LOCATIONS, QUESTIONS } from '../constants';

export const RegistrationFlow = () => {
  const [flowStep, setFlowStep] = useState<'info' | 'matchmaker' | 'success'>('info');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  
  const [selectedCountry, setSelectedCountry] = useState('Singapore');
  const [selectedCity, setSelectedCity] = useState('Singapore');

  const currentQuestion = QUESTIONS[currentQuestionIdx];
  const matchmakerProgress = ((currentQuestionIdx + 1) / QUESTIONS.length) * 100;

  const isDoublesSelected = selectedCategories.some(cat => cat.toLowerCase().includes('doubles'));

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    if (LOCATIONS[country]) {
      setSelectedCity(LOCATIONS[country][0]);
    } else {
      setSelectedCity('');
    }
  };

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev => {
      const isSelectingMen = cat.startsWith("Men");
      const isSelectingWomen = cat.startsWith("Women");

      let next = [...prev];

      if (isSelectingMen) {
        next = next.filter(c => !c.startsWith("Women"));
      } else if (isSelectingWomen) {
        next = next.filter(c => !c.startsWith("Men"));
      }

      if (next.includes(cat)) {
        return next.filter(c => c !== cat);
      } else {
        return [...next, cat];
      }
    });
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      alert("Please select at least one category to proceed.");
      return;
    }
    if (!selectedCountry || !selectedCity) {
      alert("Please select both country and city.");
      return;
    }
    setFlowStep('matchmaker');
    setTimeout(() => {
      document.getElementById('registration-flow')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const selectOption = (optionId: string) => {
    if (currentQuestion.isMultiSelect) {
      const currentAnswers = (answers[currentQuestionIdx] as string[]) || [];
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      setAnswers({ ...answers, [currentQuestionIdx]: newAnswers });
    } else {
      setAnswers({ ...answers, [currentQuestionIdx]: optionId });
      if (currentQuestionIdx < QUESTIONS.length - 1) {
        setTimeout(() => setCurrentQuestionIdx(currentQuestionIdx + 1), 300);
      } else {
        setFlowStep('success');
      }
    }
  };

  const isSelected = (optionId: string) => {
    const answer = answers[currentQuestionIdx];
    return Array.isArray(answer) ? answer.includes(optionId) : answer === optionId;
  };

  return (
    <section id="registration-flow" className="py-24 px-6 lg:px-12 xl:px-24 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {flowStep === 'info' && (
            // Fixed Framer Motion type error by casting props to any
            <motion.div 
              key="info"
              {...({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 }
              } as any)}
              className="bg-white rounded-[2rem] p-8 lg:p-12 card-shadow border border-slate-50"
            >
              <h2 className="text-3xl font-black text-center text-[#000080] mb-10">Registration</h2>
              <form className="space-y-8" onSubmit={handleInfoSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-2">Full Name</label>
                    <input required type="text" placeholder="Jane Wang" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-2">Sea Email Address</label>
                    <input required type="email" placeholder="Jane.W@sea.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">Market</label>
                      <div className="relative">
                        <select 
                          required 
                          value={selectedCountry}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none"
                        >
                          <option value="">Select Market</option>
                          {Object.keys(LOCATIONS).map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">City (Match Location)</label>
                      <div className="relative">
                        <select 
                          required 
                          disabled={!selectedCountry}
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none disabled:opacity-50"
                        >
                          <option value="">Select City</option>
                          {selectedCountry && LOCATIONS[selectedCountry].map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-4">Categories (Select all you wish to join)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategoryToggle(cat)}
                          className={`flex items-center justify-between px-5 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
                            selectedCategories.includes(cat) 
                            ? 'bg-[#4c8bf5] border-[#4c8bf5] text-white shadow-lg' 
                            : 'bg-white border-slate-100 text-[#000080] hover:border-[#4c8bf5]/30'
                          }`}
                        >
                          {cat}
                          {selectedCategories.includes(cat) && <Check size={16} />}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {isDoublesSelected && (
                        // Fixed Framer Motion type error by casting props to any
                        <motion.div
                          {...({
                            initial: { opacity: 0, height: 0, marginTop: 0 },
                            animate: { opacity: 1, height: 'auto', marginTop: 24 },
                            exit: { opacity: 0, height: 0, marginTop: 0 }
                          } as any)}
                          className="overflow-hidden px-1 -mx-1 pb-1 space-y-6"
                        >
                          <div>
                            <label className="block text-sm font-bold text-[#000080] mb-2">Partner's Full Name</label>
                            <input required type="text" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} placeholder="Partner's Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-[#000080] mb-2">Partner's Sea Email Address</label>
                            <input required type="email" value={partnerEmail} onChange={(e) => setPartnerEmail(e.target.value)} placeholder="Partner.Email@sea.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-[#4c8bf5]/20 active:scale-95 mt-4">
                  Next
                </button>
              </form>
            </motion.div>
          )}

          {flowStep === 'matchmaker' && (
            // Fixed Framer Motion type error by casting props to any
            <motion.div 
              key="matchmaker"
              {...({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 }
              } as any)}
              className="bg-white rounded-[2rem] p-8 lg:p-12 card-shadow border border-slate-50"
            >
              <h2 className="text-3xl font-black text-center text-[#000080] mb-8">Tennis Level Matchmaker</h2>
              <div className="w-full h-3 bg-slate-100 rounded-full mb-12 overflow-hidden">
                {/* Fixed Framer Motion type error by casting props to any */}
                <motion.div {...({ initial: { width: 0 }, animate: { width: `${matchmakerProgress}%` } } as any)} className="h-full bg-[#4c8bf5] rounded-full" />
              </div>
              <div className="space-y-8">
                <h3 className="text-xl font-black text-[#000080] mb-6">{currentQuestion.question}</h3>
                <div className="space-y-4">
                  {currentQuestion.options.map(opt => (
                    <button 
                      key={opt.id} 
                      onClick={() => selectOption(opt.id)}
                      className={`w-full p-6 text-left rounded-2xl border-2 transition-all ${isSelected(opt.id) ? 'bg-[#4c8bf5] border-[#4c8bf5] text-white shadow-xl shadow-[#4c8bf5]/20' : 'bg-white border-slate-100 text-[#000080] hover:border-[#4c8bf5]/30'}`}
                    >
                      {opt.tag && <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase mb-3 ${isSelected(opt.id) ? 'bg-white text-[#4c8bf5]' : 'bg-[#4c8bf5] text-white'}`}>{opt.tag}</span>}
                      <p className="font-bold text-lg leading-snug">{opt.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
                <button onClick={() => currentQuestionIdx === 0 ? setFlowStep('info') : setCurrentQuestionIdx(v => v - 1)} className="text-lg font-bold text-[#4c8bf5] hover:opacity-70">
                  Back
                </button>
                {currentQuestion.isMultiSelect && (
                   <button onClick={() => currentQuestionIdx < QUESTIONS.length - 1 ? setCurrentQuestionIdx(v => v + 1) : setFlowStep('success')} className="px-10 py-4 bg-[#4c8bf5] text-white rounded-xl font-bold shadow-lg shadow-[#4c8bf5]/20 active:scale-95 transition-all">
                    {currentQuestionIdx === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
                   </button>
                )}
              </div>
            </motion.div>
          )}

          {flowStep === 'success' && (
            // Fixed Framer Motion type error by casting props to any
            <motion.div 
              key="success"
              {...({
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 }
              } as any)}
              className="bg-white rounded-[2rem] p-12 text-center card-shadow border border-slate-50"
            >
              <div className="w-20 h-20 bg-[#4c8bf5] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#4c8bf5]/30">
                <Trophy size={40} />
              </div>
              <h2 className="text-3xl font-black text-[#000080] mb-4">You're All Set!</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">We'll analyze your level and successful registration will be notified shortly</p>
              <button onClick={() => { setFlowStep('info'); setCurrentQuestionIdx(0); setAnswers({}); setSelectedCategories([]); setPartnerName(''); setPartnerEmail(''); setSelectedCountry('Singapore'); setSelectedCity('Singapore'); }} className="px-10 py-4 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-bold shadow-lg shadow-[#4c8bf5]/20 active:scale-95 transition-all">
                Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
