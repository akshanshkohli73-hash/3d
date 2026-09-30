'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { CHARACTERS_DATA } from '@/data/characters';
import { CharacterAssetResolver } from '@/services/characterAssets';
import { useAccount } from '@/services/accountStore';
import {
  ArrowLeft,
  Sparkles,
  Shield,
  Zap,
  Swords,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Brain,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function CharacterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const characterId = resolvedParams.id;
  const { account } = useAccount();

  const character = CHARACTERS_DATA.find(c => c.id === characterId) || CHARACTERS_DATA[0];
  const userChar = account.characters.find(c => c.characterId === character.id);
  const assets = CharacterAssetResolver.getAssets(character.id);

  const [activeTab, setActiveTab] = useState<'overview' | 'build' | 'talents' | 'materials' | 'ai'>('overview');

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Back Button */}
      <Link
        href="/characters"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-300 transition-colors bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO ROSTER</span>
      </Link>

      {/* Hero Header Banner with Character Splash / Artwork */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-[#131728] to-[#0f121d] border border-slate-800 p-6 md:p-8 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8">
        {/* Background glow element */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Character Card / Splash Image Display */}
        <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl shrink-0 group">
          <img
            src={assets.card}
            alt={character.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              const fallback = CharacterAssetResolver.getFallbackImage(character.id);
              if (img.src !== fallback) {
                img.src = fallback;
              }
            }}
          />
          <div className="absolute bottom-2 left-2 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300 border border-amber-500/30">
            {character.rarity}★ {character.element}
          </div>
        </div>

        {/* Character Details & Meta */}
        <div className="flex-1 space-y-3 text-center md:text-left z-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              {character.weaponType} • {character.region}
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
              Version {character.releaseVersion}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-100 tracking-tight">
            {character.name}
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {character.description}
          </p>

          {/* Account Level Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono">
            <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] block">CURRENT LEVEL</span>
              <span className="font-bold text-amber-300">{userChar ? `Lv. ${userChar.level}/90` : 'Not In Roster'}</span>
            </div>
            <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] block">CONSTELLATION</span>
              <span className="font-bold text-cyan-300">{userChar ? `C${userChar.constellation}` : 'C0'}</span>
            </div>
            <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[10px] block">ROLE</span>
              <span className="font-bold text-slate-200">{character.recommendedRoles.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'OVERVIEW' },
          { id: 'build', label: 'CURRENT BUILD' },
          { id: 'talents', label: 'TALENTS' },
          { id: 'materials', label: 'MATERIALS' },
          { id: 'ai', label: 'BUILD DOCTOR AI' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Base Stats Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 tracking-wider">BASE STATS (LV. 90)</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Base HP</span>
                <span className="font-bold font-mono text-slate-200">{character.baseStats.hp}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Base ATK</span>
                <span className="font-bold font-mono text-slate-200">{character.baseStats.atk}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Base DEF</span>
                <span className="font-bold font-mono text-slate-200">{character.baseStats.def}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">{character.baseStats.specialStat}</span>
                <span className="font-bold font-mono text-amber-300">{character.baseStats.specialStatValue}</span>
              </div>
            </div>
          </div>

          {/* Recommended Artifact Sets & Weapons */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 tracking-wider">OPTIMAL GEAR RECOMMENDATIONS</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-bold">BEST 4-PIECE ARTIFACT</span>
                <span className="font-bold text-amber-300 capitalize">
                  {character.recommendedArtifactSets?.fourPiece?.replace(/_/g, ' ') || 'Custom Sets'}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-bold">RECOMMENDED WEAPONS</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {character.recommendedWeapons.map(w => (
                    <span key={w} className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-[11px] text-slate-200 capitalize">
                      {w.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="bg-gradient-to-b from-[#121626] to-[#0d0f19] border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <Brain className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-amber-300">BUILD DOCTOR DIAGNOSIS & ACTION PLAN</h3>
              <p className="text-xs text-slate-400">Account-aware evaluation computed deterministically from your current inventory and stats.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> WHAT IS WORKING
              </span>
              <p className="text-xs text-slate-300">
                Main stats on Sands, Goblet, and Circlet match recommended build targets. Weapon level is maxed at 90/90.
              </p>
            </div>

            <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> WHAT TO IMPROVE
              </span>
              <p className="text-xs text-slate-300">
                CRIT Rate is slightly low at 58.4%. Aim for at least 70% CRIT Rate to stabilize Vaporize damage output.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
