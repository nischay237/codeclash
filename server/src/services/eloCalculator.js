/**
 * Standard FIDE Chess Elo Calculation Engine for 1v1 Competitive Matches
 */

export const TIERS = [
  { name: 'Grandmaster', minElo: 2000, badge: '👑', color: '#f59e0b' },
  { name: 'Platinum', minElo: 1700, badge: '💎', color: '#06b6d4' },
  { name: 'Gold', minElo: 1400, badge: '🥇', color: '#eab308' },
  { name: 'Silver', minElo: 1100, badge: '🥈', color: '#94a3b8' },
  { name: 'Bronze', minElo: 0, badge: '🥉', color: '#d97706' }
];

export function getTier(elo) {
  for (const tier of TIERS) {
    if (elo >= tier.minElo) {
      return tier;
    }
  }
  return TIERS[TIERS.length - 1];
}

/**
 * Calculates new Elo ratings after a match
 * @param {number} playerElo - Player's current rating
 * @param {number} opponentElo - Opponent's current rating
 * @param {number} score - 1 for win, 0 for loss, 0.5 for draw
 * @param {number} matchesPlayed - For dynamic K-factor
 * @returns {{ newElo: number, delta: number, expectedScore: number }}
 */
export function calculateElo(playerElo, opponentElo, score, matchesPlayed = 10) {
  // Dynamic K factor: High for calibration (K=32), normalized for veterans (K=20)
  const K = matchesPlayed < 15 ? 32 : 20;

  // Expected score calculation
  const expectedScore = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));

  // Elo adjustment
  const delta = Math.round(K * (score - expectedScore));
  const newElo = Math.max(100, playerElo + delta); // minimum rating floor of 100

  return {
    newElo,
    delta,
    expectedScore: parseFloat(expectedScore.toFixed(3))
  };
}
