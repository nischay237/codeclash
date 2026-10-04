import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { Swords, Bot, Users, Trophy, Sparkles, Shield, Flame, Copy, Check, ArrowRight, Play, Edit2, Link2 } from 'lucide-react';
import { playCountdownBeep, playMatchFound } from '../utils/audioSynthesizer';

export default function LandingLobby({ onStartMatch }) {
  const { user, changeUsername } = useAuth();
  const { socket, connected } = useSocket();

  const [isSearching, setIsSearching] = useState(false);
  const [queueTimer, setQueueTimer] = useState(0);
  const [privateRoomCode, setPrivateRoomCode] = useState('');
  const [customRoomInput, setCustomRoomInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [leaderboardTop, setLeaderboardTop] = useState([]);

  // Editing username state
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  // Check URL query parameters for ?room=CODE
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomFromUrl = params.get('room');
    if (roomFromUrl) {
      setCustomRoomInput(roomFromUrl.toUpperCase());
    }
  }, []);

  // Fetch quick leaderboard snippet
  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.leaderboard) {
          setLeaderboardTop(data.leaderboard.slice(0, 4));
        }
      })
      .catch(() => {});
  }, []);

  // Queue timer ticker
  useEffect(() => {
    let interval;
    if (isSearching) {
      interval = setInterval(() => {
        setQueueTimer(prev => prev + 1);
      }, 1000);
    } else {
      setQueueTimer(0);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  // Socket listeners for matchmaking and room events
  useEffect(() => {
    if (!socket) return;

    socket.on('queue:status', ({ status }) => {
      if (status === 'SEARCHING') setIsSearching(true);
      else setIsSearching(false);
    });

    socket.on('match:start', (matchData) => {
      setIsSearching(false);
      playMatchFound();
      if (onStartMatch) onStartMatch(matchData);
    });

    socket.on('room:created', ({ roomId }) => {
      setPrivateRoomCode(roomId);
    });

    socket.on('room:error', ({ message }) => {
      setErrorMsg(message);
      setTimeout(() => setErrorMsg(''), 5000);
    });

    return () => {
      socket.off('queue:status');
      socket.off('match:start');
      socket.off('room:created');
      socket.off('room:error');
    };
  }, [socket, onStartMatch]);

  const handleStartRanked = () => {
    if (!socket || !connected) {
      setErrorMsg('Gateway disconnected. Retrying...');
      return;
    }
    setIsSearching(true);
    socket.emit('queue:join', { user });
  };

  const handleCancelRanked = () => {
    setIsSearching(false);
    if (socket) socket.emit('queue:leave');
  };

  const handleCreateRoom = () => {
    if (!socket) return;
    socket.emit('room:create', { user });
  };

  const handleJoinRoom = (e) => {
    if (e) e.preventDefault();
    const code = customRoomInput.trim().toUpperCase();
    if (!code || !socket) return;
    socket.emit('room:join', { roomId: code, user });
  };

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(privateRoomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/?room=${privateRoomCode}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      changeUsername(tempName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Error notification */}
      {errorMsg && (
        <div className="max-w-md mx-auto mb-6 p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs font-bold text-center shadow-lg animate-bounce">
          {errorMsg}
        </div>
      )}

      {/* Hero Headline */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 shadow-sm shadow-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time Competitive 1v1 Esports Platform</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3">
          Code Fast. Outsmart. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Dominate the Arena.
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
          Multiplayer coding battles with live opponent progress telemetry, Node.js sandboxed test execution, and FIDE Elo calibration.
        </p>
      </div>

      {/* Player Identity Strip (Change name per tab) */}
      {user && (
        <div className="max-w-md mx-auto mb-10 p-3.5 rounded-2xl bg-[#0f1423] border border-slate-800 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-xl bg-slate-800 border-2 border-emerald-500/40"
            />
            {isEditingName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter custom name..."
                  autoFocus
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-emerald-500 text-xs text-white outline-none w-36"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold"
                >
                  Save
                </button>
              </form>
            ) : (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{user.username}</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {user.tier || 'Silver'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">{user.eloRating || 1200} ELO</span>
              </div>
            )}
          </div>

          {!isEditingName && (
            <button
              onClick={() => {
                setTempName(user.username);
                setIsEditingName(true);
              }}
              className="p-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
              title="Change Name for this Tab"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px]">Change Name</span>
            </button>
          )}
        </div>
      )}

      {/* Main Battle Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        
        {/* Card 1: Custom Private Room (Enhanced with 1-click Join & Link) */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0f1423] border-2 border-cyan-500/40 hover:border-cyan-500/70 transition-all shadow-xl shadow-cyan-500/5 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 shadow-inner">
              <Users className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-1 block">
              Direct Dual Tab / Friend Challenge
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">Private Room Match</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Create a room in Tab 1, send the code to Tab 2 (or a friend), and battle directly!
            </p>
          </div>

          <div className="space-y-3">
            {privateRoomCode ? (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Room Created & Waiting</span>
                
                {/* Big Room Code */}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-mono font-black text-cyan-400 tracking-wider">
                    {privateRoomCode}
                  </span>
                  <button
                    onClick={handleCopyRoomCode}
                    title="Copy Room Code"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Direct Link Copy Button */}
                <button
                  onClick={handleCopyInviteLink}
                  className="w-full py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied Invite Link!' : 'Copy Direct Invite Link'}</span>
                </button>

                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2 animate-pulse pt-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Open Tab 2 and enter code to start</span>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleCreateRoom}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Create Room (Get Code)</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase font-bold">or join with code</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>

                <form onSubmit={handleJoinRoom} className="flex gap-2">
                  <input
                    type="text"
                    value={customRoomInput}
                    onChange={(e) => setCustomRoomInput(e.target.value)}
                    placeholder="e.g. CLASH-4821"
                    className="flex-1 px-3 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono uppercase text-white outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white border border-slate-700 transition-colors"
                  >
                    Join
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Card 2: 1v1 Ranked Matchmaking */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1423] border border-slate-800 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Swords className="w-6 h-6" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-1 block">
              Random Matchmaking
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">Ranked 1v1 Queue</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Automatic pairing with waiting online players or ClashBot AI calibrated to your tier.
            </p>
          </div>

          <div>
            {isSearching ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-mono text-emerald-300 font-bold">
                      Searching... ({queueTimer}s)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Bot: 7s</span>
                </div>
                <button
                  onClick={handleCancelRanked}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700"
                >
                  Cancel Search
                </button>
              </div>
            ) : (
              <button
                onClick={handleStartRanked}
                className="w-full py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-emerald-400" />
                <span>Join Global Queue</span>
              </button>
            )}
          </div>
        </div>

        {/* Card 3: Solo AI Practice Mode */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f1423] border border-slate-800 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
              <Bot className="w-6 h-6" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-wider text-violet-400 mb-1 block">
              Solo Practice
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">Battle ClashBot</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Instant solo battle against ClashBot AI with staggered progress updates.
            </p>
          </div>

          <div>
            <button
              onClick={handleStartRanked}
              className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Launch Practice Match</span>
            </button>
          </div>
        </div>

      </div>

      {/* Leaderboard Snippet Preview */}
      {leaderboardTop.length > 0 && (
        <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-[#0f1423] border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-sm text-white">Top Arena Grandmasters</h4>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Live FIDE Elo Calibration</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {leaderboardTop.map((player, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
                <img
                  src={player.avatar}
                  alt={player.username}
                  className="w-10 h-10 rounded-xl mx-auto mb-2 bg-slate-800 border border-slate-700"
                />
                <div className="font-bold text-xs text-white truncate">{player.username}</div>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold">{player.eloRating} ELO</div>
                <span className="text-[10px] text-amber-400 font-bold block mt-0.5">{player.tierInfo?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}