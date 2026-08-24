import mongoose from 'mongoose';

const playerMatchStatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  username: String,
  avatar: String,
  initialElo: Number,
  newElo: Number,
  eloDelta: Number,
  code: String,
  testsPassed: {
    type: Number,
    default: 0
  },
  totalTests: {
    type: Number,
    default: 0
  },
  finishTimeSeconds: Number,
  isForfeit: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const matchSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  mode: {
    type: String,
    enum: ['RANKED_1V1', 'CUSTOM_ROOM', 'SOLO_BOT'],
    default: 'RANKED_1V1'
  },
  status: {
    type: String,
    enum: ['WAITING', 'IN_PROGRESS', 'COMPLETED', 'ABORTED'],
    default: 'WAITING'
  },
  winner: {
    type: String, // username or 'DRAW'
    default: null
  },
  player1: playerMatchStatsSchema,
  player2: playerMatchStatsSchema,
  durationSeconds: Number,
  startedAt: Date,
  endedAt: Date
}, { timestamps: true });

export const Match = mongoose.model('Match', matchSchema);
