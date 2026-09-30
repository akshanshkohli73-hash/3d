'use client';

import React, { useState } from 'react';
import { GAME_VERSIONS_DATA, LORE_DATA } from '@/data';
import { BookMarked, Layers, Sparkles, Flame, History, ChevronRight } from 'lucide-react';

export default function EncyclopediaPage() {
  const [activeTab, setActiveTab] = useState<'mechanics' | 'lore' | 'patches'>('mechanics');

  const elementalReactions = [
    { name: 'Vaporize', elements: 'Hydro + Pyro', multiplier: '1.5x / 2.0x DMG Multiplier', description: 'Triggers when Hydro and Pyro react. Forward Vaporize (Hydro on Pyro) deals 2.0x DMG. Reverse Vaporize (Pyro on Hydro) deals 1.5x DMG.' },
    { name: 'Melt', elements: 'Pyro + Cryo', multiplier: '1.5x / 2.0x DMG Multiplier', description: 'Triggers when Pyro and Cryo react. Forward Melt (Pyro on Cryo) deals 2.0x DMG.' },
    { name: 'Hyperbloom', elements: 'Dendro + Hydro + Electro', multiplier: 'Transformative Reaction', description: 'Dendro + Hydro creates Bloom cores. Electro hit converts cores into homing Sprawling Shots dealing AoE Dendro DMG scaling with EM.' },
    { name: 'Swirl', elements: 'Anemo + Hydro/Pyro/Cryo/Electro', multiplier: 'Transformative AoE', description: 'Infuses and spreads the element to nearby targets, reducing elemental RES when paired with 4-Piece Viridescent Venerer.' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <BookMarked className="w-6 h-6 text-amber-400" />
            <span>TEYVAT ENCYCLOPEDIA & PATCH DIFFS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Game formulas, elemental reactions, Teyvat lore knowledgebase, and version changelogs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('mechanics')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'mechanics' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Game Mechanics
          </button>
          <button
            onClick={() => setActiveTab('lore')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'lore' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Lore Encyclopedia
          </button>
          <button
            onClick={() => setActiveTab('patches')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'patches' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Patch History
          </button>
        </div>
      </div>

      {/* Tab 1: Game Mechanics & Reactions */}
      {activeTab === 'mechanics' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-amber-300 tracking-wider">ELEMENTAL REACTION FORMULAS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {elementalReactions.map((rxn, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100">{rxn.name}</h3>
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
                    {rxn.elements}
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-400 block">{rxn.multiplier}</span>
                <p className="text-xs text-slate-400 leading-relaxed">{rxn.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Lore */}
      {activeTab === 'lore' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-amber-300 tracking-wider">CANON LORE ARCHIVES</h2>
          <div className="space-y-3">
            {LORE_DATA.map(entry => (
              <div key={entry.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100">{entry.title}</h3>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-semibold">
                    {entry.canonStatus}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-300">{entry.summary}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{entry.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Patch Diffs */}
      {activeTab === 'patches' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-amber-300 tracking-wider">VERSION HISTORY & PATCH DIFFS</h2>
          <div className="space-y-3">
            {GAME_VERSIONS_DATA.map(ver => (
              <div key={ver.version} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black font-mono text-amber-400">v{ver.version}</span>
                    <h3 className="text-xs font-bold text-slate-200">{ver.title}</h3>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{ver.releaseDate}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{ver.patchNotes}</p>

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-2 text-[10px]">
                  <span className="text-slate-400 font-semibold">Highlights:</span>
                  {ver.highlights.map((h, i) => (
                    <span key={i} className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
