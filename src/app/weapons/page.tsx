'use client';

import React, { useState } from 'react';
import { WEAPONS_DATA } from '@/data';
import { useAccount } from '@/services/accountStore';
import { Shield, Search, Star, Lock, Unlock, Sparkles, UserCheck } from 'lucide-react';

export default function WeaponsPage() {
  const { account } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const filteredWeapons = WEAPONS_DATA.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.passiveName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'ALL' || w.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-amber-400" />
            <span>WEAPON CATALOG & INVENTORY</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore weapons, stats, passives, and track equipped weapon inventory.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search weapons..."
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="Polearm">Polearm</option>
            <option value="Sword">Sword</option>
            <option value="Claymore">Claymore</option>
            <option value="Bow">Bow</option>
            <option value="Catalyst">Catalyst</option>
          </select>
        </div>
      </div>

      {/* Weapons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWeapons.map(weapon => {
          const ownedWeapon = account.weapons.find(w => w.weaponId === weapon.id);

          return (
            <div
              key={weapon.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                    {weapon.rarity}★ {weapon.type}
                  </span>
                  {ownedWeapon && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Owned Lvl {ownedWeapon.level}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-100">{weapon.name}</h3>

                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Base ATK</span>
                    <span className="font-mono font-bold text-slate-200">{weapon.baseAtk}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{weapon.secondaryStat}</span>
                    <span className="font-mono font-bold text-amber-300">{weapon.secondaryStatValue}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-xs font-bold text-amber-400 block">{weapon.passiveName}</span>
                  <p className="text-xs text-slate-400 leading-relaxed">{weapon.passiveDescription}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Release: v{weapon.releaseVersion}</span>
                <span className="text-slate-400 font-medium">
                  {weapon.recommendedCharacters.length} Rec. Users
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
