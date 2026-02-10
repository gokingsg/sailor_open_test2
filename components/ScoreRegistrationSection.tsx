import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Upload, FileCheck, Save, Calendar, Clock, MapPin, ToggleLeft, ToggleRight, Minus, ChevronDown, CheckCircle, Trophy } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { LOCATIONS } from '../constants';

export interface ScoreSet {
  p1: string;
  p2: string;
}

export interface ScoreLog {
  id: string;
  matchTitle: string; // New field
  // Match Info
  market: string;
  city: string;
  matchDate: string;
  matchTime: string;
  
  // Players
  p1Name: string;
  p1Email: string;
  p2Name: string;
  p2Email: string;
  
  // Outcome
  winnerEmail: string;
  loserEmail: string;
  
  // Scoring
  isWalkover: boolean;
  sets: ScoreSet[];
  
  proofFile: string | null;
}

const DEFAULT_DATA: ScoreLog[] = [
  {
    id: "log-001",
    matchTitle: "City League",
    market: "Singapore",
    city: "Singapore",
    matchDate: "2026-01-12",
    matchTime: "19:00",
    p1Name: "Arran Kenna",
    p1Email: "arran.kenna@shopee.com",
    p2Name: "David Chen",
    p2Email: "david.chen@shopee.com",
    winnerEmail: "david.chen@shopee.com",
    loserEmail: "arran.kenna@shopee.com",
    isWalkover: false,
    sets: [{ p1: "4", p2: "6" }],
    proofFile: "match_proof_001.jpg"
  },
  {
    id: "log-002",
    matchTitle: "City League",
    market: "Singapore",
    city: "Singapore",
    matchDate: "2026-01-10",
    matchTime: "15:00",
    p1Name: "Sarah Lee",
    p1Email: "sarah.lee@shopee.com",
    p2Name: "Mike Ross",
    p2Email: "mike.ross@shopee.com",
    winnerEmail: "sarah.lee@shopee.com",
    loserEmail: "mike.ross@shopee.com",
    isWalkover: false,
    sets: [{ p1: "7", p2: "5" }],
    proofFile: "proof_match_2.jpg"
  },
  {
    id: "log-003",
    matchTitle: "City League",
    market: "Singapore",
    city: "Singapore",
    matchDate: "2026-01-04",
    matchTime: "18:00",
    p1Name: "John Doe",
    p1Email: "john.doe@shopee.com",
    p2Name: "Jane Smith",
    p2Email: "jane.smith@shopee.com",
    winnerEmail: "jane.smith@shopee.com",
    loserEmail: "john.doe@shopee.com",
    isWalkover: false,
    sets: [{ p1: "6", p2: "4" }],
    proofFile: "final_score_sheet.png"
  }
];

interface ScoreRegistrationSectionProps {
  initialData?: ScoreLog[];
  titleOverride?: string;
}

