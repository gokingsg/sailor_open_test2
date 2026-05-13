
export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum AnimationVariant {
  FADE_IN = 'fadeIn',
  SLIDE_UP = 'slideUp',
  STAGGER_CHILDREN = 'staggerChildren'
}

// Tournament specific types
export type AppView = 'home' | 'draw' | 'history' | 'leaderboard' | 'registration' | 'test';

export interface MatchmakerOption {
  id: string;
  tag?: string;
  label: string;
}

export interface MatchmakerQuestion {
  id: number;
  question: string;
  isMultiSelect?: boolean;
  options: MatchmakerOption[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  played: number;
  won: number;
  lost: number;
  setsW: number;
  setsL: number;
  gamesW: number;
  gamesL: number;
  gamesPct: string;
  points: number;
}

export interface PrizeEntry {
  position: string;
  mensSingles: string;
  womensSingles: string;
}

export interface ContactEntry {
  market: string;
  city: string;
  committee: string[];
}

export interface MatchPlayer {
  name: string;
  avatar?: string; // Initial or image url
  isWinner: boolean;
  scores: (string | number)[]; // Array for sets, e.g. [6, 4] or ['-']
}

export interface MatchRecord {
  id: string;
  leagueName: string;
  season: string;
  market: string;
  city: string;
  date: string;
  time: string;
  status: 'Completed' | 'Walkover' | 'In Progress' | 'Cancelled';
  player1: MatchPlayer;
  player2: MatchPlayer;
}

export type DrawHalf = 'left' | 'right';

export interface DrawSlot {
  label: string;
  score: string;
  meta?: string;
}

export interface DrawQuarter {
  id: string;
  half: DrawHalf;
  title: string;
  subtitle: string;
  last32: DrawSlot[];
  last16: DrawSlot[];
  quarterFinal: DrawSlot[];
  winner: DrawSlot;
}

export interface DrawSemiFinal {
  id: string;
  title: string;
  players: DrawSlot[];
  finalist: DrawSlot;
}

export interface DrawFinals {
  semiFinals: DrawSemiFinal[];
  final: {
    players: DrawSlot[];
    champion: DrawSlot;
  };
}

export interface DrawCompetitor {
  name: string;
  score: string;
  isWinner: boolean;
}

export type DrawRoundId = 'last32' | 'last16' | 'quarterFinal' | 'semiFinal' | 'final';
export type DrawCategoryId = 'men' | 'women';
export type DrawMarketId = 'globalFinals';

export interface DrawCategoryOption {
  id: DrawCategoryId;
  label: string;
  shortLabel: string;
}

export interface DrawMarketOption {
  id: DrawMarketId;
  label: string;
}

export interface DrawMatch {
  id: string;
  label: string;
  players: [DrawCompetitor, DrawCompetitor];
}

export interface DrawRound {
  id: DrawRoundId;
  label: string;
  matches: DrawMatch[];
}

export interface DrawMatchEntry {
  id: string;
  marketId: DrawMarketId;
  categoryId: DrawCategoryId;
  matchId: string;
  p1Name: string;
  p2Name: string;
  updatedAt: string;
}

export interface DrawMatchResult {
  id: string;
  marketId: DrawMarketId;
  categoryId: DrawCategoryId;
  matchId: string;
  roundId: DrawRoundId;
  matchLabel: string;
  p1Name: string;
  p2Name: string;
  p1Score: string;
  p2Score: string;
  winnerIndex: 0 | 1;
  proofFile?: string | null;
  updatedAt: string;
}
