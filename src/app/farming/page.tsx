'use client';

import React, { useState } from 'react';
import { useAccount } from '@/services/accountStore';
import { calculateFarmingRequirements } from '@/services/engines';
import { Wheat, Zap, Calendar, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FarmingPage() {
  const { account, updateResin } = useAccount();

  const [selectedCharacter, setSelectedCharacter] = useState('hu_tao');
  const farmingMath = calculateFarmingRequirements(account, selectedCharacter);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Wheat className="w-6 h-6 text-amber-400" />
            <span>RESOURCE DEPENDENCY ENGINE & RESIN PLANNER</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Exact owned vs required missing material calculations, domain rotations, and resin optimization.
          </p>
        </div>

        {/* Resin quick controller */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
          <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
          <div className="text-xs">
            <span className="text-slate-400 block text-[10px]">CURRENT RESIN</span>
            <span className="font-mono font-bold text-cyan-300">{account.resin.current} / 200</span>
          </div>
          <button
            onClick={() => updateResin(account.resin.current + 20)}
            className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-xs font-bold rounded-xl ml-2"
          >
            +20 Resin
          </button>
        </div>
      </div>

      {/* Target Character Material Math Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-semibold">
              DEPENDENCY GRAPH
            </span>
            <h2 className="text-xl font-bold text-slate-100 mt-1">Hu Tao Ascension & Talent Needs</h2>
          </div>

          <div className="text-xs font-mono text-amber-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            Overall Completion: <span className="font-bold">{farmingMath.overallCompletionPercent}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
            style={{ width: `${farmingMath.overallCompletionPercent}%` }}
          />
        </div>

        {/* Material Items Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {farmingMath.neededMaterials.map(mat => (
            <div
              key={mat.materialId}
              className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-100">{mat.materialName}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    mat.missing === 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {mat.missing === 0 ? 'DONE' : `MISSING ${mat.missing}`}
                  </span>
                </div>

                <div className="text-xs text-slate-400 space-y-1 mt-2">
                  <div className="flex justify-between">
                    <span>Owned</span>
                    <span className="font-mono text-slate-200">{mat.owned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required</span>
                    <span className="font-mono text-slate-200">{mat.required}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                <span className="font-semibold text-slate-300 block">Sources:</span>
                {mat.sourceLocations.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Rotation Today & Resin Optimizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm">TODAY&apos;S DOMAIN ROTATIONS</h3>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">Taishan Mansion (Liyue)</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                AVAILABLE TODAY
              </span>
            </div>
            <p className="text-xs text-slate-400">Drops: Philosophies of Diligence (Hu Tao Talent Book)</p>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#121626] to-[#0f121d] border border-amber-500/30 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-300 text-sm">RESIN OPTIMIZER PROPOSAL</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            With <strong>120 Resin available</strong>, spending 40 Resin on Taishan Mansion and 80 Resin on Primo Geovishap will maximize your progression towards your active goal!
          </p>
        </div>
      </div>
    </div>
  );
}
