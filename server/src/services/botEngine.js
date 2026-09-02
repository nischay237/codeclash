/**
 * ClashBot AI Simulation Engine
 * Simulates human-like competitive gameplay so matches never stall
 */

export const BOTS = [
  {
    username: 'ClashBot_Nova',
    eloRating: 1180,
    tier: 'Silver',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Nova&backgroundColor=1e293b',
    speedMultiplier: 1.2, // slightly slower
    taunts: ['Let the battle begin!', 'Hmm, nice approach! 🤔', 'Almost got it!']
  },
  {
    username: 'ClashBot_Kage',
    eloRating: 1420,
    tier: 'Gold',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kage&backgroundColor=0f172a',
    speedMultiplier: 1.0, // standard human speed
    taunts: ['Speed is key! ⚡', 'Passing test cases... 🚀', 'GG! 🔥']
  },
  {
    username: 'ClashBot_Zenith',
    eloRating: 1850,
    tier: 'Platinum',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Zenith&backgroundColor=31104b',
    speedMultiplier: 0.8, // faster
    taunts: ['Analyzing optimal complexity... 🧠', 'Clean O(N) solution incoming 💎', 'Well played!']
  }
];

export function getRandomBot(targetElo = 1200) {
  // Pick bot closest to player Elo
  const sorted = [...BOTS].sort((a, b) => Math.abs(a.eloRating - targetElo) - Math.abs(b.eloRating - targetElo));
  const selected = sorted[0];
  return {
    ...selected,
    isBot: true,
    userId: 'bot_' + selected.username.toLowerCase()
  };
}
