
import { MatchmakerQuestion, LeaderboardEntry, PrizeEntry, ContactEntry } from './types';

export const ASSETS = {
  logo: "/logo.png",
  wave: "https://res.cloudinary.com/dfm67v8v3/image/upload/v1740051187/Wave_Graphics_p7e5u6.png",
  sidebarPattern: "/bg_left_bar.png"
};

export const CATEGORIES = [
  "Men's Singles",
  "Women's Singles"
];

export const LOCATIONS: Record<string, string[]> = {
  "Brazil": ["Sao Paulo", "Others"],
  "China": ["Beijing", "Shanghai", "Shenzhen", "Others"],
  "Indonesia": ["Jakarta", "Yogyakarta", "Solo", "Others"],
  "Korea": ["Seoul", "Others"],
  "Malaysia": ["Kuala Lumpur", "Penang", "Perak", "Others"],
  "Mexico": ["Mexico City", "Others"],
  "Philippines": ["Mandaluyong", "Laguna", "Bulacan", "Others"],
  "Singapore": ["Singapore", "Others"],
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
  { rank: 1, name: "Player A", played: 5, won: 5, lost: 0, setsW: 10, setsL: 1, gamesW: 65, gamesL: 32, gamesPct: "67.01%", points: 15 },
  { rank: 2, name: "Player B", played: 4, won: 3, lost: 1, setsW: 6, setsL: 3, gamesW: 48, gamesL: 40, gamesPct: "54.55%", points: 10 },
  { rank: 3, name: "Player C", played: 5, won: 2, lost: 3, setsW: 5, setsL: 7, gamesW: 45, gamesL: 55, gamesPct: "45.00%", points: 9 },
  { rank: 4, name: "Player D", played: 4, won: 1, lost: 3, setsW: 2, setsL: 6, gamesW: 30, gamesL: 42, gamesPct: "41.67%", points: 6 },
  { rank: 5, name: "Player E", played: 4, won: 0, lost: 4, setsW: 0, setsL: 8, gamesW: 22, gamesL: 48, gamesPct: "31.43%", points: 4 },
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
