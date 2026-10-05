import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import CodeEditor from '../components/CodeEditor';
import OpponentRadar from '../components/OpponentRadar';
import TestConsole from '../components/TestConsole';
import EmojiTauntBar from '../components/EmojiTauntBar';
import VictoryModal from '../components/VictoryModal';
import { Swords, Clock, AlertCircle, ArrowLeft, Flag, CheckCircle, Code2, Sparkles, BookOpen } from 'lucide-react';
import { playCountdownBeep, playTestPass, playTestFail } from '../utils/audioSynthesizer';

export default function BattleArena({ matchData, onExitArena }) {
  const { user, updateUserElo } = useAuth();
  const { socket } = useSocket();

  // Match state
  const { roomId, problem, player1, player2 } = matchData;

  // Identify self vs opponent using socket.id first, falling back to username
  const isP1 = player1?.socketId && socket?.id
    ? player1.socketId === socket.id
    : player1?.username === user.username;

  const opponent = isP1 ? player2 : player1;
  const me = isP1 ? player1 : player2;

  // Battle state
  const [countdown, setCountdown] = useState(3);
  const [battleActive, setBattleActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [testResults, setTestResults] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [opponentProgress, setOpponentProgress] = useState({ progressPercent: 0, testsPassed: 0, totalTests: problem?.testCases?.length || 4 });
  const [incomingTaunt, setIncomingTaunt] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [submitError, setSubmitError] = useState('');

  // 1. Initial 3-second Countdown
  useEffect(() => {
    let count = 3;
    playCountdownBeep(false);

    const timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
        playCountdownBeep(false);
      } else if (count === 0) {
        setCountdown(0);
        playCountdownBeep(true);
        setBattleActive(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 2. Battle Duration Timer
  useEffect(() => {
    let timer;
    if (battleActive && !matchResult) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [battleActive, matchResult]);

  // 3. Socket Event Listeners for Battle Telemetry
  useEffect(() => {
    if (!socket) return;

    socket.on('opponent:progress', (data) => {
      // Ignore if progress was emitted by this socket itself
      if (data.senderSocketId && data.senderSocketId === socket.id) return;
      setOpponentProgress(data);
    });

    socket.on('opponent:taunt', (data) => {
      setIncomingTaunt(data);
    });

    socket.on('code:test_results', (data) => {
      setIsExecuting(false);
      setTestResults(data);
      if (data.success) {
        playTestPass();
      } else {
        playTestFail();
      }
    });

    socket.on('code:submit_failed', ({ message }) => {
      setIsExecuting(false);
      setSubmitError(message);
      setTimeout(() => setSubmitError(''), 4000);
      playTestFail();
    });

    socket.on('match:ended', (result) => {
      setBattleActive(false);
      setMatchResult(result);
      if (result.eloChange?.[user.username]) {
        updateUserElo(
          result.eloChange[user.username].newElo,
          result.eloChange[user.username].tier?.name
        );
      }
    });

    return () => {
      socket.off('opponent:progress');
      socket.off('opponent:taunt');
      socket.off('code:test_results');
      socket.off('code:submit_failed');
      socket.off('match:ended');
    };
  }, [socket, user, updateUserElo]);

  // Actions
  const handleRunTests = (currentCode) => {
    if (!socket || isExecuting) return;
    setIsExecuting(true);
    socket.emit('code:run_test', { roomId, code: currentCode });
  };

  const handleSubmitSolution = (currentCode) => {
    if (!socket || isExecuting) return;
    setIsExecuting(true);
    socket.emit('code:submit', { roomId, code: currentCode });
  };

  const handleCodeChange = (newCode) => {
    if (socket && battleActive) {
      const lines = newCode.split('\n').length;
      const progressPercent = Math.min(90, Math.round((newCode.length / 250) * 100));
      socket.emit('code:progress', {
        roomId,
        progressPercent,
        testsPassed: testResults?.passedCount || 0,
        totalTests: problem.testCases?.length || 4,
        lineCount: lines
      });
    }
  };

  const handleSendTaunt = (emoji, text) => {
    if (socket && roomId) {
      socket.emit('battle:taunt', { roomId, emoji, text });
    }
  };

  const handleForfeit = () => {
    if (window.confirm('Are you sure you want to forfeit this battle? Your opponent will win.')) {
      if (socket && roomId) {
        socket.emit('match:forfeit', { roomId });
      }
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col bg-[#080b12]">
      
      {/* 3.. 2.. 1.. Match Countdown Splash Overlay */}
      {countdown > 0 && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="text-center">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 mb-2 block">
              1v1 Battle Initializing
            </span>
            <div className="text-8xl sm:text-9xl font-black text-white animate-ping">
              {countdown}
            </div>
            <p className="text-sm font-mono text-slate-400 mt-4">
              {problem.title} • {problem.difficulty}
            </p>
          </div>
        </div>
      )}

      {/* Victory / Defeat Modal */}
      {matchResult && (
        <VictoryModal
          matchResult={matchResult}
          currentUser={user}
          onPlayAgain={onExitArena}
          onBackToLobby={onExitArena}
        />
      )}

      {/* Arena Sub-Header Bar */}
      <div className="border-b border-slate-800/80 bg-[#0c101c]/90 px-4 py-2.5 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
            <Swords className="w-3.5 h-3.5 text-emerald-400" />
            Room: <strong className="text-white">{roomId}</strong>
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
            problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
            'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {problem.difficulty}
          </span>
        </div>

