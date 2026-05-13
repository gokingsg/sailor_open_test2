
import { MatchmakerQuestion, LeaderboardEntry, PrizeEntry, ContactEntry, MatchRecord, DrawQuarter, DrawFinals, DrawRound, DrawMatchResult, DrawRoundId, DrawCategoryId, DrawCategoryOption, DrawMarketId, DrawMarketOption } from './types';

export const ASSETS = {
  logo: "/logo.png",
  wave: "https://res.cloudinary.com/dfm67v8v3/image/upload/v1740051187/Wave_Graphics_p7e5u6.png",
  sidebarPattern: "/bg_left_bar.png"
};

export const CATEGORIES = [
  "Men's Singles",
  "Women's Singles"
];

export const DRAW_CATEGORY_OPTIONS: DrawCategoryOption[] = [
  { id: 'men', label: "Men's Singles", shortLabel: 'Men' },
  { id: 'women', label: "Women's Singles", shortLabel: 'Women' }
];

export const DRAW_MARKET_OPTIONS: DrawMarketOption[] = [
  { id: 'globalFinals', label: 'Global Finals' }
];

export const LOCATIONS: Record<string, string[]> = {
  "Brazil": ["Sao Paulo", "Others"],
  "China": ["Beijing", "Shanghai", "Shenzhen", "Others"],
  "Indonesia": ["Jakarta", "Yogyakarta", "Solo", "Others"],
  "Korea": ["Seoul", "Others"],
  "Malaysia": ["Kuala Lumpur", "Penang", "Perak", "Others"],
  "Mexico": ["Mexico City", "Others"],
  "Philippines": ["Mandaluyong", "Laguna", "Bulacan", "Others"],
  "Singapore": ["Singapore"],
  "Taiwan": ["Taipei", "Taichung", "Others"],
  "Thailand": ["Bangkok", "Others"],
  "Vietnam": ["Hanoi", "Ho Chi Minh City", "Others"]
};

export const RATING_PROGRAMS = ["NTRP", "Brazil Class", "WTN", "UTR"];

export const RATINGS_MAP: Record<string, string[]> = {
  "NTRP": ["1.5 – 2.0", "3.0 – 3.5", "4.0 – 4.5", "5.0 – 6.0"],
  "Brazil Class": ["5ª Classe", "4ª / 3ª Classe", "2ª Classe", "1ª Classe"],
  "WTN": ["35 – 40", "25 – 30", "15 – 20", "1 – 10"],
  "UTR": ["1 – 2", "3 – 5", "6 – 8", "9 – 12"]
};

