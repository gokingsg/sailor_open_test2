import { DEFAULT_DRAW_RESULTS, DRAW_BRACKET_ROUNDS } from '../constants';
import { DrawCompetitor, DrawMatch, DrawMatchResult, DrawRound, DrawRoundId } from '../types';

export const DRAW_RESULTS_STORAGE_KEY = 'sailors-open-draw-results';
export const DRAW_RESULTS_UPDATED_EVENT = 'sailors-open-draw-results-updated';

const ROUND_LABELS: Record<DrawRoundId, string> = {
  last32: 'Last 32',
  last16: 'Last 16',
  quarterFinal: 'Quarter-Final',
  semiFinal: 'Semi-Final',
  final: 'Final'
};

const ROUND_MATCH_PREFIX: Record<DrawRoundId, string> = {
  last32: 'r32',
  last16: 'r16',
  quarterFinal: 'qf',
  semiFinal: 'sf',
  final: 'final'
};

const ROUND_MATCH_LABEL: Record<DrawRoundId, string> = {
  last32: 'Match',
  last16: 'R16 Match',
  quarterFinal: 'QF',
  semiFinal: 'Semi-Final',
  final: 'Grand Final'
};

const ROUND_IDS: DrawRoundId[] = ['last32', 'last16', 'quarterFinal', 'semiFinal', 'final'];

const toPendingCompetitor = (name: string): DrawCompetitor => ({
  name,
  score: '—',
  isWinner: false
});

const toAdvancingCompetitor = (player?: DrawCompetitor): DrawCompetitor => (
  player
    ? { name: player.name, seed: player.seed, score: '—', isWinner: false }
    : toPendingCompetitor('TBD')
);

const getWinner = (match: DrawMatch) => match.players.find((player) => player.isWinner);

const resultMatchesPlayers = (match: DrawMatch, result: DrawMatchResult) => (
  result.p1Name === match.players[0].name && result.p2Name === match.players[1].name
);

const applyResult = (match: DrawMatch, result?: DrawMatchResult): DrawMatch => {
  if (!result || !resultMatchesPlayers(match, result)) return match;

  return {
    ...match,
    players: [
      {
        ...match.players[0],
        score: result.p1Score || '—',
        isWinner: result.winnerIndex === 0
      },
      {
        ...match.players[1],
        score: result.p2Score || '—',
        isWinner: result.winnerIndex === 1
      }
    ]
  };
};

const createMatchId = (roundId: DrawRoundId, matchIndex: number) => (
  roundId === 'final' ? 'final-1' : `${ROUND_MATCH_PREFIX[roundId]}-${matchIndex + 1}`
);

const createMatchLabel = (roundId: DrawRoundId, matchIndex: number) => (
  roundId === 'final' ? ROUND_MATCH_LABEL[roundId] : `${ROUND_MATCH_LABEL[roundId]} ${matchIndex + 1}`
);

const getPlaceholderName = (roundId: DrawRoundId) => {
  if (roundId === 'final') return 'Finalist TBD';
  if (roundId === 'semiFinal') return 'Semi-Finalist TBD';
  if (roundId === 'quarterFinal') return 'QF TBD';
  return 'Winner TBD';
};

export const buildDrawBracket = (results: DrawMatchResult[] = DEFAULT_DRAW_RESULTS): DrawRound[] => {
  const resultByMatch = new Map(results.map((result) => [result.matchId, result]));
  const rounds: DrawRound[] = [];

  const last32Matches = DRAW_BRACKET_ROUNDS[0].matches.map((match) => {
    const seededMatch: DrawMatch = {
      ...match,
      players: [
        { name: match.players[0].name, seed: match.players[0].seed, score: '—', isWinner: false },
        { name: match.players[1].name, seed: match.players[1].seed, score: '—', isWinner: false }
      ]
    };
    return applyResult(seededMatch, resultByMatch.get(seededMatch.id));
  });

  rounds.push({ id: 'last32', label: ROUND_LABELS.last32, matches: last32Matches });

  ROUND_IDS.slice(1).forEach((roundId, roundIndex) => {
    const previousRound = rounds[roundIndex];
    const matchCount = previousRound.matches.length / 2;
    const matches = Array.from({ length: matchCount }, (_, matchIndex) => {
      const sourceA = getWinner(previousRound.matches[matchIndex * 2]);
      const sourceB = getWinner(previousRound.matches[matchIndex * 2 + 1]);
      const p1 = sourceA ? toAdvancingCompetitor(sourceA) : toPendingCompetitor(getPlaceholderName(roundId));
      const p2 = sourceB ? toAdvancingCompetitor(sourceB) : toPendingCompetitor(getPlaceholderName(roundId));
      const match: DrawMatch = {
        id: createMatchId(roundId, matchIndex),
        label: createMatchLabel(roundId, matchIndex),
        players: [p1, p2]
      };

      return applyResult(match, resultByMatch.get(match.id));
    });

    rounds.push({ id: roundId, label: ROUND_LABELS[roundId], matches });
  });

  return rounds;
};

export const isDrawMatchReady = (match: DrawMatch) => (
  match.players.every((player) => !player.name.includes('TBD'))
);

export const isDrawMatchComplete = (match: DrawMatch) => (
  match.players.some((player) => player.isWinner)
);

export const getFlatDrawMatches = (rounds: DrawRound[]) => (
  rounds.flatMap((round) => round.matches.map((match) => ({ round, match })))
);

export const sanitizeDrawResults = (results: DrawMatchResult[]) => {
  const rounds = buildDrawBracket(results);
  const validMatches = new Map(
    getFlatDrawMatches(rounds).map(({ match }) => [match.id, match])
  );

  return results.filter((result) => {
    const match = validMatches.get(result.matchId);
    return Boolean(match && resultMatchesPlayers(match, result));
  });
};

export const loadDrawResults = (): DrawMatchResult[] => {
  if (typeof window === 'undefined') return DEFAULT_DRAW_RESULTS;

  const stored = window.localStorage.getItem(DRAW_RESULTS_STORAGE_KEY);
  if (!stored) return DEFAULT_DRAW_RESULTS;

  try {
    const parsed = JSON.parse(stored) as DrawMatchResult[];
    return sanitizeDrawResults(parsed);
  } catch {
    return DEFAULT_DRAW_RESULTS;
  }
};

export const saveDrawResults = (results: DrawMatchResult[]) => {
  if (typeof window === 'undefined') return;

  const sanitized = sanitizeDrawResults(results);
  window.localStorage.setItem(DRAW_RESULTS_STORAGE_KEY, JSON.stringify(sanitized));
  window.dispatchEvent(new CustomEvent(DRAW_RESULTS_UPDATED_EVENT));
};

