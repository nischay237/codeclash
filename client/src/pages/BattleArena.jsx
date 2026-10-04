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