export const ScoreRegistrationSection = ({ initialData, titleOverride }: ScoreRegistrationSectionProps) => {
  const [logs, setLogs] = useState<ScoreLog[]>(initialData || DEFAULT_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<ScoreLog, 'id'>>({
    matchTitle: 'City League',
    market: '',
    city: '',
    matchDate: '',
    matchTime: '',
    p1Name: '',
    p1Email: '',
    p2Name: '',
    p2Email: '',
    winnerEmail: '',
    loserEmail: '',
    isWalkover: false,
    sets: [{ p1: '', p2: '' }],
    proofFile: null
  });

  // Derived state for winner selection in UI
  const [winnerSide, setWinnerSide] = useState<'p1' | 'p2'>('p1');

  const handleOpenModal = (log?: ScoreLog) => {
    if (log) {
      setEditingId(log.id);
      setFormData({
        matchTitle: log.matchTitle || 'City League',
        market: log.market || '',
        city: log.city || '',
        matchDate: log.matchDate || '',
        matchTime: log.matchTime || '',
        p1Name: log.p1Name,
        p1Email: log.p1Email,
        p2Name: log.p2Name,
        p2Email: log.p2Email,
        winnerEmail: log.winnerEmail,
        loserEmail: log.loserEmail,
        isWalkover: log.isWalkover || false,
        sets: log.sets && log.sets.length > 0 ? log.sets : [{ p1: '', p2: '' }],
        proofFile: log.proofFile
      });
      // Determine winner side based on email
      if (log.winnerEmail === log.p2Email && log.p2Email) {
        setWinnerSide('p2');
      } else {
        setWinnerSide('p1');
      }
    } else {
      setEditingId(null);
      setFormData({
        matchTitle: 'City League',
        market: 'Singapore',
        city: 'Singapore',
        matchDate: '',
        matchTime: '',
        p1Name: '',
        p1Email: '',
        p2Name: '',
        p2Email: '',
        winnerEmail: '',
        loserEmail: '',
        isWalkover: false,
        sets: [{ p1: '', p2: '' }],
        proofFile: null
      });
      setWinnerSide('p1');
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setLogs(logs.filter(l => l.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-populate winner/loser email based on selection
    const finalFormData = {
      ...formData,
      winnerEmail: winnerSide === 'p1' ? formData.p1Email : formData.p2Email,
      loserEmail: winnerSide === 'p1' ? formData.p2Email : formData.p1Email,
    };

    if (editingId) {
      setLogs(logs.map(l => l.id === editingId ? { ...finalFormData, id: editingId } : l));
    } else {
      const newLog = { ...finalFormData, id: Math.random().toString(36).substr(2, 9) };
      setLogs([...logs, newLog]);
    }
    setIsModalOpen(false);
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSetChange = (index: number, player: 'p1' | 'p2', value: string) => {
    const newSets = [...formData.sets];
    newSets[index][player] = value;
    setFormData(prev => ({ ...prev, sets: newSets }));
  };

  const addSet = () => {
    setFormData(prev => ({ ...prev, sets: [...prev.sets, { p1: '', p2: '' }] }));
  };

  const removeSet = (index: number) => {
    if (formData.sets.length > 1) {
      const newSets = formData.sets.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, sets: newSets }));
    }
  };

  const formatScoreDisplay = (log: ScoreLog) => {
    if (log.isWalkover) return "Walkover";
    return log.sets.map(s => `${s.p1}-${s.p2}`).join(", ");
  };

  return (
    <section className="relative px-6 lg:px-12 xl:px-24 py-12 lg:py-20 bg-slate-50 min-h-screen">
      <motion.div 
        {...({
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        } as any)}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl lg:text-5xl font-black text-[#000080] mb-4 uppercase">{titleOverride || "SUBMIT MATCH RESULT"}</h1>
            <p className="text-slate-500 font-medium">Admin panel for recording official match results.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-bold shadow-lg shadow-[#4c8bf5]/20 active:scale-95 transition-all"
          >
            <Plus size={20} />
            Add New Record
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#000080] text-white">
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider">Player 1</th>
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider">Player 2</th>
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider">Match Info</th>
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider">Score</th>
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider text-center">Proof</th>
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => {
                  const isP1Winner = log.winnerEmail === log.p1Email;
                  const isP2Winner = log.winnerEmail === log.p2Email;
                  
                  return (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-5">
                        <div>
                           <div className="flex items-center gap-2">
                             <div className="font-bold text-[#000080] text-sm">{log.p1Name}</div>
                             {isP1Winner && <CheckCircle size={14} className="text-green-500" />}
                           </div>
                           <div className="text-xs text-slate-400">{log.p1Email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div>
                           <div className="flex items-center gap-2">
                             <div className="font-bold text-[#000080] text-sm">{log.p2Name}</div>
                             {isP2Winner && <CheckCircle size={14} className="text-green-500" />}
                           </div>
                           <div className="text-xs text-slate-400">{log.p2Email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          {log.matchTitle && (
                            <div className="text-xs font-black text-[#000080] uppercase tracking-wider mb-1">{log.matchTitle}</div>
                          )}
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                            <MapPin size={10} className="text-[#4c8bf5]" />
                            {log.city}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                             <Calendar size={10} />
                             {log.matchDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-lg font-black text-sm ${log.isWalkover ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-[#000080]'}`}>
                          {formatScoreDisplay(log)}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {log.proofFile ? (
                          <div className="inline-flex flex-col items-center justify-center p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100">
                             <FileCheck size={16} className="text-[#4c8bf5] mb-1" />
                             <span className="text-[10px] text-slate-500 max-w-[80px] truncate">{log.proofFile}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-300 italic">No file</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenModal(log)}
                            className="p-2 text-slate-400 hover:text-[#4c8bf5] hover:bg-[#4c8bf5]/10 rounded-lg transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(log.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {logs.length === 0 && (
                   <tr>
                     <td colSpan={6} className="px-6 py-12">
                        <EmptyState 
                          message="No Match Records Found" 
                          description="Get started by clicking 'Add New Record' to log official match results and upload proof."
                        />
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              {...({
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 }
              } as any)}
              className="absolute inset-0 bg-[#000080]/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              {...({
                initial: { opacity: 0, scale: 0.95, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.95, y: 20 }
              } as any)}
              className="relative bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white px-8 py-6 border-b border-slate-100 flex items-center justify-between z-10">
                <h2 className="text-xl font-black text-[#000080] flex items-center gap-2">
                  {editingId ? <Edit2 size={20} className="text-[#4c8bf5]" /> : <Plus size={20} className="text-[#4c8bf5]" />}
                  {editingId ? 'Edit Record' : 'Register New Match'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                
                {/* 1. Match Information Section */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-black text-[#000080] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MapPin size={16} className="text-[#4c8bf5]" />
                    Match Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Match Title</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.matchTitle} 
                        onChange={e => handleChange('matchTitle', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        placeholder="e.g. City League"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Market</label>
                      <div className="relative">
                        <select 
                          required 
                          value={formData.market}
                          onChange={(e) => {
                            handleChange('market', e.target.value);
                            if (LOCATIONS[e.target.value]) {
                              handleChange('city', LOCATIONS[e.target.value][0]);
                            }
                          }}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm appearance-none"
                        >
                          <option value="">Select Market</option>
                          {Object.keys(LOCATIONS).sort().map(market => (
                            <option key={market} value={market}>{market}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">City</label>
                      <div className="relative">
                        <select 
                          required 
                          disabled={!formData.market}
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm appearance-none disabled:opacity-50"
                        >
                          {formData.market && LOCATIONS[formData.market]?.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Match Date</label>
                      <div className="relative">
                        <input 
                          required 
                          type="date"
                          value={formData.matchDate}
                          onChange={(e) => handleChange('matchDate', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Match Time</label>
                      <div className="relative">
                        <input 
                          required 
                          type="time"
                          value={formData.matchTime}
                          onChange={(e) => handleChange('matchTime', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Players & Score Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Player 1 Info */}
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-full">
                      <h3 className="text-sm font-black text-[#000080] uppercase tracking-wider mb-4">Player 1 Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                          <input 
                            required 
                            type="email" 
                            value={formData.p1Email} 
                            onChange={e => handleChange('p1Email', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                            placeholder="e.g. arran@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Name</label>
                          <input 
                            required 
                            type="text" 
                            value={formData.p1Name} 
                            onChange={e => handleChange('p1Name', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                            placeholder="e.g. Arran Kenna"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Player 2 Info */}
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-full">
                      <h3 className="text-sm font-black text-[#000080] uppercase tracking-wider mb-4">Player 2 Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Email</label>
                          <input 
                            required 
                            type="email" 
                            value={formData.p2Email} 
                            onChange={e => handleChange('p2Email', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                            placeholder="e.g. david@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Name</label>
                          <input 
                            required 
                            type="text" 
                            value={formData.p2Name} 
                            onChange={e => handleChange('p2Name', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                            placeholder="e.g. David Chen"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Scoring Section */}
                <div className="bg-white p-6 rounded-2xl border-2 border-[#4c8bf5]/20 shadow-lg shadow-[#4c8bf5]/5">
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-black text-[#000080] uppercase tracking-wider">Match Scores</h3>
                      <button 
                        type="button"
                        onClick={() => handleChange('isWalkover', !formData.isWalkover)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-colors ${formData.isWalkover ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}
                      >
                         {formData.isWalkover ? <ToggleRight size={24} className="text-orange-500" /> : <ToggleLeft size={24} />}
                         Walkover?
                      </button>
                   </div>
                   
                   {!formData.isWalkover ? (
                     <div className="space-y-3">
                        {/* Headers */}
                        <div className="flex items-center gap-4 px-2">
                           <div className="w-16"></div>
                           <div className="flex-1 text-center text-xs font-bold text-slate-400 uppercase">Player 1</div>
                           <div className="w-4"></div>
                           <div className="flex-1 text-center text-xs font-bold text-slate-400 uppercase">Player 2</div>
                           <div className="w-10"></div>
                        </div>

                        {formData.sets.map((set, idx) => (
                           <div key={idx} className="flex items-center gap-4">
                              <div className="w-16 text-xs font-black text-slate-400 uppercase tracking-wider">Set {idx + 1}</div>
                              
                              {/* Player 1 Score */}
                              <div className="flex-1">
                                <input 
                                  type="text" 
                                  inputMode="numeric"
                                  value={set.p1}
                                  onChange={(e) => handleSetChange(idx, 'p1', e.target.value)}
                                  placeholder="0"
                                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-black text-center text-[#000080]"
                                />
                              </div>

                              <div className="text-slate-300 font-bold">-</div>

                              {/* Player 2 Score */}
                              <div className="flex-1">
                                <input 
                                  type="text" 
                                  inputMode="numeric"
                                  value={set.p2}
                                  onChange={(e) => handleSetChange(idx, 'p2', e.target.value)}
                                  placeholder="0"
                                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-black text-center text-[#000080]"
                                />
                              </div>

                              {/* Action Buttons */}
                              <div className="w-10 flex justify-end">
                                 {formData.sets.length > 1 ? (
                                    <button 
                                      type="button" 
                                      onClick={() => removeSet(idx)}
                                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                      <Minus size={16} />
                                    </button>
                                 ) : (
                                   <div className="w-8" /> 
                                 )}
                              </div>
                           </div>
                        ))}

                        <button 
                          type="button"
                          onClick={addSet}
                          className="mt-4 flex items-center gap-2 text-xs font-bold text-[#4c8bf5] hover:text-[#000080] transition-colors ml-20"
                        >
                           <Plus size={14} /> Add Another Set
                        </button>
                     </div>
                   ) : (
                      <div className="p-8 bg-orange-50 rounded-xl border border-orange-100 text-center text-orange-800 font-medium">
                        Scores are disabled for Walkover matches. Please ensure you select the winner below.
                      </div>
                   )}

                   {/* Winner Selection */}
                   <div className="mt-8 pt-6 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Who won the match?</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setWinnerSide('p1')}
                          className={`relative p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                            winnerSide === 'p1' 
                            ? 'bg-[#000080] border-[#000080] text-white shadow-lg' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-[#000080]/30'
                          }`}
                        >
                           {winnerSide === 'p1' && <CheckCircle size={18} className="absolute left-4" />}
                           <span className="font-bold truncate max-w-full px-2">{formData.p1Name || "Player 1"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setWinnerSide('p2')}
                          className={`relative p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                            winnerSide === 'p2' 
                            ? 'bg-[#000080] border-[#000080] text-white shadow-lg' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-[#000080]/30'
                          }`}
                        >
                           {winnerSide === 'p2' && <CheckCircle size={18} className="absolute left-4" />}
                           <span className="font-bold truncate max-w-full px-2">{formData.p2Name || "Player 2"}</span>
                        </button>
                      </div>
                   </div>

                   {/* Proof Upload (Moved from Verification Section) */}
                   <div className="mt-8">
                    <label className="block text-xs font-bold text-slate-500 mb-2">Match Proof</label>
                    <div className="relative w-full">
                       <input 
                         type="file" 
                         className="hidden" 
                         id="proof-upload" 
                         onChange={(e) => {
                           if(e.target.files?.[0]) {
                             handleChange('proofFile', e.target.files[0].name)
                           }
                         }}
                       />
                       <label htmlFor="proof-upload" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors text-sm text-slate-500 font-bold">
                          <Upload size={16} />
                          {formData.proofFile || "Upload photographic proof (Score sheet / Photo)"}
                       </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-4 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-bold shadow-lg shadow-[#4c8bf5]/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Save size={18} />
                    Save Record
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};