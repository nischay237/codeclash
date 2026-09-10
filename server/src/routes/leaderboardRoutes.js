import express from 'express';
import { inMemoryStore } from '../services/store.js';
import { getTier, TIERS } from '../services/eloCalculator.js';

const router = express.Router();

router.get('/', (req, res) => {
  // Sort users by Elo rating descending
  const sorted = [...inMemoryStore.users]
    .sort((a, b) => b.eloRating - a.eloRating)
    .map((u, rank) => {
      const winRate = u.matchesPlayed > 0 ? Math.round((u.wins / u.matchesPlayed) * 100) : 0;
      return {
        rank: rank + 1,
        username: u.username,
        avatar: u.avatar,
        eloRating: u.eloRating,
        tierInfo: getTier(u.eloRating),
        wins: u.wins,
        losses: u.losses,
        matchesPlayed: u.matchesPlayed,
        winRatePercent: winRate,
        winStreak: u.winStreak || 0
      };
    });

  res.json({
    success: true,
    tiers: TIERS,
    totalPlayers: sorted.length,
    leaderboard: sorted
  });
});

export default router;
