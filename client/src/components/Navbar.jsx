import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { 
  Swords, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Layers, 
  ArrowLeft,
  FileText
} from 'lucide-react';
import { getMuted, setMuted } from '../utils/audioSynthesizer';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Navbar({ currentView, setCurrentView }) {
  const { user } = useAuth();
  const { connected } = useSocket();
  const [muted, setLocalMuted] = useState(getMuted());

  const handleToggleSound = () => {
    const next = !muted;
    setLocalMuted(next);
    setMuted(next);
  };

  const isArenaMode = currentView === 'lobby' || currentView === 'battle' || currentView === 'leaderboard';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        
        {/* Left: Brand Identity */}
        <div 
          onClick={() => setCurrentView('portfolio')} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 p-[2px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
            <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center font-bold text-sm text-emerald-400 group-hover:scale-105 transition-transform">
              NS
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                Nischay <span className="text-emerald-400">Srivastava</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-block">
                Portfolio
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden md:block">
              Full-Stack & AI Systems
            </p>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setCurrentView('portfolio')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'portfolio'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Projects</span>
          </button>

          <button
            onClick={() => setCurrentView('lobby')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'lobby' || currentView === 'battle'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
            <span className="hidden xs:inline">CodeClash</span> Arena
          </button>

          <button
            onClick={() => setCurrentView('leaderboard')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'leaderboard'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Leaderboard</span>
          </button>
        </nav>

        {/* Right: Controls, Status & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Back to Portfolio pill if in Arena */}
          {isArenaMode && (
            <button
              onClick={() => setCurrentView('portfolio')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold cursor-pointer transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>
          )}

          {/* GitHub link */}
          <a
            href="https://github.com/nischay237"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors hidden sm:block"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Socket Gateway indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-400">
            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <span>{connected ? 'Socket Live' : 'Reconnecting...'}</span>
          </div>

          {/* Audio Mute Toggle */}
          <button
            onClick={handleToggleSound}
            title={muted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* User Badge if logged in */}
          {user && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 border border-slate-700"
              />
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-white leading-tight">
                    {user.username}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  {user.eloRating || 1200} ELO
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