export const QUESTIONS: MatchmakerQuestion[] = [
  {
    id: 1,
    question: "1. What is your history with the racket?",
    options: [
      { id: 'q1-o1', tag: 'Fresh Start', label: "I have never played, or I haven't picked up a racket in years." },
      { id: 'q1-o2', tag: 'Casual Cruiser', label: "I play occasionally. I can usually get the ball over the net." },
      { id: 'q1-o3', tag: 'Regular Hitter', label: "I play once a week or more. I’m comfortable with rallies." },
      { id: 'q1-o4', tag: 'Competitive Edge', label: "I play in a league or have had professional coaching." }
    ]
  },
  {
    id: 2,
    question: "2. How do you feel about the rules of the game?",
    options: [
      { id: 'q2-o1', label: "\"Wait, how do we count points again?\"" },
      { id: 'q2-o2', label: "I know the basics: Love, 15, 30, 40..." },
      { id: 'q2-o3', label: "I’m a pro—I know all about tie-breakers and deuce." }
    ]
  },
  {
    id: 3,
    question: "3. Choose your \"Tournament Spirit\"",
    options: [
      { id: 'q3-o1', label: "The Socialite: I’m here for photos and meeting people." },
      { id: 'q3-o2', label: "The Sporty Soul: I want a workout and friendly rallies." },
      { id: 'q3-o3', label: "The Challenger: I love the thrill of the game and fair competition." }
    ]
  },
  {
    id: 4,
    question: "4. If a ball is flying toward you at high speed, you are most likely to:",
    options: [
      { id: 'q4-o1', label: "Laugh, duck, and hope for the best!" },
      { id: 'q4-o2', label: "Attempt a return and see where it lands." },
      { id: 'q4-o3', label: "Adjust my feet and aim for a cross-court winner." }
    ]
  },
  {
    id: 5,
    question: "5. What would make this event a \"Win\" for you? (Select all that apply)",
    isMultiSelect: true,
    options: [
      { id: 'q5-o1', label: "Not hitting my partner with the ball." },
      { id: 'q5-o2', label: "Making new friends from other offices." },
      { id: 'q5-o3', label: "Winning a few games or a set." },
      { id: 'q5-o4', label: "Enjoying the post-match celebrations!" }
    ]
  }
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, name: "Arran Kenna", played: 5, won: 5, lost: 0, setsW: 10, setsL: 1, gamesW: 65, gamesL: 32, gamesPct: "67.01%", points: 15 },
  { rank: 2, name: "David Chen", played: 4, won: 3, lost: 1, setsW: 6, setsL: 3, gamesW: 48, gamesL: 40, gamesPct: "54.55%", points: 10 },
  { rank: 3, name: "Simon Swenson", played: 5, won: 2, lost: 3, setsW: 5, setsL: 7, gamesW: 45, gamesL: 55, gamesPct: "45.00%", points: 9 },
  { rank: 4, name: "Ethan Harker", played: 4, won: 1, lost: 3, setsW: 2, setsL: 6, gamesW: 30, gamesL: 42, gamesPct: "41.67%", points: 6 },
  { rank: 5, name: "Clyde Densel Duran", played: 4, won: 0, lost: 4, setsW: 0, setsL: 8, gamesW: 22, gamesL: 48, gamesPct: "31.43%", points: 4 },
];

export const GLOBAL_PRIZES: PrizeEntry[] = [
  { position: "1st", mensSingles: "10,000", womensSingles: "10,000" },
  { position: "2nd", mensSingles: "8,000", womensSingles: "8,000" },
  { position: "3rd & 4th", mensSingles: "5,000", womensSingles: "5,000" },
  { position: "5th - 8th", mensSingles: "3,000", womensSingles: "3,000" },
];

export const MARKET_PRIZES: PrizeEntry[] = [
  { position: "1st", mensSingles: "2,000", womensSingles: "2,000" },
  { position: "2nd", mensSingles: "1,600", womensSingles: "1,600" },
  { position: "3rd", mensSingles: "1,000", womensSingles: "1,000" },
  { position: "4th", mensSingles: "1,000", womensSingles: "1,000" },
];

export const CONTACT_DATA: ContactEntry[] = [
  { market: "Brazil", city: "Sao Paulo", committee: ["Pine Kyaw (pine.kyaw@shopee.com)", "Belle (colmane@garena.com)"] },
  { market: "China", city: "Beijing\nShanghai\nShenzhen", committee: ["Aaron Wang (aaron.wang@shopee.com)", "Lily (yang.lily@shopee.com)", "Carrie (jiajun.chen@garena.com)"] },
  { market: "Indonesia", city: "Jakarta\nYogyakarta", committee: ["Isfana (isfana.arhami@shopee.com)", "Asta (putric@garena.co.id)"] },
  { market: "Korea", city: "Seoul", committee: ["Minsu Cho (minsu.cho@shopee.com)", "Si Young (leesy@garena.com)"] },
  { market: "Malaysia", city: "Kuala Lumpur", committee: ["Eunice (eunice.low@shopee.com)"] },
  { market: "Mexico", city: "Mexico City", committee: ["Rodrigo (chavezr@garena.com)"] },
  { market: "Philippines", city: "Manila", committee: ["Redg (redg.mendoza@shopee.com)"] },
  { market: "Singapore", city: "Singapore", committee: ["Jenn (jenn.teoje@shopee.com)", "Li Yan (ongly@garena.com)", "Rae-Ann (rawu@garena.com)"] },
  { market: "Taiwan", city: "Taipei", committee: ["Alice Wu (alice.wu@shopee.com)", "Toby (lutob@garena.com)"] },
  { market: "Thailand", city: "Bangkok", committee: ["Mint (mint.amornwutthisutja@shopee.com)", "Bank (akaraphon.s@sea.com)"] },
  { market: "Vietnam", city: "Hanoi\nHo Chi Minh City", committee: ["Tram (tram.dinh@shopee.com)", "Van Anh (vananh.tran@garena.vn)", "Linh (manhlinh.nguyen@garena.vn)"] },
];

