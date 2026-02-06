import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Upload, FileCheck, Save, Search } from 'lucide-react';
import { EmptyState } from './EmptyState';

export interface ScoreLog {
  id: string;
  p1Name: string;
  p1Email: string;
  p2Name: string;
  p2Email: string;
  winnerEmail: string;
  loserEmail: string;
  score: string;
  proofFile: string | null;
}

const DEFAULT_DATA: ScoreLog[] = [
  {
    id: "log-001",
    p1Name: "Arran Kenna",
    p1Email: "arran.kenna@shopee.com",
    p2Name: "David Chen",
    p2Email: "david.chen@shopee.com",
    winnerEmail: "david.chen@shopee.com",
    loserEmail: "arran.kenna@shopee.com",
    score: "6-3",
    proofFile: "match_proof_001.jpg"
  },
  {
    id: "log-002",
    p1Name: "Sarah Lee",
    p1Email: "sarah.lee@shopee.com",
    p2Name: "Mike Ross",
    p2Email: "mike.ross@shopee.com",
    winnerEmail: "sarah.lee@shopee.com",
    loserEmail: "mike.ross@shopee.com",
    score: "7-5",
    proofFile: "proof_match_2.jpg"
  },
  {
    id: "log-003",
    p1Name: "John Doe",
    p1Email: "john.doe@shopee.com",
    p2Name: "Jane Smith",
    p2Email: "jane.smith@shopee.com",
    winnerEmail: "jane.smith@shopee.com",
    loserEmail: "john.doe@shopee.com",
    score: "6-2, 6-4",
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
    p1Name: '',
    p1Email: '',
    p2Name: '',
    p2Email: '',
    winnerEmail: '',
    loserEmail: '',
    score: '',
    proofFile: null
  });

  const handleOpenModal = (log?: ScoreLog) => {
    if (log) {
      setEditingId(log.id);
      setFormData({
        p1Name: log.p1Name,
        p1Email: log.p1Email,
        p2Name: log.p2Name,
        p2Email: log.p2Email,
        winnerEmail: log.winnerEmail,
        loserEmail: log.loserEmail,
        score: log.score,
        proofFile: log.proofFile
      });
    } else {
      setEditingId(null);
      setFormData({
        p1Name: '',
        p1Email: '',
        p2Name: '',
        p2Email: '',
        winnerEmail: '',
        loserEmail: '',
        score: '',
        proofFile: null
      });
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
    if (editingId) {
      setLogs(logs.map(l => l.id === editingId ? { ...formData, id: editingId } : l));
    } else {
      const newLog = { ...formData, id: Math.random().toString(36).substr(2, 9) };
      setLogs([...logs, newLog]);
    }
    setIsModalOpen(false);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative px-6 lg:px-12 xl:px-24 py-12 lg:py-20 bg-slate-50 min-h-screen">
      {/* Fixed Framer Motion type error by casting props to any */}
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
            <h1 className="text-3xl lg:text-5xl font-black text-[#000080] mb-4 uppercase">{titleOverride || "SCORE REGISTRATION"}</h1>
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
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider">Result</th>
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider">Score</th>
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider text-center">Proof</th>
                  <th className="px-6 py-5 font-black text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#000080] text-sm">{log.p1Name}</div>
                      <div className="text-xs text-slate-400">{log.p1Email}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#000080] text-sm">{log.p2Name}</div>
                      <div className="text-xs text-slate-400">{log.p2Email}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-slate-400 uppercase">Winner:</span>
                         <span className="text-xs font-bold text-green-600 truncate max-w-[150px]">{log.winnerEmail}</span>
                         <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Loser:</span>
                         <span className="text-xs font-bold text-red-500 truncate max-w-[150px]">{log.loserEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-[#000080] rounded-lg font-black text-sm">
                        {log.score}
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
                ))}
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
              className="relative bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
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

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                {/* Player 1 Section */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-black text-[#000080] uppercase tracking-wider mb-4">Player 1 Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">1. Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.p1Name} 
                        onChange={e => handleChange('p1Name', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        placeholder="e.g. Arran Kenna"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">2. Email Address</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.p1Email} 
                        onChange={e => handleChange('p1Email', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        placeholder="e.g. arran@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Player 2 Section */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-black text-[#000080] uppercase tracking-wider mb-4">Player 2 Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">3. Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.p2Name} 
                        onChange={e => handleChange('p2Name', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        placeholder="e.g. David Chen"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">4. Email Address</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.p2Email} 
                        onChange={e => handleChange('p2Email', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        placeholder="e.g. david@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Match Details */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-sm font-black text-[#000080] uppercase tracking-wider mb-4">Match Outcome</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">5. Winner Email</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.winnerEmail} 
                        onChange={e => handleChange('winnerEmail', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        placeholder="Email of the winner"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">6. Loser Email</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.loserEmail} 
                        onChange={e => handleChange('loserEmail', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        placeholder="Email of the loser"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">7. Game Score</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.score} 
                        onChange={e => handleChange('score', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none font-medium text-sm"
                        placeholder="e.g. 6-2, 7-6"
                      />
                    </div>
                     <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">8. Verification Proof</label>
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
                         <label htmlFor="proof-upload" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors text-sm text-slate-500 font-bold">
                            <Upload size={16} />
                            {formData.proofFile || "Upload photographic proof"}
                         </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
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