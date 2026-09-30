'use client';

import React, { useState } from 'react';
import { ACHIEVEMENTS_DATA } from '@/data';
import { useAccount } from '@/services/accountStore';
import { Trophy, Search, CheckCircle2, Circle, Sparkles, EyeOff } from 'lucide-react';

export default function AchievementsPage() {
  const { account } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAchievements = ACHIEVEMENTS_DATA.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>ACHIEVEMENT HUNTER & HIDDEN SOLVER</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track category achievements and discover hidden achievement requirements.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search achievements..."
            className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map(ach => {
          const isCompleted = account.completedAchievementIds.includes(ach.id);

          return (
            <div
              key={ach.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-100">{ach.title}</h3>
                    {ach.hidden && (
                      <span className="text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded font-semibold flex items-center gap-1">
                        <EyeOff className="w-2.5 h-2.5" /> Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">{ach.description}</p>
                </div>
              </div>

              <div className="text-xs font-mono text-amber-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>+{ach.primogems}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
