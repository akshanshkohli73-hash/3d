'use client';

import React, { useState } from 'react';
import { QUESTS_DATA } from '@/data';
import { useAccount } from '@/services/accountStore';
import { BookOpen, CheckCircle2, Circle, Search, ArrowRight, Award } from 'lucide-react';

export default function QuestsPage() {
  const { account } = useAccount();
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredQuests = QUESTS_DATA.filter(q => categoryFilter === 'ALL' || q.category === categoryFilter);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <span>QUEST DATABASE & UNLOCK CHAIN TRACKER</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse Archon, World, and Hidden quests with prerequisite chain solver.
          </p>
        </div>

        {/* Filter */}
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
        >
          <option value="ALL">All Quest Types</option>
          <option value="Archon">Archon Quests</option>
          <option value="Story">Story Quests</option>
          <option value="World">World Quests</option>
          <option value="Hidden">Hidden Quests</option>
        </select>
      </div>

      {/* Quest List */}
      <div className="space-y-3">
        {filteredQuests.map(quest => {
          const isCompleted = account.completedQuestIds.includes(quest.id);

          return (
            <div
              key={quest.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
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
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-semibold">
                      {quest.category} • {quest.region}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100">{quest.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400">{quest.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-amber-300 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 shrink-0">
                <Award className="w-4 h-4 text-amber-400" />
                <span>+{quest.rewards.primogems} Primogems</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
