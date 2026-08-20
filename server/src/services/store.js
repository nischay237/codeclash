import { INITIAL_PROBLEMS } from '../seeds/problemSeed.js';

export const inMemoryStore = {
  problems: INITIAL_PROBLEMS.map((p, idx) => ({
    _id: `prob_${idx + 1}`,
    ...p
  })),
  users: [
    {
      _id: 'user_1',
      username: 'CodeSlayer_99',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CodeSlayer',
      eloRating: 1980,
      tier: 'Platinum',
      wins: 48,
      losses: 8,
      ties: 2,
      matchesPlayed: 58,
      winStreak: 6
    },
    {
      _id: 'user_2',
      username: 'AlgoQueen',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AlgoQueen',
      eloRating: 1740,
      tier: 'Platinum',
      wins: 34,
      losses: 12,
      ties: 1,
      matchesPlayed: 47,
      winStreak: 3
    },
    {
      _id: 'user_3',
      username: 'DevNinja_X',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DevNinja',
      eloRating: 1560,
      tier: 'Gold',
      wins: 26,
      losses: 14,
      ties: 4,
      matchesPlayed: 44,
      winStreak: 2
    },
    {
      _id: 'user_4',
      username: 'ByteMaster',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ByteMaster',
      eloRating: 1390,
      tier: 'Silver',
      wins: 19,
      losses: 18,
      ties: 1,
      matchesPlayed: 38,
      winStreak: 1
    },
    {
      _id: 'user_5',
      username: 'PixelCoder',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PixelCoder',
      eloRating: 1240,
      tier: 'Silver',
      wins: 11,
      losses: 15,
      ties: 0,
      matchesPlayed: 26,
      winStreak: 0
    }
  ],
  matches: [],
  activeRooms: new Map() // roomId -> roomState
};
