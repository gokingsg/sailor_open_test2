import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Upload, FileCheck, Save, Calendar, Clock, MapPin, ToggleLeft, ToggleRight, Minus, ChevronDown, CheckCircle, Trophy, GitBranch, ClipboardList } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { LOCATIONS } from '../constants';
import { DrawMatch, DrawMatchResult, DrawRound } from '../types';
import { buildDrawBracket, getFlatDrawMatches, isDrawMatchComplete, isDrawMatchReady, loadDrawResults, saveDrawResults } from '../utils/drawBracket';

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

interface DrawResultDraft {
  p1Name: string;
  p2Name: string;
  p1Score: string;
  p2Score: string;
  winnerIndex: 0 | 1;
  proofFile: string | null;
}

const editableScore = (score?: string) => (score && score !== '—' ? score : '');

export const ScoreRegistrationSection = ({ initialData, titleOverride }: ScoreRegistrationSectionProps) => {
  const [activeManager, setActiveManager] = useState<'league' | 'draw'>('league');
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
  const [drawResults, setDrawResults] = useState<DrawMatchResult[]>(() => loadDrawResults());
  const [drawDrafts, setDrawDrafts] = useState<Record<string, DrawResultDraft>>({});

  const drawRounds = useMemo(() => buildDrawBracket(drawResults), [drawResults]);
  const flatDrawMatches = useMemo(() => getFlatDrawMatches(drawRounds), [drawRounds]);

  const getDrawResultForMatch = (match: DrawMatch) => (
    drawResults.find((result) => (
      result.matchId === match.id &&
      result.p1Name === match.players[0].name &&
      result.p2Name === match.players[1].name
    ))
  );

  const syncDrawResults = (nextResults: DrawMatchResult[], savedMatchIds: string[] = []) => {
    saveDrawResults(nextResults);
    setDrawResults(loadDrawResults());
    if (savedMatchIds.length > 0) {
      setDrawDrafts((prev) => {
        const nextDrafts = { ...prev };
        savedMatchIds.forEach((matchId) => {
          delete nextDrafts[matchId];
        });
        return nextDrafts;
      });
    }
  };

  const handleClearDrawResult = (match: DrawMatch) => {
    syncDrawResults(drawResults.filter((result) => result.matchId !== match.id), [match.id]);
  };

  const draftMatchesPlayers = (draft: DrawResultDraft | undefined, match: DrawMatch) => (
    Boolean(draft && draft.p1Name === match.players[0].name && draft.p2Name === match.players[1].name)
  );

  const getDrawDraftFrom = (source: Record<string, DrawResultDraft>, match: DrawMatch): DrawResultDraft => {
    const draft = source[match.id];
    if (draftMatchesPlayers(draft, match)) return draft;

    const existingResult = getDrawResultForMatch(match);
    return {
      p1Name: match.players[0].name,
      p2Name: match.players[1].name,
      p1Score: editableScore(existingResult?.p1Score || match.players[0].score),
      p2Score: editableScore(existingResult?.p2Score || match.players[1].score),
      winnerIndex: existingResult?.winnerIndex ?? (match.players[1].isWinner ? 1 : 0),
      proofFile: existingResult?.proofFile || null
    };
  };

  const getDrawDraft = (match: DrawMatch) => getDrawDraftFrom(drawDrafts, match);

  const updateDrawDraft = (match: DrawMatch, patch: Partial<DrawResultDraft>) => {
    setDrawDrafts((prev) => ({
      ...prev,
      [match.id]: {
        ...getDrawDraftFrom(prev, match),
        ...patch,
        p1Name: match.players[0].name,
        p2Name: match.players[1].name
      }
    }));
  };

  const drawDraftHasScores = (draft: DrawResultDraft) => (
    Boolean(draft.p1Score.trim() && draft.p2Score.trim())
  );

  const createDrawResult = (
    round: DrawRound,
    match: DrawMatch,
    draft: DrawResultDraft
  ): DrawMatchResult => ({
    id: getDrawResultForMatch(match)?.id || `draw-${match.id}`,
    matchId: match.id,
    roundId: round.id,
    matchLabel: match.label,
    p1Name: match.players[0].name,
    p2Name: match.players[1].name,
    p1Score: draft.p1Score.trim(),
    p2Score: draft.p2Score.trim(),
    winnerIndex: draft.winnerIndex,
    proofFile: draft.proofFile,
    updatedAt: new Date().toISOString()
  });

  const handleSaveDrawMatch = (
    round: DrawRound,
    match: DrawMatch
  ) => {
    const draft = getDrawDraft(match);
    if (!isDrawMatchReady(match) || !drawDraftHasScores(draft)) return;

    syncDrawResults([
      ...drawResults.filter((result) => result.matchId !== match.id),
      createDrawResult(round, match, draft)
    ], [match.id]);
  };

  const getSaveableDrawDraftEntries = () => (
    flatDrawMatches.filter(({ match }) => {
      const draft = drawDrafts[match.id];
      return isDrawMatchReady(match) && draftMatchesPlayers(draft, match) && drawDraftHasScores(draft as DrawResultDraft);
    })
  );

  const handleSaveAllDrawDrafts = () => {
    const saveableEntries = getSaveableDrawDraftEntries();
    if (saveableEntries.length === 0) return;

    const savedMatchIds = saveableEntries.map(({ match }) => match.id);
    const nextResults = [
      ...drawResults.filter((result) => !savedMatchIds.includes(result.matchId)),
      ...saveableEntries.map(({ round, match }) => createDrawResult(round, match, getDrawDraft(match)))
    ];

    syncDrawResults(nextResults, savedMatchIds);
  };

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

  const saveableDrawDraftCount = getSaveableDrawDraftEntries().length;
  const completedDrawCount = flatDrawMatches.filter(({ match }) => isDrawMatchComplete(match)).length;
  const readyPendingDrawCount = flatDrawMatches.filter(({ match }) => isDrawMatchReady(match) && !isDrawMatchComplete(match)).length;

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
          {activeManager === 'league' ? (
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-6 py-3 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-bold shadow-lg shadow-[#4c8bf5]/20 active:scale-95 transition-all"
            >
              <Plus size={20} />
              Add New Record
            </button>
          ) : (
            <button 
              onClick={handleSaveAllDrawDrafts}
              disabled={saveableDrawDraftCount === 0}
              className="flex items-center gap-2 px-6 py-3 bg-[#4c8bf5] text-white rounded-xl font-bold shadow-lg shadow-[#4c8bf5]/20 active:scale-95 transition-all hover:bg-[#3b7ae4] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              <Save size={20} />
              Save Draw Updates
            </button>
          )}
        </div>

        <div className="mb-6 inline-flex rounded-2xl border border-slate-100 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveManager('league')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition-all ${
              activeManager === 'league' ? 'bg-[#000080] text-white shadow-lg' : 'text-slate-400 hover:text-[#000080]'
            }`}
          >
            <ClipboardList size={16} />
            League Results
          </button>
          <button
            type="button"
            onClick={() => setActiveManager('draw')}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black transition-all ${
              activeManager === 'draw' ? 'bg-[#000080] text-white shadow-lg' : 'text-slate-400 hover:text-[#000080]'
            }`}
          >
            <GitBranch size={16} />
            Draw Results
          </button>
        </div>

        {/* Table Container */}
        {activeManager === 'league' ? (
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
        ) : (
        <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl">
          <div className="border-b border-slate-100 bg-[#f8fbff] px-6 py-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight text-[#000080]">Draw Result Management</h2>
                <p className="text-sm font-medium text-slate-500">Edit bracket results inline by round. Winners unlock the next round automatically.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-xl bg-white px-4 py-2 text-center">
                  <div className="text-lg font-black text-[#000080]">{completedDrawCount}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Completed</div>
                </div>
                <div className="rounded-xl bg-white px-4 py-2 text-center">
                  <div className="text-lg font-black text-amber-500">{readyPendingDrawCount}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ready</div>
                </div>
                <div className="rounded-xl bg-white px-4 py-2 text-center">
                  <div className="text-lg font-black text-[#4c8bf5]">{saveableDrawDraftCount}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unsaved</div>
                </div>
                <div className="rounded-xl bg-white px-4 py-2 text-center">
                  <div className="text-lg font-black text-[#000080]">{drawResults.length}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Records</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-4 md:p-6">
            {drawRounds.map((round) => {
              const roundCompleted = round.matches.filter((match) => isDrawMatchComplete(match)).length;
              const roundReady = round.matches.filter((match) => isDrawMatchReady(match) && !isDrawMatchComplete(match)).length;

              return (
                <section key={round.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                  <div className="flex flex-col gap-2 border-b border-slate-100 bg-[#f0f7ff] px-5 py-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#000080]">{round.label}</h3>
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {roundCompleted}/{round.matches.length} completed · {roundReady} ready for result
                      </p>
                    </div>
                    <span className="w-fit rounded-lg bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-[#4c8bf5]">
                      {round.matches.length} matches
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {round.matches.map((match) => {
                      const storedResult = getDrawResultForMatch(match);
                      const ready = isDrawMatchReady(match);
                      const complete = isDrawMatchComplete(match);
                      const draft = getDrawDraft(match);
                      const winner = match.players.find((player) => player.isWinner);
                      const saveDisabled = !ready || !drawDraftHasScores(draft);
                      const proofInputId = `draw-proof-${match.id}`;

                      return (
                        <div key={match.id} className={`p-5 ${ready ? 'bg-white' : 'bg-slate-50/70'}`}>
                          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-black text-[#000080]">{match.label}</span>
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">{match.id}</span>
                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                                  complete
                                    ? 'bg-green-50 text-green-600'
                                    : ready
                                      ? 'bg-amber-50 text-amber-600'
                                      : 'bg-slate-100 text-slate-400'
                                }`}>
                                  {complete ? 'Saved' : ready ? 'Ready' : 'Locked'}
                                </span>
                              </div>
                              <p className="mt-1 text-xs font-bold text-slate-400">
                                {!ready
                                  ? 'Save the required previous-round winners to unlock this match.'
                                  : complete
                                    ? `Winner advances: ${winner?.name}`
                                    : 'Enter both scores and choose the winner.'}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                disabled={saveDisabled}
                                onClick={() => handleSaveDrawMatch(round, match)}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#4c8bf5] px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[#3b7ae4] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                              >
                                <Save size={14} />
                                {storedResult ? 'Update' : 'Save'}
                              </button>
                              <button
                                type="button"
                                disabled={!storedResult}
                                onClick={() => handleClearDrawResult(match)}
                                className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-red-500 transition-all hover:bg-red-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
                              >
                                <Trash2 size={14} />
                                Clear
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
                            <div className="space-y-3">
                              {match.players.map((player, index) => {
                                const scoreValue = index === 0 ? draft.p1Score : draft.p2Score;
                                const selectedWinner = ready && draft.winnerIndex === index;
                                const playerPending = player.name.includes('TBD');

                                return (
                                  <div
                                    key={`${match.id}-${index}`}
                                    className={`grid gap-3 rounded-2xl border px-4 py-3 shadow-sm md:grid-cols-[auto_minmax(0,1fr)_104px] md:items-center ${
                                      selectedWinner
                                        ? 'border-[#4c8bf5]/40 bg-[#f0f7ff]'
                                        : 'border-slate-100 bg-white'
                                    } ${!ready ? 'opacity-60' : ''}`}
                                  >
                                    <button
                                      type="button"
                                      disabled={!ready}
                                      onClick={() => updateDrawDraft(match, { winnerIndex: index as 0 | 1 })}
                                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black uppercase tracking-wider transition-all disabled:cursor-not-allowed ${
                                        selectedWinner
                                          ? 'bg-[#000080] text-white'
                                          : 'bg-slate-50 text-slate-400 hover:bg-[#4c8bf5]/10 hover:text-[#000080]'
                                      }`}
                                    >
                                      {selectedWinner ? <CheckCircle size={15} /> : <span className="h-[15px] w-[15px]" />}
                                      Winner
                                    </button>

                                    <div className="flex min-w-0 items-center gap-3">
                                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                                        selectedWinner ? 'bg-[#4c8bf5] text-white' : 'bg-slate-100 text-slate-400'
                                      }`}>
                                        {player.seed ?? '—'}
                                      </span>
                                      <div className="min-w-0">
                                        <div className={`truncate text-sm font-black ${
                                          playerPending ? 'text-slate-300' : selectedWinner ? 'text-[#000080]' : 'text-slate-500'
                                        }`}>
                                          {player.name}
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">Player {index + 1}</div>
                                      </div>
                                    </div>

                                    <input
                                      disabled={!ready}
                                      type="text"
                                      inputMode="numeric"
                                      value={scoreValue}
                                      onChange={(event) => updateDrawDraft(match, index === 0 ? { p1Score: event.target.value } : { p2Score: event.target.value })}
                                      placeholder={ready ? 'Score' : 'Locked'}
                                      className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-center text-sm font-black text-[#000080] outline-none transition-all focus:border-[#4c8bf5] focus:ring-2 focus:ring-[#4c8bf5]/20 disabled:cursor-not-allowed disabled:text-slate-300"
                                    />
                                  </div>
                                );
                              })}
                            </div>

                            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                              <div>
                                <div className="text-xs font-black uppercase tracking-widest text-slate-400">Proof</div>
                                <input
                                  id={proofInputId}
                                  type="file"
                                  disabled={!ready}
                                  className="hidden"
                                  onChange={(event) => {
                                    if (event.target.files?.[0]) updateDrawDraft(match, { proofFile: event.target.files[0].name });
                                  }}
                                />
                                <label
                                  htmlFor={ready ? proofInputId : ''}
                                  className={`mt-3 flex items-center justify-center gap-2 rounded-xl border border-dashed px-3 py-3 text-center text-xs font-bold transition-colors ${
                                    ready
                                      ? 'cursor-pointer border-slate-300 bg-white text-slate-500 hover:bg-slate-100'
                                      : 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                                  }`}
                                >
                                  <Upload size={15} />
                                  <span className="truncate">{draft.proofFile || 'Upload proof'}</span>
                                </label>
                              </div>
                              <div className="rounded-xl bg-white px-3 py-2">
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">Advancement</div>
                                <div className="mt-1 truncate text-sm font-black text-[#000080]">
                                  {complete ? winner?.name : ready ? 'Pending result' : 'Waiting'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
        )}
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
