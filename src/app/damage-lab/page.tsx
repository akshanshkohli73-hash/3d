'use client';

import React, { useState } from 'react';
import { calculateDamage } from '@/services/engines';
import { Calculator, ArrowRightLeft, Sparkles, Zap, Flame, Shield, TrendingUp } from 'lucide-react';

export default function DamageLabPage() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'comparison'>('calculator');

  // Calculator Form State
  const [baseAtk, setBaseAtk] = useState(714);
  const [atkPercent, setAtkPercent] = useState(120);
  const [flatAtk, setFlatAtk] = useState(311);
  const [skillMultiplier, setSkillMultiplier] = useState(242);
  const [elementalBonus, setElementalBonus] = useState(46.6);
  const [critDmg, setCritDmg] = useState(210);
  const [reactionMult, setReactionMult] = useState(1.5);

  const calcResult = calculateDamage(
    baseAtk,
    atkPercent,
    flatAtk,
    skillMultiplier,
    elementalBonus,
    critDmg,
    true,
    reactionMult
  );

  // Comparison Build State
  const buildA = { name: 'Build A (Staff of Homa)', critRate: '68%', critDmg: '220%', em: '140', estVapeDmg: '54,200' };
  const buildB = { name: 'Build B (Ballad of Fjords)', critRate: '82%', critDmg: '180%', em: '280', estVapeDmg: '51,800' };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Calculator className="w-6 h-6 text-amber-400" />
            <span>DAMAGE LABORATORY & BUILD COMPARISON</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic Genshin damage formula breakdown (ATK × Multipliers × Reaction × DEF × RES).
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'calculator' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Formula Calculator
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'comparison' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Build Comparison Lab
          </button>
        </div>
      </div>

      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs Panel */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-xs font-bold text-amber-300 tracking-wider">FORMULA INPUT PARAMETERS</h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block text-[11px] font-medium">Base ATK (Char + Weapon)</label>
                <input
                  type="number"
                  value={baseAtk}
                  onChange={e => setBaseAtk(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[11px] font-medium">Total ATK% Bonus</label>
                <input
                  type="number"
                  value={atkPercent}
                  onChange={e => setAtkPercent(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[11px] font-medium">Flat ATK (Feather, Substats)</label>
                <input
                  type="number"
                  value={flatAtk}
                  onChange={e => setFlatAtk(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[11px] font-medium">Skill Multiplier %</label>
                <input
                  type="number"
                  value={skillMultiplier}
                  onChange={e => setSkillMultiplier(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[11px] font-medium">Elemental DMG Bonus %</label>
                <input
                  type="number"
                  value={elementalBonus}
                  onChange={e => setElementalBonus(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[11px] font-medium">CRIT DMG %</label>
                <input
                  type="number"
                  value={critDmg}
                  onChange={e => setCritDmg(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Computed Results Panel */}
          <div className="bg-gradient-to-b from-[#121626] to-[#0f121d] border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-xs font-bold text-amber-300 tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> COMPUTED DAMAGE RESULTS
            </h2>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Non-CRIT Hit</span>
                <span className="text-2xl font-black font-mono text-slate-200">{calcResult.nonCritDamage.toLocaleString()}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">CRIT Hit</span>
                <span className="text-2xl font-black font-mono text-amber-300">{calcResult.critDamage.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/40 text-center space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Vaporize Reaction CRIT Hit
              </span>
              <span className="text-4xl font-black font-mono text-amber-200">
                {calcResult.reactionDamage.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 block pt-1">
                Calculated with 1.5x Vaporize multiplier & 10% enemy RES
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
            <span className="text-xs font-bold text-amber-300">{buildA.name}</span>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>CRIT Rate</span>
                <span>{buildA.critRate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>CRIT DMG</span>
                <span>{buildA.critDmg}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Elemental Mastery</span>
                <span>{buildA.em}</span>
              </div>
              <div className="flex justify-between font-bold text-amber-300 pt-1">
                <span>Est. Vaporize Hit</span>
                <span>{buildA.estVapeDmg}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
            <span className="text-xs font-bold text-cyan-300">{buildB.name}</span>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>CRIT Rate</span>
                <span>{buildB.critRate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>CRIT DMG</span>
                <span>{buildB.critDmg}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Elemental Mastery</span>
                <span>{buildB.em}</span>
              </div>
              <div className="flex justify-between font-bold text-cyan-300 pt-1">
                <span>Est. Vaporize Hit</span>
                <span>{buildB.estVapeDmg}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
