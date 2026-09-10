import { inMemoryStore } from '../services/store.js';
import { executeInSandbox } from '../services/sandboxExecutor.js';
import { calculateElo, getTier } from '../services/eloCalculator.js';
import { getRandomBot } from '../services/botEngine.js';

// Global matchmaking queue
const matchmakingQueue = [];

export function initializeBattleSockets(io) {
  io.on('connection', (socket) => {
    let currentRoomId = null;
    let currentUser = null;

    // 1. Join Ranked Matchmaking Queue
    socket.on('queue:join', ({ user }) => {
      currentUser = user;
      socket.user = user;

      // Check if already in queue
      const existingIdx = matchmakingQueue.findIndex(p => p.socket.id === socket.id);
      if (existingIdx !== -1) matchmakingQueue.splice(existingIdx, 1);

      // Check if another human player is waiting
      if (matchmakingQueue.length > 0) {
        const opponent = matchmakingQueue.shift();
        if (opponent.socket.id !== socket.id && opponent.socket.connected) {
          createMatch(socket, opponent.socket, user, opponent.user, 'RANKED_1V1');
          return;
        }
      }

      // Add to queue
      const queueEntry = { socket, user, joinedAt: Date.now() };
      matchmakingQueue.push(queueEntry);
      socket.emit('queue:status', { status: 'SEARCHING', queueSize: matchmakingQueue.length });

      // Fallback: If no human player found after 7 seconds, match with ClashBot AI
      setTimeout(() => {
        const idx = matchmakingQueue.findIndex(p => p.socket.id === socket.id);
        if (idx !== -1 && socket.connected) {
          matchmakingQueue.splice(idx, 1);
          const bot = getRandomBot(user?.eloRating || 1200);
          createBotMatch(socket, user, bot);
        }
      }, 7000);
    });

    // 2. Leave Queue
    socket.on('queue:leave', () => {
      const idx = matchmakingQueue.findIndex(p => p.socket.id === socket.id);
      if (idx !== -1) {
        matchmakingQueue.splice(idx, 1);
        socket.emit('queue:status', { status: 'IDLE' });
      }
    });

    // 3. Create Custom Private Room
    socket.on('room:create', ({ user }) => {
      currentUser = user;
      const roomId = 'CLASH-' + Math.floor(1000 + Math.random() * 9000);
      currentRoomId = roomId;
      socket.join(roomId);

      inMemoryStore.activeRooms.set(roomId, {
        roomId,
        mode: 'CUSTOM_ROOM',
        status: 'WAITING',
        player1: { socketId: socket.id, user, progress: 0, testsPassed: 0 },
        player2: null,
        problem: getRandomProblem()
      });

      console.log(`[Room Created] ${roomId} by ${user?.username} (${socket.id})`);
      socket.emit('room:created', { roomId });
    });

    // 4. Join Custom Private Room
    socket.on('room:join', ({ roomId, user }) => {
      currentUser = user;
      const normalizedRoomId = (roomId || '').trim().toUpperCase();
      const room = inMemoryStore.activeRooms.get(normalizedRoomId);

      if (!room) {
        return socket.emit('room:error', { message: `Room "${normalizedRoomId}" not found or expired.` });
      }

      if (room.status !== 'WAITING') {
        return socket.emit('room:error', { message: 'This match is already in progress or completed.' });
      }

      if (room.player1.socketId === socket.id) {
        return socket.emit('room:error', { message: 'You are already in this room as Player 1.' });
      }

      currentRoomId = normalizedRoomId;
      socket.join(normalizedRoomId);
      room.player2 = { socketId: socket.id, user, progress: 0, testsPassed: 0 };
      room.status = 'IN_PROGRESS';
      room.startedAt = Date.now();

      console.log(`[Room Joined] ${normalizedRoomId} by ${user?.username} (${socket.id}). Starting match!`);

      // Broadcast match start to both players in the room
      io.to(normalizedRoomId).emit('match:start', {
        roomId: normalizedRoomId,
        problem: room.problem,
        player1: { ...room.player1.user, socketId: room.player1.socketId },
        player2: { ...room.player2.user, socketId: room.player2.socketId },
        startedAt: room.startedAt
      });
    });

    // 5. Opponent Telemetry: Progress and Keystroke indicator
    socket.on('code:progress', ({ roomId, progressPercent, testsPassed, totalTests, lineCount }) => {
      if (!roomId) return;
      socket.to(roomId).emit('opponent:progress', {
        progressPercent: Math.min(100, Math.max(0, progressPercent || 0)),
        testsPassed: testsPassed || 0,
        totalTests: totalTests || 0,
        lineCount: lineCount || 1,
        senderSocketId: socket.id,
        timestamp: Date.now()
      });
    });

    // 6. Run Test Cases in Sandbox (Private run)
    socket.on('code:run_test', async ({ roomId, code }) => {
      const room = inMemoryStore.activeRooms.get(roomId);
      if (!room || !room.problem) return;

      const result = await executeInSandbox(
        code,
        room.problem.functionName,
        room.problem.testCases,
        room.problem.timeLimitMs || 1500
      );

      socket.emit('code:test_results', result);

      // Broadcast progress update to opponent
      socket.to(roomId).emit('opponent:progress', {
        testsPassed: result.passedCount,
        totalTests: result.totalTests,
        progressPercent: Math.round((result.passedCount / result.totalTests) * 100),
        senderSocketId: socket.id,
        timestamp: Date.now()
      });
    });

    // 7. Final Submission: Ends Match if all pass
    socket.on('code:submit', async ({ roomId, code }) => {
      const room = inMemoryStore.activeRooms.get(roomId);
      if (!room || room.status !== 'IN_PROGRESS') return;

      const result = await executeInSandbox(
        code,
        room.problem.functionName,
        room.problem.testCases,
        room.problem.timeLimitMs || 1500
      );

      if (result.success) {
        room.status = 'COMPLETED';
        const durationSec = Math.round((Date.now() - (room.startedAt || Date.now())) / 1000);

        // Determine winner & loser by socketId
        const isP1 = room.player1.socketId === socket.id;
        const winnerUser = isP1 ? room.player1.user : room.player2.user;
        const loserUser = isP1 ? room.player2.user : room.player1.user;
        room.winner = winnerUser.username;

        // Calculate Elo changes
        const winnerEloRes = calculateElo(winnerUser.eloRating || 1200, loserUser.eloRating || 1200, 1);
        const loserEloRes = calculateElo(loserUser.eloRating || 1200, winnerUser.eloRating || 1200, 0);

        updateStoreUserElo(winnerUser.username, winnerEloRes.newElo, true);
        if (!loserUser.isBot) {
          updateStoreUserElo(loserUser.username, loserEloRes.newElo, false);
        }

        io.to(roomId).emit('match:ended', {
          roomId,
          winner: winnerUser.username,
          winnerSocketId: socket.id,
          loser: loserUser.username,
          durationSec,
          winnerCode: code,
          eloChange: {
            [winnerUser.username]: { newElo: winnerEloRes.newElo, delta: winnerEloRes.delta, tier: getTier(winnerEloRes.newElo) },
            [loserUser.username]: { newElo: loserEloRes.newElo, delta: loserEloRes.delta, tier: getTier(loserEloRes.newElo) }
          }
        });

        setTimeout(() => inMemoryStore.activeRooms.delete(roomId), 600000);
      } else {
        socket.emit('code:submit_failed', {
          passedCount: result.passedCount,
          totalTests: result.totalTests,
          message: `Only ${result.passedCount}/${result.totalTests} tests passed. Fix failing tests before submitting!`
        });
      }
    });

    // 8. Tactical Battle Emoji & Quick Chat Taunts
    socket.on('battle:taunt', ({ roomId, emoji, text }) => {
      if (!roomId) return;
      socket.to(roomId).emit('opponent:taunt', {
        sender: currentUser?.username || 'Opponent',
        emoji: emoji || '⚡',
        text: text || ''
      });
    });

    // 9. Forfeit
    socket.on('match:forfeit', ({ roomId }) => {
      handleForfeit(roomId, socket);
    });

    // 10. Disconnect Handling
    socket.on('disconnect', () => {
      const qIdx = matchmakingQueue.findIndex(p => p.socket.id === socket.id);
      if (qIdx !== -1) matchmakingQueue.splice(qIdx, 1);

      if (currentRoomId) {
        handleForfeit(currentRoomId, socket);
      }
    });
  });

  function createMatch(socket1, socket2, user1, user2, mode) {
    const roomId = 'CLASH-' + Math.floor(1000 + Math.random() * 9000);
    const problem = getRandomProblem();
    const startedAt = Date.now();

    socket1.join(roomId);
    socket2.join(roomId);

    inMemoryStore.activeRooms.set(roomId, {
      roomId,
      mode,
      status: 'IN_PROGRESS',
      player1: { socketId: socket1.id, user: user1, progress: 0, testsPassed: 0 },
      player2: { socketId: socket2.id, user: user2, progress: 0, testsPassed: 0 },
      problem,
      startedAt
    });

    io.to(roomId).emit('match:start', {
      roomId,
      problem,
      player1: { ...user1, socketId: socket1.id },
      player2: { ...user2, socketId: socket2.id },
      startedAt
    });
  }

  function createBotMatch(socket, user, bot) {
    const roomId = 'CLASH-' + Math.floor(1000 + Math.random() * 9000);
    const problem = getRandomProblem();
    const startedAt = Date.now();

    socket.join(roomId);

    const roomState = {
      roomId,
      mode: 'SOLO_BOT',
      status: 'IN_PROGRESS',
      player1: { socketId: socket.id, user, progress: 0, testsPassed: 0 },
      player2: { socketId: 'bot', user: bot, progress: 0, testsPassed: 0 },
      problem,
      startedAt
    };

    inMemoryStore.activeRooms.set(roomId, roomState);

    socket.emit('match:start', {
      roomId,
      problem,
      player1: { ...user, socketId: socket.id },
      player2: { ...bot, socketId: 'bot' },
      startedAt
    });

    simulateBotGameplay(io, roomId, bot, problem, roomState);
  }

  function simulateBotGameplay(io, roomId, bot, problem, roomState) {
    let progress = 0;
    const totalTests = problem.testCases.length;
    let testsPassed = 0;

    setTimeout(() => {
      if (roomState.status === 'IN_PROGRESS') {
        io.to(roomId).emit('opponent:taunt', {
          sender: bot.username,
          emoji: '🤖',
          text: bot.taunts[0] || 'Good luck, have fun!'
        });
      }
    }, 4000);

    const interval = setInterval(() => {
      if (roomState.status !== 'IN_PROGRESS') {
        clearInterval(interval);
        return;
      }

      progress += Math.floor(15 + Math.random() * 20);
      if (progress > 30 && testsPassed === 0) testsPassed = 1;
      if (progress > 60 && testsPassed === 1) testsPassed = Math.min(2, totalTests - 1);
      if (progress > 85 && testsPassed < totalTests - 1) testsPassed = totalTests - 1;

      io.to(roomId).emit('opponent:progress', {
        progressPercent: Math.min(progress, 95),
        testsPassed,
        totalTests,
        lineCount: Math.floor(progress / 10) + 1,
        senderSocketId: 'bot',
        timestamp: Date.now()
      });

      const elapsedSec = (Date.now() - roomState.startedAt) / 1000;
      const targetTime = 80 * (bot.speedMultiplier || 1.0);

      if (elapsedSec >= targetTime && roomState.status === 'IN_PROGRESS') {
        clearInterval(interval);
        roomState.status = 'COMPLETED';
        roomState.winner = bot.username;

        const winnerEloRes = calculateElo(bot.eloRating, roomState.player1.user.eloRating || 1200, 1);
        const loserEloRes = calculateElo(roomState.player1.user.eloRating || 1200, bot.eloRating, 0);

        updateStoreUserElo(roomState.player1.user.username, loserEloRes.newElo, false);

        io.to(roomId).emit('match:ended', {
          roomId,
          winner: bot.username,
          winnerSocketId: 'bot',
          loser: roomState.player1.user.username,
          durationSec: Math.round(elapsedSec),
          winnerCode: problem.solutionCode,
          eloChange: {
            [bot.username]: { newElo: winnerEloRes.newElo, delta: winnerEloRes.delta, tier: getTier(winnerEloRes.newElo) },
            [roomState.player1.user.username]: { newElo: loserEloRes.newElo, delta: loserEloRes.delta, tier: getTier(loserEloRes.newElo) }
          }
        });
      }
    }, 5000);
  }

  function handleForfeit(roomId, socket) {
    const room = inMemoryStore.activeRooms.get(roomId);
    if (!room || room.status !== 'IN_PROGRESS') return;

    room.status = 'COMPLETED';
    const isP1 = room.player1.socketId === socket.id;
    const winnerUser = isP1 ? room.player2.user : room.player1.user;
    const forfeitUser = isP1 ? room.player1.user : room.player2.user;

    room.winner = winnerUser.username;

    io.to(roomId).emit('match:ended', {
      roomId,
      winner: winnerUser.username,
      winnerSocketId: isP1 ? room.player2.socketId : room.player1.socketId,
      loser: forfeitUser.username,
      isForfeit: true,
      message: `${forfeitUser.username} left or forfeited the match.`
    });
  }

  function getRandomProblem() {
    const probs = inMemoryStore.problems;
    return probs[Math.floor(Math.random() * probs.length)];
  }

  function updateStoreUserElo(username, newElo, won) {
    const user = inMemoryStore.users.find(u => u.username === username);
    if (user) {
      user.eloRating = newElo;
      user.tier = getTier(newElo).name;
      user.matchesPlayed = (user.matchesPlayed || 0) + 1;
      if (won) {
        user.wins = (user.wins || 0) + 1;
        user.winStreak = (user.winStreak || 0) + 1;
        if (user.winStreak > (user.highestStreak || 0)) {
          user.highestStreak = user.winStreak;
        }
      } else {
        user.losses = (user.losses || 0) + 1;
        user.winStreak = 0;
      }
    }
  }
}