import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, ChevronDown, Filter, GitBranch, MapPin, Trophy, X } from 'lucide-react';
import { DRAW_CATEGORY_OPTIONS, DRAW_MARKET_OPTIONS } from '../constants';
import { DrawCategoryId, DrawCompetitor, DrawMarketId, DrawMatch, DrawRound } from '../types';
import { buildDrawBracket, DRAW_RESULTS_UPDATED_EVENT, loadDrawEntries, loadDrawResults } from '../utils/drawBracket';

const ROW_HEIGHT = 96;
const PLAYER_HEIGHT = 34;
const PLAYER_GAP = 10;
const MATCH_HEIGHT = PLAYER_HEIGHT * 2 + PLAYER_GAP;
const PLAYER_ONE_Y = PLAYER_HEIGHT / 2;
const PLAYER_TWO_Y = PLAYER_HEIGHT + PLAYER_GAP + PLAYER_HEIGHT / 2;
const CONNECTOR_X = 12;
const CONTENT_X = 26;
const SOURCE_OVERLAP = 22;

const ROUND_BACKGROUNDS = ['#ffffff', '#f8fbff', '#f3f8ff', '#eef5ff', '#eaf2ff', '#e5effd'];
const HEADER_BACKGROUNDS = ['#d3e3f6', '#c9ddf5', '#bdd5f1', '#b2ceee', '#a8c7eb', '#97b9e3'];

const getWinnerPlayerIndex = (match: DrawMatch) => (match.players[0].isWinner ? 0 : 1);
const getPlayerY = (playerIndex: number) => (playerIndex === 0 ? PLAYER_ONE_Y : PLAYER_TWO_Y);
const getCenteredMatchTop = (spanRows: number) => (spanRows * ROW_HEIGHT - MATCH_HEIGHT) / 2;
const getWinnerYWithinSpan = (match: DrawMatch, spanRows: number) => (
  getCenteredMatchTop(spanRows) + getPlayerY(getWinnerPlayerIndex(match))
);

interface SelectedDrawMatch {
  match: DrawMatch;
  roundLabel: string;
  focusPlayerName: string;
}

const isPlaceholderPlayer = (player: DrawCompetitor) => player.name.includes('TBD');
const getMatchStatus = (match: DrawMatch) => (
  match.players.some((player) => player.isWinner) ? 'Completed' : 'Pending'
);

const PlayerLine = ({
  player,
  isPending = false,
  onClick
}: {
  player: DrawCompetitor;
  isPending?: boolean;
  onClick?: () => void;
}) => {
  const clickable = Boolean(onClick) && !isPlaceholderPlayer(player);

  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={onClick}
      className={`relative grid w-full grid-cols-[minmax(0,1fr)_18px_40px] items-center gap-3 rounded-xl border bg-white px-3 text-left text-[13px] shadow-sm transition-all ${
      player.isWinner || isPending
        ? 'border-[#4c8bf5]/25 text-[#000080] shadow-[#4c8bf5]/10'
        : 'border-slate-100 text-slate-400'
    } ${clickable ? 'cursor-pointer hover:-translate-y-0.5 hover:border-[#4c8bf5]/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#4c8bf5]/30' : 'cursor-default disabled:opacity-100'}`}
      style={{ height: PLAYER_HEIGHT }}
    >
      <span className={`min-w-0 truncate whitespace-nowrap leading-tight ${player.isWinner ? 'font-black' : 'font-bold'}`}>
        {player.name}
      </span>
      <span className="flex justify-center">
        {player.isWinner && <CheckCircle size={13} className="text-green-500" />}
      </span>
      <span className={`rounded-lg px-1.5 py-1 text-center text-[11px] font-black ${
        player.isWinner ? 'bg-[#000080] text-white' : 'bg-white text-slate-400'
      }`}>
        {player.score}
      </span>
    </button>
  );
};