export const MATCH_HISTORY_DATA: MatchRecord[] = [
  {
    id: "m4",
    leagueName: "City League",
    season: "December - February 2025/26",
    market: "Singapore",
    city: "Singapore",
    date: "JAN 12, 2026",
    time: "7:00 PM",
    status: "Completed",
    player1: { name: "Arran Kenna", isWinner: false, scores: [4] },
    player2: { name: "David Chen", isWinner: true, scores: [6] }
  },
  {
    id: "m1",
    leagueName: "City League",
    season: "December - February 2025/26",
    market: "Singapore",
    city: "Singapore",
    date: "JAN 10, 2026",
    time: "3:00 PM",
    status: "Completed",
    player1: { name: "Ethan Harker", isWinner: false, scores: [5] },
    player2: { name: "Arran Kenna", isWinner: true, scores: [7] }
  },
  {
    id: "m2",
    leagueName: "City League",
    season: "December - February 2025/26",
    market: "Singapore",
    city: "Singapore",
    date: "JAN 4, 2026",
    time: "6:00 PM",
    status: "Walkover",
    player1: { name: "Clyde Densel Duran", isWinner: false, scores: ["-"] },
    player2: { name: "Arran Kenna", isWinner: true, scores: ["-"] }
  },
  {
    id: "m3",
    leagueName: "City League",
    season: "December - February 2025/26",
    market: "Singapore",
    city: "Singapore",
    date: "JAN 4, 2026",
    time: "4:00 PM",
    status: "Completed",
    player1: { name: "Arran Kenna", isWinner: true, scores: [6] },
    player2: { name: "Simon Swenson", isWinner: false, scores: [4] }
  }
];

const createDrawSlots = (startSeed: number, count: number, label = "Player name") => (
  Array.from({ length: count }, (_, index) => ({
    label,
    score: "___",
    meta: `Seed ${String(startSeed + index).padStart(2, '0')}`
  }))
);

const createWinnerSlots = (prefix: string, count: number) => (
  Array.from({ length: count }, (_, index) => ({
    label: `${prefix} ${index + 1}`,
    score: "___"
  }))
);

export const DRAW_QUARTERS: DrawQuarter[] = [
  {
    id: "qf1",
    half: "left",
    title: "QF1",
    subtitle: "Left Half - Top Quarter",
    last32: createDrawSlots(1, 8),
    last16: createWinnerSlots("Last 16 slot", 4),
    quarterFinal: createWinnerSlots("Quarter-final slot", 2),
    winner: { label: "QF1 Winner", score: "___" }
  },
  {
    id: "qf2",
    half: "left",
    title: "QF2",
    subtitle: "Left Half - Bottom Quarter",
    last32: createDrawSlots(9, 8),
    last16: createWinnerSlots("Last 16 slot", 4),
    quarterFinal: createWinnerSlots("Quarter-final slot", 2),
    winner: { label: "QF2 Winner", score: "___" }
  },
  {
    id: "qf3",
    half: "right",
    title: "QF3",
    subtitle: "Right Half - Top Quarter",
    last32: createDrawSlots(17, 8),
    last16: createWinnerSlots("Last 16 slot", 4),
    quarterFinal: createWinnerSlots("Quarter-final slot", 2),
    winner: { label: "QF3 Winner", score: "___" }
  },
  {
    id: "qf4",
    half: "right",
    title: "QF4",
    subtitle: "Right Half - Bottom Quarter",
    last32: createDrawSlots(25, 8),
    last16: createWinnerSlots("Last 16 slot", 4),
    quarterFinal: createWinnerSlots("Quarter-final slot", 2),
    winner: { label: "QF4 Winner", score: "___" }
  }
];

