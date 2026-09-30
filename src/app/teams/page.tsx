'use client';

import React, { useState } from 'react';
import { useAccount } from '@/services/accountStore';
import { CHARACTERS_DATA } from '@/data/characters';
import {
  Swords,
  Play,
  RotateCw,
  Sparkles,
  Shield,
  Zap,
  Flame,
  CheckCircle2,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function TeamsPage() {
  const { account } = useAccount();

  const [activeTeamOption, setActiveTeamOption] = useState<'high' | 'low' | 'roster' | 'reaction'>('roster');
  const [currentRotationStep, setCurrentRotationStep] = useState<number>(0);

  const teamOptions = {
    roster: {
      name: 'Roster Aligned (Vaporize Hypercarry)',
      investment: 'Already Built',
      characters: ['hu_tao', 'xingqiu', 'kazuha', 'bennett'],
      description: 'Leverages your built Hu Tao, Xingqiu, Kazuha, and Bennett for high single-target DPS.',
      rotation: [
        { char: 'Xingqiu', action: 'Elemental Skill (Fatal Rainscreen) + Burst (Raincutter)', cd: 21, energy: 'Restores 80 Energy', duration: '15s Hydro Application' },
        { char: 'Kazuha', action: 'Elemental Skill (Chihayaburu) + Swirl Hydro', cd: 6, energy: 'Generates 3 particles', duration: '8s 40% Hydro DMG Buff' },
        { char: 'Bennett', action: 'Elemental Burst (Fantastic Voyage)', cd: 15, energy: 'Restores 60 Energy', duration: '12s ATK Buff + Healing' },
        { char: 'Hu Tao', action: 'Elemental Skill (Guide to Afterlife) + Charged Attacks x8', cd: 16, energy: 'Consumes HP', duration: '9s Paramita Papilio State' },
        { char: 'Hu Tao', action: 'Elemental Burst (Spirit Soother) before E ends', cd: 15, energy: 'Consumes 60 Energy', duration: 'Nuke Damage + HP Regen' }
      ]
    },
    high: {
      name: 'High Investment (Raiden Hypercarry)',
      investment: 'High Investment',
      characters: ['raiden_shogun', 'kazuha', 'bennett', 'furina'],
      description: 'Maximum burst damage rotation requiring heavy talent crown investment.',
      rotation: [
        { char: 'Raiden Shogun', action: 'Elemental Skill (Baleful Omen)', cd: 10, energy: 'Generates particles', duration: '25s Eye Uptime' },
        { char: 'Furina', action: 'Elemental Skill + Burst (Universal Revelry)', cd: 15, energy: '60 Energy', duration: '18s Fanfare Buff' },
        { char: 'Kazuha', action: 'Elemental Skill + Burst Swirl', cd: 15, energy: '60 Energy', duration: '8s Electro DMG Buff' },
        { char: 'Raiden Shogun', action: 'Elemental Burst (Musou Shinsetsu) + Attacks', cd: 18, energy: '90 Energy', duration: '7s Musou Isshin State' }
      ]
    },
    reaction: {
      name: 'Reaction Focused (Hyperbloom Core)',
      investment: 'Low / Medium Investment',
      characters: ['nahida', 'xingqiu', 'raiden_shogun', 'furina'],
      description: 'Consistent off-field Dendro cores detonated by Electro for high floor damage.',
      rotation: [
        { char: 'Nahida', action: 'Elemental Skill Hold (Mark Enemies) + Burst', cd: 6, energy: '50 Energy', duration: '15s Tri-Karma Purification' },
        { char: 'Xingqiu', action: 'Elemental Skill + Burst', cd: 20, energy: '80 Energy', duration: '15s Rain Swords' },
        { char: 'Raiden Shogun', action: 'Elemental Skill (Full EM build)', cd: 10, energy: '0 Energy needed', duration: '0.9s Hyperbloom triggers' }
      ]
    }
  };

  const currentTeam = teamOptions[activeTeamOption as keyof typeof teamOptions];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Swords className="w-6 h-6 text-amber-400" />
            <span>PERSONALISED TEAM BUILDER & ROTATION SIMULATOR</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate team compositions tailored to your roster investment and simulate step-by-step rotations.
          </p>
        </div>

        {/* Option Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => { setActiveTeamOption('roster'); setCurrentRotationStep(0); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTeamOption === 'roster' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Roster Aligned
          </button>
          <button
            onClick={() => { setActiveTeamOption('high'); setCurrentRotationStep(0); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTeamOption === 'high' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            High Investment
          </button>
          <button
            onClick={() => { setActiveTeamOption('reaction'); setCurrentRotationStep(0); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTeamOption === 'reaction' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Reaction Focused
          </button>
        </div>
      </div>

      {/* Team Composition Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-semibold">
              {currentTeam.investment}
            </span>
            <h2 className="text-xl font-bold text-slate-100 mt-1">{currentTeam.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{currentTeam.description}</p>
          </div>
        </div>

        {/* 4 Character Slots Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {currentTeam.characters.map((charId, idx) => {
            const charData = CHARACTERS_DATA.find(c => c.id === charId) || { name: charId, element: 'Pyro', weaponType: 'Sword' };
            const isOwned = account.characters.some(c => c.characterId === charId);

            return (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 flex flex-col items-center text-center space-y-2 relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-sm text-amber-300">
                  {charData.element.substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-100">{charData.name}</h3>
                  <p className="text-[10px] text-slate-400">{charData.element} • {charData.weaponType}</p>
                </div>
                {isOwned && (
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30 font-bold flex items-center gap-0.5">
                    <UserCheck className="w-2.5 h-2.5" /> Ready
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Rotation Simulator */}
      <div className="bg-gradient-to-b from-[#121626] to-[#0f121d] border border-amber-500/30 rounded-3xl p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <RotateCw className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-300 text-sm tracking-wider">ROTATION SIMULATOR</h3>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentRotationStep(prev => (prev > 0 ? prev - 1 : currentTeam.rotation.length - 1))}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg border border-slate-700"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentRotationStep(prev => (prev < currentTeam.rotation.length - 1 ? prev + 1 : 0))}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 rounded-lg flex items-center gap-1"
            >
              <Play className="w-3 h-3 fill-slate-950" /> Next Step
            </button>
          </div>
        </div>

        {/* Rotation Steps Timeline */}
        <div className="space-y-3">
          {currentTeam.rotation.map((step, idx) => {
            const isActive = idx === currentRotationStep;

            return (
              <div
                key={idx}
                onClick={() => setCurrentRotationStep(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border-amber-500/60 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center ${
                    isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{step.char}</h4>
                    <p className="text-xs text-amber-300 font-medium">{step.action}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 pl-11 md:pl-0">
                  <span>CD: {step.cd}s</span>
                  <span>Energy: {step.energy}</span>
                  <span className="text-emerald-400">{step.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
