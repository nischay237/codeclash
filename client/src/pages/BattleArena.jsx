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

        {/* Tactical Emoji Bar */}
        <div className="hidden sm:block">
          <EmojiTauntBar onSendTaunt={handleSendTaunt} />
        </div>

        {/* Timer & Forfeit Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTime(timeElapsed)}</span>
          </div>

          <button
            onClick={handleForfeit}
            title="Forfeit Match"
            className="p-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/60 rounded-xl transition-colors flex items-center gap-1"
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Forfeit</span>
          </button>
        </div>

      </div>

      {/* Submit Error Toast */}
      {submitError && (
        <div className="bg-red-950/90 border-b border-red-800 px-4 py-2 text-center text-xs font-bold text-red-300 animate-shake">
          {submitError}
        </div>
      )}

      {/* Main Split-Screen Battle Arena View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 overflow-hidden">
        
        {/* Left Panel: Problem Statement (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col rounded-2xl bg-[#0d121f] border border-slate-800 overflow-hidden shadow-xl">
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white truncate">{problem.title}</h2>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300">
            <div className="whitespace-pre-wrap font-normal">{problem.description}</div>

            {problem.examples && problem.examples.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">Examples</span>
                {problem.examples.map((ex, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px]">
                    <div className="mb-1"><strong className="text-slate-400">Input:</strong> {ex.input}</div>
                    <div className="mb-1"><strong className="text-emerald-400">Output:</strong> {ex.output}</div>
                    {ex.explanation && (
                      <div className="text-slate-500 text-[10px]"><strong className="text-slate-400">Explanation:</strong> {ex.explanation}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {problem.constraints && problem.constraints.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider mb-2">Constraints</span>
                <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-slate-400">
                  {problem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Opponent Radar + Editor + Test Console (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          
          {/* Live Opponent Telemetry Radar */}
          <OpponentRadar
            opponent={opponent}
            opponentProgress={opponentProgress}
            incomingTaunt={incomingTaunt}
          />

          {/* Code Editor */}
          <div className="flex-1 min-h-[320px]">
            <CodeEditor
              initialCode={problem.starterCode}
              starterCode={problem.starterCode}
              onRunTests={handleRunTests}
              onSubmit={handleSubmitSolution}
              onCodeChange={handleCodeChange}
              isExecuting={isExecuting}
            />
          </div>

          {/* Test Case Output Console */}
          <TestConsole
            testResults={testResults}
            isExecuting={isExecuting}
          />

        </div>

      </div>

    </div>
  );
}