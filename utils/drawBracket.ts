import { DEFAULT_DRAW_ENTRIES, DEFAULT_DRAW_RESULTS, DRAW_BRACKET_ROUNDS_BY_MARKET } from '../constants';
import { DrawCategoryId, DrawCompetitor, DrawMarketId, DrawMatch, DrawMatchEntry, DrawMatchResult, DrawRound, DrawRoundId } from '../types';

export const DRAW_ENTRIES_STORAGE_KEY = 'sailors-open-draw-entries';
export const DRAW_RESULTS_STORAGE_KEY = 'sailors-open-draw-results';
export const DRAW_RESULTS_UPDATED_EVENT = 'sailors-open-draw-results-updated';

const DEFAULT_CATEGORY_ID: DrawCategoryId = 'men';
const DEFAULT_MARKET_ID: DrawMarketId = 'globalFinals';

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
    ? { name: player.name, score: '—', isWinner: false }
    : toPendingCompetitor('TBD')
);

const getWinner = (match: DrawMatch) => match.players.find((player) => player.isWinner);

const resultMatchesPlayers = (match: DrawMatch, result: DrawMatchResult) => (
  result.p1Name === match.players[0].name && result.p2Name === match.players[1].name
);

const normalizeDrawResult = (result: DrawMatchResult): DrawMatchResult => {
  const marketId = result.marketId || DEFAULT_MARKET_ID;
  const categoryId = result.categoryId || DEFAULT_CATEGORY_ID;
  return {
    ...result,
    marketId,
    categoryId,
    id: result.id || `draw-${marketId}-${categoryId}-${result.matchId}`
  };
};

const normalizeDrawResults = (results: DrawMatchResult[]) => (
  results.map((result) => normalizeDrawResult(result))
);

const normalizeDrawEntry = (entry: DrawMatchEntry): DrawMatchEntry => {
  const marketId = entry.marketId || DEFAULT_MARKET_ID;
  const categoryId = entry.categoryId || DEFAULT_CATEGORY_ID;
  return {
    ...entry,
    marketId,
    categoryId,
    id: entry.id || `draw-entry-${marketId}-${categoryId}-${entry.matchId}`,
    p1Name: entry.p1Name || '',
    p2Name: entry.p2Name || ''
  };
};

const normalizeDrawEntries = (entries: DrawMatchEntry[]) => (
  entries.map((entry) => normalizeDrawEntry(entry))
);

const getMarketBaseRounds = (marketId: DrawMarketId, categoryId: DrawCategoryId) => (
  DRAW_BRACKET_ROUNDS_BY_MARKET[marketId]?.[categoryId] ||
  DRAW_BRACKET_ROUNDS_BY_MARKET[DEFAULT_MARKET_ID][DEFAULT_CATEGORY_ID]
);

const getScopedResults = (
  results: DrawMatchResult[],
  marketId: DrawMarketId,
  categoryId: DrawCategoryId
) => (
  normalizeDrawResults(results).filter((result) => result.marketId === marketId && result.categoryId === categoryId)
);

