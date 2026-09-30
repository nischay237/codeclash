import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Skull, Swords, ArrowRight, RotateCcw, Code2, Sparkles, ShieldCheck } from 'lucide-react';
import { playVictory, playDefeat } from '../utils/audioSynthesizer';

export default function VictoryModal({ matchResult, currentUser, onPlayAgain, onBackToLobby }) {
  const [showCode, setShowCode] = useState(false);

  if (!matchResult) return null;

  const isWinner = matchResult.winner === currentUser.username;
  const userEloData = matchResult.eloChange?.[currentUser.username];

  useEffect(() => {
    if (isWinner) {
      playVictory();
      // Blast Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
      } catch (e) {}
    } else {
      playDefeat();
    }
  }, [isWinner]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-[#0d121f] rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        
        {/* Glow ambient background */}
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isWinner ? 'bg-emerald-500' : 'bg-red-500'
        }`} />

        {/* Status Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-xl border border-slate-700/60 bg-slate-900/90">
          {isWinner ? (
            <Trophy className="w-8 h-8 text-amber-400 animate-bounce" />
          ) : (
            <Skull className="w-8 h-8 text-red-400" />
          )}
        </div>

        {/* Title */}
        <h2 className={`text-3xl font-black tracking-tight mb-1 ${
          isWinner 
            ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-red-400 via-rose-300 to-amber-400 bg-clip-text text-transparent'
        }`}>
          {isWinner ? 'VICTORY ACHIEVED!' : 'MATCH DEFEAT'}
        </h2>

        <p className="text-xs text-slate-400 font-medium mb-6">
          {isWinner 
            ? 'You out-coded your opponent and passed all test suites first!'
            : `${matchResult.winner} solved the challenge and locked in the win.`}
        </p>

        {/* Match Statistics Card */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 mb-6 text-left">
          
          {/* ELO Rating Update */}
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Rating Update</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black font-mono text-white">
                {userEloData?.newElo || currentUser.eloRating}
              </span>
              {userEloData?.delta !== undefined && (
                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                  userEloData.delta >= 0 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {userEloData.delta >= 0 ? `+${userEloData.delta}` : userEloData.delta} ELO
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
              Tier: {userEloData?.tier?.name || currentUser.tier} {userEloData?.tier?.badge || '🥈'}
            </span>
          </div>

          {/* Duration */}
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Time Elapsed</span>
            <div className="text-lg font-black font-mono text-white">
              {matchResult.durationSec || 45}s
            </div>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
              Winner: <strong className="text-emerald-400">{matchResult.winner}</strong>
            </span>
          </div>

        </div>

        {/* Code Review Toggle */}
        {matchResult.winnerCode && (
          <div className="mb-6">
            <button
              onClick={() => setShowCode(!showCode)}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 mx-auto"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{showCode ? 'Hide Winning Solution' : 'View Winning Solution Code'}</span>
            </button>
            {showCode && (
              <pre className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs font-mono text-emerald-300 overflow-x-auto max-h-48">
                {matchResult.winnerCode}
              </pre>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLobby}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Lobby</span>
          </button>

          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Swords className="w-4 h-4" />
            <span>Play Next Match</span>
          </button>
        </div>

      </div>
    </div>
  );
}
