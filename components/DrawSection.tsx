import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, GitBranch, Trophy } from 'lucide-react';
import { DrawCompetitor, DrawMatch, DrawRound } from '../types';
import { buildDrawBracket, DRAW_RESULTS_UPDATED_EVENT, loadDrawResults } from '../utils/drawBracket';

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

const PlayerLine = ({ player, isPending = false }: { player: DrawCompetitor; isPending?: boolean }) => (
  <div
    className={`relative grid grid-cols-[20px_minmax(0,1fr)_18px_36px] items-center gap-2 rounded-xl border bg-white px-2 text-[13px] shadow-sm ${
      player.isWinner || isPending
        ? 'border-[#4c8bf5]/25 text-[#000080] shadow-[#4c8bf5]/10'
        : 'border-slate-100 text-slate-400'
    }`}
    style={{ height: PLAYER_HEIGHT }}
  >
    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
      player.isWinner || isPending ? 'bg-[#4c8bf5] text-white' : 'bg-slate-100 text-slate-400'
    }`}>
      {player.seed ?? '—'}
    </span>
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
  </div>
);

const MatchUnit = ({ match, spanRows = 1 }: { match: DrawMatch; spanRows?: number }) => (
  <div
    className="relative box-border flex flex-col justify-center gap-2.5"
    style={{ height: MATCH_HEIGHT, marginTop: getCenteredMatchTop(spanRows) }}
  >
    <PlayerLine player={match.players[0]} isPending={!match.players.some((player) => player.isWinner)} />
    <PlayerLine player={match.players[1]} isPending={!match.players.some((player) => player.isWinner)} />
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

const AdvancedMatchCell = ({ match, rounds, roundIndex, matchIndex, spanRows }: {
  match: DrawMatch;
  rounds: DrawRound[];
  roundIndex: number;
  matchIndex: number;
  spanRows: number;
}) => (
  <RoundCell roundIndex={roundIndex} spanRows={spanRows}>
    <PairConnector rounds={rounds} roundIndex={roundIndex} matchIndex={matchIndex} />
    <div className="pl-[26px] pr-5">
      <MatchUnit match={match} spanRows={spanRows} />
    </div>
  </RoundCell>
);

const ChampionCell = ({ finalRound }: { finalRound: DrawRound }) => {
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
            <PlayerLine player={champion} />
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

export const DrawSection = () => {
  const [drawResults, setDrawResults] = useState(() => loadDrawResults());

  useEffect(() => {
    const syncDrawResults = () => setDrawResults(loadDrawResults());

    window.addEventListener(DRAW_RESULTS_UPDATED_EVENT, syncDrawResults);
    window.addEventListener('storage', syncDrawResults);
    return () => {
      window.removeEventListener(DRAW_RESULTS_UPDATED_EVENT, syncDrawResults);
      window.removeEventListener('storage', syncDrawResults);
    };
  }, []);

  const rounds = useMemo(() => buildDrawBracket(drawResults), [drawResults]);
  const [last32Round, last16Round, quarterFinalRound, semiFinalRound, finalRound] = rounds;

  return (
    <section className="relative px-4 lg:px-6 xl:px-8 py-12 lg:py-20 bg-slate-50 min-h-screen">
      <motion.div
        {...({
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        } as any)}
        className="w-full mx-auto"
      >
        <header className="mb-10">
          <div className="flex items-center gap-2 text-[#4c8bf5] font-black uppercase tracking-[0.25em] text-xs mb-4">
            <GitBranch size={16} />
            Last 32 Bracket
          </div>
          <h1 className="text-3xl lg:text-6xl font-black text-[#000080] leading-tight uppercase mb-4">
            Tournament Draw
          </h1>
          <p className="max-w-3xl text-slate-500 font-medium leading-relaxed">
            A compact bracket table with mock scores, winners, and connected advancement paths.
          </p>
        </header>

        <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
          <div className="px-6 lg:px-8 py-5 bg-[#000080] text-white flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-black text-[#4c8bf5] uppercase tracking-[0.25em] mb-1">Sailors Open 2026</div>
              <h2 className="text-xl lg:text-2xl font-black uppercase">Last 32 to Grand Winner</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/80">
              <Trophy size={16} className="text-[#4c8bf5]" />
              Mock match results
            </div>
          </div>

          <div className="overflow-x-auto bg-slate-100/70 p-4">
            <table className="w-full min-w-[1500px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[18%]" />
                <col className="w-[18%]" />
                <col className="w-[17%]" />
                <col className="w-[16%]" />
                <col className="w-[13%]" />
                <col className="w-[18%]" />
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
                        <MatchUnit match={match} />
                      </div>
                    </RoundCell>

                    {index % 2 === 0 && (
                      <AdvancedMatchCell rounds={rounds} match={last16Round.matches[index / 2]} roundIndex={1} matchIndex={index / 2} spanRows={2} />
                    )}

                    {index % 4 === 0 && (
                      <AdvancedMatchCell rounds={rounds} match={quarterFinalRound.matches[index / 4]} roundIndex={2} matchIndex={index / 4} spanRows={4} />
                    )}

                    {index % 8 === 0 && (
                      <AdvancedMatchCell rounds={rounds} match={semiFinalRound.matches[index / 8]} roundIndex={3} matchIndex={index / 8} spanRows={8} />
                    )}

                    {index === 0 && (
                      <AdvancedMatchCell rounds={rounds} match={finalRound.matches[0]} roundIndex={4} matchIndex={0} spanRows={16} />
                    )}

                    {index === 0 && <ChampionCell finalRound={finalRound} />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