const getScopedEntries = (
  entries: DrawMatchEntry[],
  marketId: DrawMarketId,
  categoryId: DrawCategoryId
) => (
  normalizeDrawEntries(entries).filter((entry) => entry.marketId === marketId && entry.categoryId === categoryId)
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

export const buildDrawBracket = (
  marketId: DrawMarketId = DEFAULT_MARKET_ID,
  categoryId: DrawCategoryId = DEFAULT_CATEGORY_ID,
  results: DrawMatchResult[] = DEFAULT_DRAW_RESULTS,
  entries: DrawMatchEntry[] = DEFAULT_DRAW_ENTRIES
): DrawRound[] => {
  const scopedResults = getScopedResults(results, marketId, categoryId);
  const resultByMatch = new Map(scopedResults.map((result) => [result.matchId, result]));
  const entryByMatch = new Map(getScopedEntries(entries, marketId, categoryId).map((entry) => [entry.matchId, entry]));
  const baseRounds = getMarketBaseRounds(marketId, categoryId);
  const rounds: DrawRound[] = [];

  const last32Matches = baseRounds[0].matches.map((match) => {
    const entry = entryByMatch.get(match.id);
    const baseMatch: DrawMatch = {
      ...match,
      players: [
        { name: entry?.p1Name ?? match.players[0].name, score: '—', isWinner: false },
        { name: entry?.p2Name ?? match.players[1].name, score: '—', isWinner: false }
      ]
    };
    return applyResult(baseMatch, resultByMatch.get(baseMatch.id));
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
  match.players.every((player) => player.name.trim().length > 0 && !player.name.includes('TBD'))
);

export const isDrawMatchComplete = (match: DrawMatch) => (
  match.players.some((player) => player.isWinner)
);

export const getFlatDrawMatches = (rounds: DrawRound[]) => (
  rounds.flatMap((round) => round.matches.map((match) => ({ round, match })))
);

export const sanitizeDrawEntries = (entries: DrawMatchEntry[]) => (
  (Object.keys(DRAW_BRACKET_ROUNDS_BY_MARKET) as DrawMarketId[]).flatMap((marketId) => (
    (Object.keys(DRAW_BRACKET_ROUNDS_BY_MARKET[marketId]) as DrawCategoryId[]).flatMap((categoryId) => {
      const scopedEntries = getScopedEntries(entries, marketId, categoryId);
      const last32MatchIds = new Set(
        DRAW_BRACKET_ROUNDS_BY_MARKET[marketId][categoryId][0].matches.map((match) => match.id)
      );

      return scopedEntries.filter((entry) => last32MatchIds.has(entry.matchId));
    })
  ))
);

export const sanitizeDrawResults = (
  results: DrawMatchResult[],
  entries: DrawMatchEntry[] = DEFAULT_DRAW_ENTRIES
) => (
  (Object.keys(DRAW_BRACKET_ROUNDS_BY_MARKET) as DrawMarketId[]).flatMap((marketId) => (
    (Object.keys(DRAW_BRACKET_ROUNDS_BY_MARKET[marketId]) as DrawCategoryId[]).flatMap((categoryId) => {
      const scopedResults = getScopedResults(results, marketId, categoryId);
      const rounds = buildDrawBracket(marketId, categoryId, scopedResults, entries);
      const validMatches = new Map(
        getFlatDrawMatches(rounds).map(({ match }) => [match.id, match])
      );

      return scopedResults.filter((result) => {
        const match = validMatches.get(result.matchId);
        return Boolean(match && resultMatchesPlayers(match, result));
      });
    })
  ))
);

export const loadDrawEntries = (marketId?: DrawMarketId, categoryId?: DrawCategoryId): DrawMatchEntry[] => {
  const getMaybeScopedEntries = (entries: DrawMatchEntry[]) => (
    marketId && categoryId ? getScopedEntries(entries, marketId, categoryId) : normalizeDrawEntries(entries)
  );

  if (typeof window === 'undefined') {
    return getMaybeScopedEntries(DEFAULT_DRAW_ENTRIES);
  }

  const stored = window.localStorage.getItem(DRAW_ENTRIES_STORAGE_KEY);
  if (!stored) {
    return getMaybeScopedEntries(DEFAULT_DRAW_ENTRIES);
  }

  try {
    const parsed = JSON.parse(stored) as DrawMatchEntry[];
    const sanitized = sanitizeDrawEntries(parsed);
    return getMaybeScopedEntries(sanitized);
  } catch {
    return getMaybeScopedEntries(DEFAULT_DRAW_ENTRIES);
  }
};

export const loadDrawResults = (marketId?: DrawMarketId, categoryId?: DrawCategoryId): DrawMatchResult[] => {
  const getMaybeScopedResults = (results: DrawMatchResult[]) => (
    marketId && categoryId ? getScopedResults(results, marketId, categoryId) : normalizeDrawResults(results)
  );
  const entries = typeof window === 'undefined' ? DEFAULT_DRAW_ENTRIES : loadDrawEntries();

  if (typeof window === 'undefined') {
    return getMaybeScopedResults(sanitizeDrawResults(DEFAULT_DRAW_RESULTS, entries));
  }

  const stored = window.localStorage.getItem(DRAW_RESULTS_STORAGE_KEY);
  if (!stored) {
    return getMaybeScopedResults(sanitizeDrawResults(DEFAULT_DRAW_RESULTS, entries));
  }

  try {
    const parsed = JSON.parse(stored) as DrawMatchResult[];
    const sanitized = sanitizeDrawResults(parsed, entries);
    return getMaybeScopedResults(sanitized);
  } catch {
    return getMaybeScopedResults(sanitizeDrawResults(DEFAULT_DRAW_RESULTS, entries));
  }
};

export const saveDrawEntries = (
  entries: DrawMatchEntry[],
  marketId?: DrawMarketId,
  categoryId?: DrawCategoryId
) => {
  if (typeof window === 'undefined') return;

  const nextEntries = marketId && categoryId
    ? [
      ...loadDrawEntries().filter((entry) => !(entry.marketId === marketId && entry.categoryId === categoryId)),
      ...entries.map((entry) => ({ ...entry, marketId, categoryId }))
    ]
    : entries;
  const sanitized = sanitizeDrawEntries(nextEntries);

  window.localStorage.setItem(DRAW_ENTRIES_STORAGE_KEY, JSON.stringify(sanitized));
  window.dispatchEvent(new CustomEvent(DRAW_RESULTS_UPDATED_EVENT, { detail: { marketId, categoryId, entries: true } }));
};

export const saveDrawResults = (
  results: DrawMatchResult[],
  marketId?: DrawMarketId,
  categoryId?: DrawCategoryId
) => {
  if (typeof window === 'undefined') return;

  const nextResults = marketId && categoryId
    ? [
      ...loadDrawResults().filter((result) => !(result.marketId === marketId && result.categoryId === categoryId)),
      ...results.map((result) => ({ ...result, marketId, categoryId }))
    ]
    : results;
  const sanitized = sanitizeDrawResults(nextResults, loadDrawEntries());

  window.localStorage.setItem(DRAW_RESULTS_STORAGE_KEY, JSON.stringify(sanitized));
  window.dispatchEvent(new CustomEvent(DRAW_RESULTS_UPDATED_EVENT, { detail: { marketId, categoryId } }));
};
