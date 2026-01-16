
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
  mensDoubles: string;
  womensSingles: string;
  womensDoubles: string;
}

export interface ContactEntry {
  market: string;
  city: string;
  committee: string[];
}