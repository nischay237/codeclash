import React, { useEffect, useState } from 'react';
import { Bot, User, Flame, Zap, Shield, CheckCircle2, Clock } from 'lucide-react';

export default function OpponentRadar({ opponent, opponentProgress, incomingTaunt }) {
  const [activeTaunt, setActiveTaunt] = useState(null);

  useEffect(() => {
    if (incomingTaunt) {
      setActiveTaunt(incomingTaunt);
      const timer = setTimeout(() => setActiveTaunt(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [incomingTaunt]);

  if (!opponent) {
    return (
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center animate-pulse">
        <span className="text-xs text-slate-500 font-mono">Connecting to opponent telemetry...</span>
      </div>
    );
  }

  const progress = Math.min(100, Math.max(0, opponentProgress?.progressPercent || 0));
  const testsPassed = opponentProgress?.testsPassed || 0;
  const totalTests = opponentProgress?.totalTests || 0;

  return (
    <div className="relative p-4 rounded-2xl bg-[#0f1423] border border-slate-800 shadow-xl overflow-hidden">
      
      {/* Floating Tactical Taunt Reaction Bubble */}
      {activeTaunt && (
        <div className="absolute top-2 right-4 z-30 animate-bounce flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/90 text-white text-xs font-bold shadow-lg shadow-violet-500/30 border border-violet-400">
          <span className="text-base">{activeTaunt.emoji}</span>
          <span>{activeTaunt.text || 'Opponent reacted!'}</span>
        </div>
      )}

      {/* Opponent Identity Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={opponent.avatar}
              alt={opponent.username}
              className="w-10 h-10 rounded-xl bg-slate-800 border-2 border-violet-500/50 shadow-md shadow-violet-500/20"
            />
            {opponent.isBot ? (
              <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-violet-500 text-white" title="AI Bot Opponent">
                <Bot className="w-3 h-3" />
              </span>
            ) : (
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-100">
                {opponent.username}
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {opponent.tier || 'Silver'}
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <span>{opponent.eloRating || 1200} ELO</span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Telemetry
              </span>
            </div>
          </div>
        </div>

        {/* Test Passes Counter */}
        <div className="text-right">
          <div className="text-[11px] text-slate-400 font-medium">Tests Passed</div>
          <div className="text-sm font-mono font-bold text-violet-400 flex items-center gap-1 justify-end">
            <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
            <span>{testsPassed}</span>
            <span className="text-slate-600">/</span>
            <span>{totalTests || '?'}</span>
          </div>
        </div>
      </div>

      {/* Real-Time Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span>Solving Progress</span>
          <span className="font-bold text-violet-300">{progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden p-[1px]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 transition-all duration-500 ease-out shadow-sm shadow-violet-500/50"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
}