export const DRAW_FINALS: DrawFinals = {
  semiFinals: [
    {
      id: "sf1",
      title: "Semi-Final 1",
      players: [
        { label: "QF1 Winner", score: "___" },
        { label: "QF2 Winner", score: "___" }
      ],
      finalist: { label: "Finalist", score: "___" }
    },
    {
      id: "sf2",
      title: "Semi-Final 2",
      players: [
        { label: "QF3 Winner", score: "___" },
        { label: "QF4 Winner", score: "___" }
      ],
      finalist: { label: "Finalist", score: "___" }
    }
  ],
  final: {
    players: [
      { label: "Finalist", score: "___" },
      { label: "Finalist", score: "___" }
    ],
    champion: { label: "Grand Winner", score: "___" }
  }
};

export const DRAW_BRACKET_ROUNDS: DrawRound[] = [
  {
    id: "last32",
    label: "Last 32",
    matches: [
      { id: "r32-1", label: "Match 1", players: [{ name: "Arran Kenna", seed: 1, score: "6", isWinner: true }, { name: "Luis Ortega", seed: 32, score: "2", isWinner: false }] },
      { id: "r32-2", label: "Match 2", players: [{ name: "Mark Tan", seed: 16, score: "7", isWinner: true }, { name: "Daniel Kim", seed: 17, score: "6", isWinner: false }] },
      { id: "r32-3", label: "Match 3", players: [{ name: "David Chen", seed: 8, score: "6", isWinner: true }, { name: "Nikhil Rao", seed: 25, score: "4", isWinner: false }] },
      { id: "r32-4", label: "Match 4", players: [{ name: "Ethan Harker", seed: 9, score: "6", isWinner: false }, { name: "Rafael Santos", seed: 24, score: "7", isWinner: true }] },
      { id: "r32-5", label: "Match 5", players: [{ name: "Simon Swenson", seed: 4, score: "6", isWinner: true }, { name: "Hiro Tanaka", seed: 29, score: "1", isWinner: false }] },
      { id: "r32-6", label: "Match 6", players: [{ name: "Ben Lim", seed: 13, score: "5", isWinner: false }, { name: "Marco Silva", seed: 20, score: "7", isWinner: true }] },
      { id: "r32-7", label: "Match 7", players: [{ name: "Clyde Densel Duran", seed: 5, score: "6", isWinner: false }, { name: "Miguel Reyes", seed: 28, score: "7", isWinner: true }] },
      { id: "r32-8", label: "Match 8", players: [{ name: "Jason Lee", seed: 12, score: "6", isWinner: true }, { name: "Alex Nguyen", seed: 21, score: "3", isWinner: false }] },
      { id: "r32-9", label: "Match 9", players: [{ name: "Noah Wong", seed: 2, score: "6", isWinner: true }, { name: "Arjun Mehta", seed: 31, score: "0", isWinner: false }] },
      { id: "r32-10", label: "Match 10", players: [{ name: "Kevin Park", seed: 15, score: "4", isWinner: false }, { name: "Tomas Garcia", seed: 18, score: "6", isWinner: true }] },
      { id: "r32-11", label: "Match 11", players: [{ name: "Wei Ming", seed: 7, score: "7", isWinner: true }, { name: "Phuc Tran", seed: 26, score: "5", isWinner: false }] },
      { id: "r32-12", label: "Match 12", players: [{ name: "Paulo Mendes", seed: 10, score: "6", isWinner: true }, { name: "Jack Wilson", seed: 23, score: "4", isWinner: false }] },
      { id: "r32-13", label: "Match 13", players: [{ name: "Andre Costa", seed: 3, score: "6", isWinner: true }, { name: "Kenji Sato", seed: 30, score: "3", isWinner: false }] },
      { id: "r32-14", label: "Match 14", players: [{ name: "Owen Chua", seed: 14, score: "6", isWinner: true }, { name: "Krit Wong", seed: 19, score: "2", isWinner: false }] },
      { id: "r32-15", label: "Match 15", players: [{ name: "Felix Lau", seed: 6, score: "7", isWinner: true }, { name: "Minh Le", seed: 27, score: "6", isWinner: false }] },
      { id: "r32-16", label: "Match 16", players: [{ name: "Arthur Ho", seed: 11, score: "3", isWinner: false }, { name: "Viktor Petrov", seed: 22, score: "6", isWinner: true }] }
    ]
  },
  {
    id: "last16",
    label: "Last 16",
    matches: [
      { id: "r16-1", label: "R16 Match 1", players: [{ name: "Arran Kenna", seed: 1, score: "6", isWinner: true }, { name: "Mark Tan", seed: 16, score: "3", isWinner: false }] },
      { id: "r16-2", label: "R16 Match 2", players: [{ name: "David Chen", seed: 8, score: "7", isWinner: true }, { name: "Rafael Santos", seed: 24, score: "5", isWinner: false }] },
      { id: "r16-3", label: "R16 Match 3", players: [{ name: "Simon Swenson", seed: 4, score: "6", isWinner: true }, { name: "Marco Silva", seed: 20, score: "4", isWinner: false }] },
      { id: "r16-4", label: "R16 Match 4", players: [{ name: "Miguel Reyes", seed: 28, score: "6", isWinner: false }, { name: "Jason Lee", seed: 12, score: "7", isWinner: true }] },
      { id: "r16-5", label: "R16 Match 5", players: [{ name: "Noah Wong", seed: 2, score: "6", isWinner: true }, { name: "Tomas Garcia", seed: 18, score: "2", isWinner: false }] },
      { id: "r16-6", label: "R16 Match 6", players: [{ name: "Wei Ming", seed: 7, score: "5", isWinner: false }, { name: "Paulo Mendes", seed: 10, score: "7", isWinner: true }] },
      { id: "r16-7", label: "R16 Match 7", players: [{ name: "Andre Costa", seed: 3, score: "6", isWinner: true }, { name: "Owen Chua", seed: 14, score: "1", isWinner: false }] },
      { id: "r16-8", label: "R16 Match 8", players: [{ name: "Felix Lau", seed: 6, score: "4", isWinner: false }, { name: "Viktor Petrov", seed: 22, score: "6", isWinner: true }] }
    ]
  },
  {
    id: "quarterFinal",
    label: "Quarter-Final",
    matches: [
      { id: "qf-1", label: "QF1", players: [{ name: "Arran Kenna", seed: 1, score: "6", isWinner: true }, { name: "David Chen", seed: 8, score: "4", isWinner: false }] },
      { id: "qf-2", label: "QF2", players: [{ name: "Simon Swenson", seed: 4, score: "7", isWinner: true }, { name: "Jason Lee", seed: 12, score: "6", isWinner: false }] },
      { id: "qf-3", label: "QF3", players: [{ name: "Noah Wong", seed: 2, score: "6", isWinner: true }, { name: "Paulo Mendes", seed: 10, score: "3", isWinner: false }] },
      { id: "qf-4", label: "QF4", players: [{ name: "Andre Costa", seed: 3, score: "6", isWinner: false }, { name: "Viktor Petrov", seed: 22, score: "7", isWinner: true }] }
    ]
  },
  {
    id: "semiFinal",
    label: "Semi-Final",
    matches: [
      { id: "sf-1", label: "Semi-Final 1", players: [{ name: "Arran Kenna", seed: 1, score: "—", isWinner: false }, { name: "Simon Swenson", seed: 4, score: "—", isWinner: false }] },
      { id: "sf-2", label: "Semi-Final 2", players: [{ name: "Noah Wong", seed: 2, score: "—", isWinner: false }, { name: "Viktor Petrov", seed: 22, score: "—", isWinner: false }] }
    ]
  },
  {
    id: "final",
    label: "Final",
    matches: [
      { id: "final-1", label: "Grand Final", players: [{ name: "Finalist TBD", score: "—", isWinner: false }, { name: "Finalist TBD", score: "—", isWinner: false }] }
    ]
  }
];

