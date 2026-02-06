
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
