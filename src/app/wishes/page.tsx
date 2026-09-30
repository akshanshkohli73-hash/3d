'use client';

import React from 'react';
import { useAccount } from '@/services/accountStore';
import { calculatePityStats } from '@/services/engines';
import { Flame, Star, Sparkles, TrendingUp, History, ShieldCheck } from 'lucide-react';

export default function WishesPage() {
  const { account } = useAccount();
  const pityStats = calculatePityStats(account.wishes);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-amber-400" />
            <span>PITY TRACKER & PULL ANALYTICS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Exact soft/hard pity counters, 5-star history, and pull distribution.
          </p>
        </div>

        {/* Currency summary */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-2xl text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-bold text-amber-300">{account.primogems.toLocaleString()} Primos</span>
          </div>
          <div className="bg-slate-900 border border-purple-500/30 px-3 py-1.5 rounded-2xl text-xs flex items-center gap-2">
            <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
            <span className="font-mono font-bold text-purple-300">{account.intertwinedFates} Fates</span>
          </div>
        </div>
      </div>

      {/* Pity Stats Gauge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Character Event Banner Pity */}
        <div className="bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 tracking-wider">CHARACTER EVENT BANNER</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
              Cap: 90
            </span>
          </div>

          <div className="text-center space-y-1">
            <span className="text-4xl font-black font-mono text-amber-400">
              {pityStats.characterBanner.currentPity}
            </span>
            <span className="text-xs text-slate-400 block">Current Pity Counter</span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full"
              style={{ width: `${(pityStats.characterBanner.currentPity / 90) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 block">Avg 5★ Pity</span>
              <span className="font-mono font-bold text-slate-200">{pityStats.characterBanner.averagePityPer5Star}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Guarantee Status</span>
              <span className="font-bold text-amber-300">50/50 Next</span>
            </div>
          </div>
        </div>

        {/* Weapon Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300 tracking-wider">WEAPON EVENT BANNER</span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
              Cap: 80
            </span>
          </div>

          <div className="text-center space-y-1">
            <span className="text-4xl font-black font-mono text-purple-300">12</span>
            <span className="text-xs text-slate-400 block">Current Pity Counter</span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: '15%' }} />
          </div>
        </div>

        {/* Standard Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 tracking-wider">STANDARD WISH</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">
              Cap: 90
            </span>
          </div>

          <div className="text-center space-y-1">
            <span className="text-4xl font-black font-mono text-cyan-300">42</span>
            <span className="text-xs text-slate-400 block">Current Pity Counter</span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: '46%' }} />
          </div>
        </div>
      </div>

      {/* Wish History Log Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <span>5-STAR & 4-STAR WISH HISTORY LOG</span>
          </h3>
          <span className="text-xs text-slate-400">Total Recorded Wishes: {account.wishes.length}</span>
        </div>

        <div className="space-y-2">
          {account.wishes.map(wish => (
            <div
              key={wish.id}
              className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center ${
                  wish.rarity === 5 ? 'bg-amber-500 text-slate-950' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  {wish.rarity}★
                </div>
                <div>
                  <h4 className="font-bold text-slate-100">{wish.itemName}</h4>
                  <p className="text-[10px] text-slate-400">{wish.bannerType} • {wish.timestamp}</p>
                </div>
              </div>

              <div className="font-mono text-right">
                <span className="text-amber-300 font-bold block">Pity {wish.pullNumber}</span>
                <span className="text-[10px] text-slate-500">{wish.isPity5Star ? '5★ Pull' : '4★ Drop'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