const WOMEN_DRAW_LAST32: Array<[[string, number], [string, number]]> = [
  [["Maya Tan", 1], ["Priya Nair", 32]],
  [["Sofia Lim", 16], ["Clara Ho", 17]],
  [["Lina Chen", 8], ["Anika Rao", 25]],
  [["Mei Wong", 9], ["Rina Santos", 24]],
  [["Alyssa Lee", 4], ["Nadia Park", 29]],
  [["Hana Kim", 13], ["Grace Silva", 20]],
  [["Isabella Costa", 5], ["Trang Nguyen", 28]],
  [["Yuki Sato", 12], ["Elena Garcia", 21]],
  [["Rachel Goh", 2], ["Jasmine Mehta", 31]],
  [["Michelle Chua", 15], ["Thao Tran", 18]],
  [["Valerie Ng", 7], ["Camila Mendes", 26]],
  [["Olivia Ho", 10], ["Nina Wilson", 23]],
  [["Chloe Tanaka", 3], ["Diana Krit", 30]],
  [["Bianca Lau", 14], ["Min Lee", 19]],
  [["Emma Felix", 6], ["Sara Minh", 27]],
  [["Victoria Petrov", 11], ["Lily Arthur", 22]]
];

const createPendingLast32Round = (
  matches: Array<[[string, number], [string, number]]>
): DrawRound => ({
  id: "last32",
  label: "Last 32",
  matches: matches.map(([player1, player2], index) => ({
    id: `r32-${index + 1}`,
    label: `Match ${index + 1}`,
    players: [
      { name: player1[0], seed: player1[1], score: "—", isWinner: false },
      { name: player2[0], seed: player2[1], score: "—", isWinner: false }
    ]
  }))
});