const MatchUnit = ({
  match,
  roundLabel,
  spanRows = 1,
  onSelectPlayer
}: {
  match: DrawMatch;
  roundLabel: string;
  spanRows?: number;
  onSelectPlayer?: (selection: SelectedDrawMatch) => void;
}) => (
  <div
    className="relative box-border flex flex-col justify-center gap-2.5"
    style={{ height: MATCH_HEIGHT, marginTop: getCenteredMatchTop(spanRows) }}
  >
    <PlayerLine
      player={match.players[0]}
      isPending={!match.players.some((player) => player.isWinner)}
      onClick={() => onSelectPlayer?.({ match, roundLabel, focusPlayerName: match.players[0].name })}
    />
    <PlayerLine
      player={match.players[1]}
      isPending={!match.players.some((player) => player.isWinner)}
      onClick={() => onSelectPlayer?.({ match, roundLabel, focusPlayerName: match.players[1].name })}
    />
  </div>
);

const PairConnector = ({ rounds, roundIndex, matchIndex }: { rounds: DrawRound[]; roundIndex: number; matchIndex: number }) => {
  const spanRows = 2 ** roundIndex;
  const previousSpanRows = spanRows / 2;
  const previousRound = rounds[roundIndex - 1];
  const sourceA = previousRound.matches[matchIndex * 2];
  const sourceB = previousRound.matches[matchIndex * 2 + 1];

  if (!sourceA.players.some((player) => player.isWinner) || !sourceB.players.some((player) => player.isWinner)) {
    return null;
  }

  const targetY = (spanRows * ROW_HEIGHT) / 2;
  const sourceAY = getWinnerYWithinSpan(sourceA, previousSpanRows);
  const sourceBY = previousSpanRows * ROW_HEIGHT + getWinnerYWithinSpan(sourceB, previousSpanRows);

  return (
    <svg
      className="pointer-events-none absolute top-0 z-10 overflow-visible"
      width={CONTENT_X + SOURCE_OVERLAP}
      height={spanRows * ROW_HEIGHT}
      viewBox={`${-SOURCE_OVERLAP} 0 ${CONTENT_X + SOURCE_OVERLAP} ${spanRows * ROW_HEIGHT}`}
      preserveAspectRatio="none"
      style={{ left: -SOURCE_OVERLAP }}
      aria-hidden="true"
    >
      <path
        d={`M ${-SOURCE_OVERLAP} ${sourceAY} H ${CONNECTOR_X} V ${sourceBY} H ${-SOURCE_OVERLAP} M ${CONNECTOR_X} ${targetY} H ${CONTENT_X}`}
        fill="none"
        stroke="#000080"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const RoundCell = ({ children, roundIndex, spanRows = 1 }: {
  children: React.ReactNode;
  roundIndex: number;
  spanRows?: number;
}) => (
  <td
    rowSpan={spanRows}
    className="relative overflow-visible align-top"
    style={{
      background: ROUND_BACKGROUNDS[roundIndex],
      height: spanRows * ROW_HEIGHT,
    }}
  >
    {children}
  </td>
);

const AdvancedMatchCell = ({ match, rounds, roundLabel, roundIndex, matchIndex, spanRows, onSelectPlayer }: {
  match: DrawMatch;
  rounds: DrawRound[];
  roundLabel: string;
  roundIndex: number;
  matchIndex: number;
  spanRows: number;
  onSelectPlayer?: (selection: SelectedDrawMatch) => void;
}) => (
  <RoundCell roundIndex={roundIndex} spanRows={spanRows}>
    <PairConnector rounds={rounds} roundIndex={roundIndex} matchIndex={matchIndex} />
    <div className="pl-[26px] pr-5">
      <MatchUnit match={match} roundLabel={roundLabel} spanRows={spanRows} onSelectPlayer={onSelectPlayer} />
    </div>
  </RoundCell>
);

const ChampionCell = ({
  finalRound,
  onSelectPlayer
}: {
  finalRound: DrawRound;
  onSelectPlayer?: (selection: SelectedDrawMatch) => void;
}) => {
  const champion = finalRound.matches[0].players.find((player) => player.isWinner);
  const finalOpponent = finalRound.matches[0].players.find((player) => !player.isWinner);

  return (
    <RoundCell roundIndex={5} spanRows={16}>
      <div className="flex h-full items-center px-5">
        <div className="min-h-[132px] w-full rounded-2xl border border-[#4c8bf5]/25 bg-white p-4 shadow-xl shadow-[#4c8bf5]/10">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#4c8bf5]">
              <Trophy size={14} />
              Grand Winner
            </div>
            <span className="rounded-full bg-[#f0f7ff] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#000080]">
              {champion ? 'Champion' : 'Pending'}
            </span>
          </div>

          {champion ? (
            <PlayerLine
              player={champion}
              onClick={() => onSelectPlayer?.({ match: finalRound.matches[0], roundLabel: finalRound.label, focusPlayerName: champion.name })}
            />
          ) : (
            <div className="flex h-[34px] items-center justify-center rounded-xl border border-dashed border-[#4c8bf5]/35 bg-[#f8fbff] text-[13px] font-black text-[#000080]/55">
              Champion TBD
            </div>
          )}

          <div className="mt-3 rounded-xl bg-[#f8fbff] px-3 py-2 text-[11px] font-bold text-slate-400">
            {champion ? `Final: ${champion.score}-${finalOpponent?.score} vs ${finalOpponent?.name}` : 'Winner will be confirmed after the Final.'}
          </div>
        </div>
      </div>
    </RoundCell>
  );
};

const DrawMatchModal = ({
  selection,
  marketLabel,
  categoryLabel,
  onPlayerClick,
  onClose
}: {
  selection: SelectedDrawMatch;
  marketLabel: string;
  categoryLabel: string;
  onPlayerClick?: (playerName: string) => void;
  onClose: () => void;
}) => {
  const { match, roundLabel, focusPlayerName } = selection;
  const players = [...match.players].sort((a, b) => {
    if (a.name === focusPlayerName) return -1;
    if (b.name === focusPlayerName) return 1;
    return 0;
  });
  const status = getMatchStatus(match);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <motion.div
        {...({
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        } as any)}
        className="absolute inset-0 bg-[#000080]/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        {...({
          initial: { opacity: 0, scale: 0.96, y: 18 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.96, y: 18 }
        } as any)}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full bg-white/80 p-2 text-slate-400 transition-colors hover:bg-white hover:text-[#000080]"
        >
          <X size={20} />
        </button>

        <div className="bg-[#4c8bf5]/10 p-6 pr-14 border-b border-[#4c8bf5]/10">
          <h3 className="text-xl font-black text-[#000080]">{roundLabel}</h3>
          <p className="mt-2 flex items-center gap-1 text-xs font-bold text-[#000080]/60">
            <MapPin size={12} />
            {marketLabel} · {categoryLabel}
          </p>
        </div>

        <div className="flex items-center justify-between border-b border-slate-50 px-6 py-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <GitBranch size={14} className="text-[#4c8bf5]" />
            {match.label}
          </div>
          <div className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
            status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {status}
          </div>
        </div>

        <div className="space-y-4 px-6 py-5">
          {players.map((player) => {
            const isFocus = player.name === focusPlayerName;
            const isWinner = player.isWinner;

            return (
              <div key={`${match.id}-${player.name}`} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onPlayerClick?.(player.name);
                      }}
                      className="min-w-0 truncate text-left text-sm font-black text-[#000080] transition-colors hover:text-[#4c8bf5] hover:underline focus:outline-none focus:ring-2 focus:ring-[#4c8bf5]/30"
                    >
                      {player.name}
                    </button>
                    {isFocus && <span className="text-xs font-black text-[#4c8bf5]/80">(Selected)</span>}
                    {isWinner && <CheckCircle size={16} className="shrink-0 text-green-500" />}
                  </div>
                </div>
                <span className={`flex h-10 w-12 shrink-0 items-center justify-center rounded-xl text-base font-black ${
                  isWinner ? 'bg-[#000080] text-white shadow-sm shadow-[#000080]/15' : 'bg-slate-50 text-slate-400'
                }`}>
                  {player.score}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

interface DrawSectionProps {
  onPlayerClick?: (playerName: string) => void;
}

export const DrawSection = ({ onPlayerClick }: DrawSectionProps) => {
  const [activeMarket, setActiveMarket] = useState<DrawMarketId>('globalFinals');
  const [activeCategory, setActiveCategory] = useState<DrawCategoryId>('men');
  const [drawResults, setDrawResults] = useState(() => loadDrawResults('globalFinals', 'men'));
  const [drawEntries, setDrawEntries] = useState(() => loadDrawEntries('globalFinals', 'men'));
  const [selectedMatch, setSelectedMatch] = useState<SelectedDrawMatch | null>(null);
  const activeMarketOption = DRAW_MARKET_OPTIONS.find((market) => market.id === activeMarket) || DRAW_MARKET_OPTIONS[0];
  const activeCategoryOption = DRAW_CATEGORY_OPTIONS.find((category) => category.id === activeCategory) || DRAW_CATEGORY_OPTIONS[0];

  useEffect(() => {
    const syncDrawResults = () => {
      setDrawEntries(loadDrawEntries(activeMarket, activeCategory));
      setDrawResults(loadDrawResults(activeMarket, activeCategory));
    };

    window.addEventListener(DRAW_RESULTS_UPDATED_EVENT, syncDrawResults);
    window.addEventListener('storage', syncDrawResults);
    return () => {
      window.removeEventListener(DRAW_RESULTS_UPDATED_EVENT, syncDrawResults);
      window.removeEventListener('storage', syncDrawResults);
    };
  }, [activeMarket, activeCategory]);

  const handleMarketChange = (marketId: DrawMarketId) => {
    setActiveMarket(marketId);
    setDrawEntries(loadDrawEntries(marketId, activeCategory));
    setDrawResults(loadDrawResults(marketId, activeCategory));
    setSelectedMatch(null);
  };

  const handleCategoryChange = (categoryId: DrawCategoryId) => {
    setActiveCategory(categoryId);
    setDrawEntries(loadDrawEntries(activeMarket, categoryId));
    setDrawResults(loadDrawResults(activeMarket, categoryId));
    setSelectedMatch(null);
  };

  const rounds = useMemo(() => buildDrawBracket(activeMarket, activeCategory, drawResults, drawEntries), [activeMarket, activeCategory, drawResults, drawEntries]);
  const [last32Round, last16Round, quarterFinalRound, semiFinalRound, finalRound] = rounds;

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-white px-6 py-16 lg:px-12 lg:py-24 xl:px-24">
      <motion.div
        {...({
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        } as any)}
        className="w-full mx-auto"
      >
        <header className="mb-12">
          <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-end 2xl:justify-between">
            <div className="min-w-0">
              <h1 className="text-3xl lg:text-7xl font-black text-[#000080] leading-tight uppercase mb-4">
                Tournament Draw
              </h1>
              <p className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.16em] text-xs lg:text-sm">
                <Filter size={14} className="text-[#4c8bf5]" />
                Filter by market & category
              </p>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2 2xl:w-auto">
              <div>
                <label className="block mb-2 text-[10px] font-black uppercase text-[#000080] tracking-wider">Market</label>
                <div className="relative">
                  <select
                    value={activeMarket}
                    onChange={(event) => handleMarketChange(event.target.value as DrawMarketId)}
                    className="w-full 2xl:w-56 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none font-bold text-[#000080] text-sm cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    {DRAW_MARKET_OPTIONS.map((market) => (
                      <option key={market.id} value={market.id}>{market.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4c8bf5] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-[10px] font-black uppercase text-[#000080] tracking-wider">Category</label>
                <div className="relative">
                  <select
                    value={activeCategory}
                    onChange={(event) => handleCategoryChange(event.target.value as DrawCategoryId)}
                    className="w-full 2xl:w-56 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none font-bold text-[#000080] text-sm cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    {DRAW_CATEGORY_OPTIONS.map((category) => (
                      <option key={category.id} value={category.id}>{category.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4c8bf5] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="px-4 py-1.5 bg-[#000080] text-white rounded-full text-[11px] font-black uppercase tracking-wider">
              {activeMarketOption.label}
            </div>
            <div className="px-4 py-1.5 bg-slate-200 text-slate-600 rounded-full text-[11px] font-black uppercase tracking-wider">
              {activeCategoryOption.label}
            </div>
          </div>
        </header>

        <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
          <div className="px-6 lg:px-8 py-5 bg-[#000080] text-white flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-black text-[#4c8bf5] uppercase tracking-[0.25em] mb-1">{activeMarketOption.label}</div>
              <h2 className="text-xl lg:text-2xl font-black uppercase">{activeCategoryOption.label}: Last 32 to Grand Winner</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/80">
              <Trophy size={16} className="text-[#4c8bf5]" />
              Draw match results
            </div>
          </div>

          <div className="overflow-x-auto bg-white p-4">
            <table className="w-full min-w-[1500px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[18%]" />
                <col className="w-[17%]" />
                <col className="w-[17%]" />
                <col className="w-[16%]" />
                <col className="w-[16%]" />
                <col className="w-[16%]" />
              </colgroup>
              <thead>
                <tr>
                  {[last32Round.label, last16Round.label, quarterFinalRound.label, semiFinalRound.label, finalRound.label, 'Grand Winner'].map((label, index) => (
                    <th
                      key={label}
                      className="px-3 py-3 text-xs font-black text-[#000080] uppercase tracking-widest"
                      style={{ background: HEADER_BACKGROUNDS[index] }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {last32Round.matches.map((match, index) => (
                  <tr key={match.id} style={{ height: ROW_HEIGHT }}>
                    <RoundCell roundIndex={0}>
                      <div className="px-5">
                        <MatchUnit match={match} roundLabel={last32Round.label} onSelectPlayer={setSelectedMatch} />
                      </div>
                    </RoundCell>

                    {index % 2 === 0 && (
                      <AdvancedMatchCell rounds={rounds} match={last16Round.matches[index / 2]} roundLabel={last16Round.label} roundIndex={1} matchIndex={index / 2} spanRows={2} onSelectPlayer={setSelectedMatch} />
                    )}

                    {index % 4 === 0 && (
                      <AdvancedMatchCell rounds={rounds} match={quarterFinalRound.matches[index / 4]} roundLabel={quarterFinalRound.label} roundIndex={2} matchIndex={index / 4} spanRows={4} onSelectPlayer={setSelectedMatch} />
                    )}

                    {index % 8 === 0 && (
                      <AdvancedMatchCell rounds={rounds} match={semiFinalRound.matches[index / 8]} roundLabel={semiFinalRound.label} roundIndex={3} matchIndex={index / 8} spanRows={8} onSelectPlayer={setSelectedMatch} />
                    )}

                    {index === 0 && (
                      <AdvancedMatchCell rounds={rounds} match={finalRound.matches[0]} roundLabel={finalRound.label} roundIndex={4} matchIndex={0} spanRows={16} onSelectPlayer={setSelectedMatch} />
                    )}

                    {index === 0 && <ChampionCell finalRound={finalRound} onSelectPlayer={setSelectedMatch} />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedMatch && (
          <DrawMatchModal
            selection={selectedMatch}
            marketLabel={activeMarketOption.label}
            categoryLabel={activeCategoryOption.label}
            onPlayerClick={onPlayerClick}
            onClose={() => setSelectedMatch(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
