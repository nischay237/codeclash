import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Flame, Search, ArrowUpRight, ShieldCheck, User } from 'lucide-react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLeaderboard(data.leaderboard || []);
          setTiers(data.tiers || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = leaderboard.filter(u => 
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
          <Trophy className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
          Global Arena Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Calibrated via the official FIDE Chess Elo algorithm. Win matches to climb the competitive ranks.
        </p>
      </div>

      {/* Tier Badges Breakdown */}
      {tiers.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto mb-10">
          {tiers.map((t, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-[#0f1423] border border-slate-800 text-center">
              <span className="text-xl mb-1 block">{t.badge}</span>
              <div className="font-bold text-xs text-white">{t.name}</div>
              <div className="text-[11px] font-mono text-slate-400">{t.minElo}+ ELO</div>
            </div>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6 relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by coder username..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0f1423] border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-3xl bg-[#0f1423] border border-slate-800 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs">
            Loading arena rankings...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs">
            No players found matching "{search}"
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Rank</th>
                  <th className="py-3.5 px-4">Challenger</th>
                  <th className="py-3.5 px-4">Rating</th>
                  <th className="py-3.5 px-4">Tier</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">Record (W - L)</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Win Rate</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filtered.map((player) => (
                  <tr key={player.rank} className="hover:bg-slate-900/50 transition-colors">
                    
                    {/* Rank */}
                    <td className="py-3 px-4 sm:px-6 font-mono font-bold">
                      {player.rank === 1 ? <span className="text-amber-400 text-sm font-black">🥇 #1</span> :
                       player.rank === 2 ? <span className="text-slate-300 text-sm font-black">🥈 #2</span> :
                       player.rank === 3 ? <span className="text-amber-600 text-sm font-black">🥉 #3</span> :
                       <span className="text-slate-500">#{player.rank}</span>}
                    </td>

                    {/* Username & Avatar */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={player.avatar}
                          alt={player.username}
                          className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700"
                        />
                        <span className="font-bold text-white truncate max-w-[140px] sm:max-w-none">
                          {player.username}
                        </span>
                      </div>
                    </td>

                    {/* Elo Rating */}
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {player.eloRating}
                    </td>

                    {/* Tier */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300">
                        <span>{player.tierInfo?.badge}</span>
                        <span>{player.tierInfo?.name}</span>
                      </span>
                    </td>

                    {/* Record */}
                    <td className="py-3 px-4 hidden sm:table-cell font-mono text-slate-400">
                      <span className="text-emerald-400 font-bold">{player.wins}W</span>
                      <span className="mx-1 text-slate-600">-</span>
                      <span className="text-red-400">{player.losses}L</span>
                    </td>

                    {/* Win Rate */}
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${player.winRatePercent}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-slate-300 font-bold">
                          {player.winRatePercent}%
                        </span>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="py-3 px-4 sm:px-6 text-right font-mono">
                      {player.winStreak > 0 ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                          <Flame className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{player.winStreak} streak</span>
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
