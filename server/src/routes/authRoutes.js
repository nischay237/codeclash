import express from 'express';
import jwt from 'jsonwebtoken';
import { inMemoryStore } from '../services/store.js';
import { getTier } from '../services/eloCalculator.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'codeclash_super_secret_jwt_key_2026';

// 1. Instant Guest Login (Recruiter & 1-Click Play)
router.post('/guest', (req, res) => {
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const username = req.body.username || `Coder_${randomSuffix}`;

  let existing = inMemoryStore.users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (!existing) {
    existing = {
      _id: `user_guest_${Date.now()}`,
      username,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}&backgroundColor=0f172a`,
      eloRating: 1200,
      tier: 'Silver',
      wins: 0,
      losses: 0,
      ties: 0,
      matchesPlayed: 0,
      winStreak: 0,
      isGuest: true
    };
    inMemoryStore.users.push(existing);
  }

  const token = jwt.sign(
    { userId: existing._id, username: existing.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    user: existing,
    token
  });
});

// 2. Standard Register
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || username.trim().length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters.' });
  }

  const exists = inMemoryStore.users.some(u => u.username.toLowerCase() === username.trim().toLowerCase());
  if (exists) {
    return res.status(400).json({ error: 'Username already taken.' });
  }

  const newUser = {
    _id: `user_${Date.now()}`,
    username: username.trim(),
    email: email || `${username.trim()}@codeclash.dev`,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username.trim()}&backgroundColor=0f172a`,
    eloRating: 1200,
    tier: 'Silver',
    wins: 0,
    losses: 0,
    ties: 0,
    matchesPlayed: 0,
    winStreak: 0
  };

  inMemoryStore.users.push(newUser);

  const token = jwt.sign(
    { userId: newUser._id, username: newUser.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    user: newUser,
    token
  });
});

// 3. Get Current User Profile
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = inMemoryStore.users.find(u => u.username === decoded.username);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      success: true,
      user: {
        ...user,
        tierInfo: getTier(user.eloRating)
      }
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;
