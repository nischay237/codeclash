import React from 'react';
import { playTaunt } from '../utils/audioSynthesizer';

const TAUNTS = [
  { emoji: '🔥', label: 'Fire' },
  { emoji: '⚡', label: 'Fast' },
  { emoji: '🧠', label: 'Big Brain' },
  { emoji: '🚀', label: 'Shipped' },
  { emoji: '🤔', label: 'Thinking' },
  { emoji: '👏', label: 'GG' }
];

export default function EmojiTauntBar({ onSendTaunt }) {
  const handleClick = (t) => {
    playTaunt();
    if (onSendTaunt) onSendTaunt(t.emoji, t.label);
  };

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
      <span className="text-[10px] uppercase font-bold text-slate-500 px-2 hidden sm:inline">
        Quick Reaction:
      </span>
      {TAUNTS.map((t, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(t)}
          title={`Send "${t.label}" reaction`}
          className="px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:scale-110 active:scale-95 transition-all text-sm flex items-center gap-1 text-slate-200"
        >
          <span>{t.emoji}</span>
          <span className="text-[10px] font-medium hidden md:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