export const WOMEN_DRAW_BRACKET_ROUNDS: DrawRound[] = [
  createPendingLast32Round(WOMEN_DRAW_LAST32)
];

export const DRAW_BRACKET_ROUNDS_BY_CATEGORY: Record<DrawCategoryId, DrawRound[]> = {
  men: DRAW_BRACKET_ROUNDS,
  women: WOMEN_DRAW_BRACKET_ROUNDS
};

export const DRAW_BRACKET_ROUNDS_BY_MARKET: Record<DrawMarketId, Record<DrawCategoryId, DrawRound[]>> = {
  globalFinals: DRAW_BRACKET_ROUNDS_BY_CATEGORY
};

export const DEFAULT_DRAW_RESULTS: DrawMatchResult[] = DRAW_MARKET_OPTIONS.flatMap((market) => (
  DRAW_CATEGORY_OPTIONS.flatMap((category) => (
    DRAW_BRACKET_ROUNDS_BY_MARKET[market.id][category.id].flatMap((round) => (
      round.matches.flatMap((match) => {
        const winnerIndex = match.players.findIndex((player) => player.isWinner);
        if (winnerIndex === -1) return [];

        return [{
          id: `draw-${market.id}-${category.id}-${match.id}`,
          marketId: market.id,
          categoryId: category.id,
          matchId: match.id,
          roundId: round.id as DrawRoundId,
          matchLabel: match.label,
          p1Name: match.players[0].name,
          p2Name: match.players[1].name,
          p1Score: match.players[0].score,
          p2Score: match.players[1].score,
          winnerIndex: winnerIndex as 0 | 1,
          proofFile: null,
          updatedAt: '2026-05-13T00:00:00.000Z'
        }];
      })
    ))
  ))
));
