
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Trophy } from 'lucide-react';
import { CATEGORIES, LOCATIONS, QUESTIONS, RATING_PROGRAMS, RATINGS_MAP } from '../constants';

export const RegistrationFlow = () => {
  const [flowStep, setFlowStep] = useState<'info' | 'matchmaker' | 'success'>('info');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [selectedCountry, setSelectedCountry] = useState('Singapore');
  const [selectedCity, setSelectedCity] = useState('Singapore');
  const [otherCity, setOtherCity] = useState('');
  
  const [ratingProgram, setRatingProgram] = useState('');
  const [ratingValue, setRatingValue] = useState('');

  const currentQuestion = QUESTIONS[currentQuestionIdx];
  const matchmakerProgress = ((currentQuestionIdx + 1) / QUESTIONS.length) * 100;

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    if (LOCATIONS[country]) {
      setSelectedCity(LOCATIONS[country][0]);
    } else {
      setSelectedCity('');
    }
    setOtherCity('');
  };

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) {
        return prev.filter(c => c !== cat);
      } else {
        const isSelectingMen = cat.startsWith("Men");
        const isSelectingWomen = cat.startsWith("Women");

        let next = [...prev];
        if (isSelectingMen) {
          next = next.filter(c => !c.startsWith("Women"));
        } else if (isSelectingWomen) {
          next = next.filter(c => !c.startsWith("Men"));
        }
        return [...next, cat];
      }
    });
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      alert("Please select a category to proceed.");
      return;
    }
    if (!selectedCountry || !selectedCity) {
      alert("Please select both market and office location.");
      return;
    }
    if (selectedCity === 'Others' && !otherCity.trim()) {
      alert("Please specify your city.");
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
                    <input required type="text" placeholder="Jane Wang" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-2">Sea Email Address</label>
                    <input required type="email" placeholder="Jane.W@sea.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all font-medium" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">Market</label>
                      <div className="relative">
                        <select 
                          required 
                          value={selectedCountry}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium"
                        >
                          <option value="">Select Market</option>
                          {Object.keys(LOCATIONS).sort().map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">Office Location (City)</label>
                      <div className="relative">
                        <select 
                          required 
                          disabled={!selectedCountry}
                          value={selectedCity}
                          onChange={(e) => {
                            setSelectedCity(e.target.value);
                            if (e.target.value !== 'Others') setOtherCity('');
                          }}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none disabled:opacity-50 font-medium"
                        >
                          <option value="">Select Office</option>
                          {selectedCountry && LOCATIONS[selectedCountry].map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedCity === 'Others' && (
                      <motion.div
                        {...({
                          initial: { opacity: 0, height: 0 },
                          animate: { opacity: 1, height: 'auto' },
                          exit: { opacity: 0, height: 0 }
                        } as any)}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-bold text-[#000080] mb-2">City</label>
                        <input 
                          required 
                          type="text" 
                          value={otherCity}
                          onChange={(e) => setOtherCity(e.target.value)}
                          placeholder="Please enter your city" 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all font-medium" 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-4">Categories</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">Rating Program (Optional)</label>
                      <div className="relative">
                        <select 
                          value={ratingProgram}
                          onChange={(e) => {
                            setRatingProgram(e.target.value);
                            setRatingValue('');
                          }}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium"
                        >
                          <option value="">Select Program</option>
                          {RATING_PROGRAMS.map(prog => (
                            <option key={prog} value={prog}>{prog}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">Rating</label>
                      <div className="relative">
                        <select 
                          disabled={!ratingProgram}
                          value={ratingValue}
                          onChange={(e) => setRatingValue(e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none disabled:opacity-50 font-medium"
                        >
                          <option value="">Select Rating</option>
                          {ratingProgram && RATINGS_MAP[ratingProgram]?.map(rate => (
                            <option key={rate} value={rate}>{rate}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-[#4c8bf5]/20 active:scale-95 mt-4 uppercase tracking-wider">
                  Next
                </button>
              </form>
            </motion.div>
          )}

          {flowStep === 'matchmaker' && (
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
              <p className="text-slate-500 mb-8 leading-relaxed font-medium">We'll analyze your level and successful registration will be notified shortly.</p>
              <button 
                onClick={() => { 
                  setFlowStep('info'); 
                  setCurrentQuestionIdx(0); 
                  setAnswers({}); 
                  setSelectedCategories([]); 
                  setSelectedCountry('Singapore'); 
                  setSelectedCity('Singapore');
                  setOtherCity('');
                  setRatingProgram('');
                  setRatingValue('');
                }} 
                className="px-10 py-4 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-bold shadow-lg shadow-[#4c8bf5]/20 active:scale-95 transition-all"
              >
                Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
