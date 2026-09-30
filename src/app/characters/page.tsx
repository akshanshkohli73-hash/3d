'use client';

import React, { useState } from 'react';
import { CHARACTERS_DATA } from '@/data/characters';
import { CharacterAssetResolver } from '@/services/characterAssets';
import { useAccount } from '@/services/accountStore';
import {
  Users,
  Search,
  Sparkles,
  Shield,
  Zap,
  Swords,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';

export default function CharactersPage() {
  const { account } = useAccount();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<string>('ALL');
  const [selectedCharId, setSelectedCharId] = useState<string>('hu_tao');

  const filteredCharacters = CHARACTERS_DATA.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          char.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesElement = selectedElement === 'ALL' || char.element === selectedElement;
    return matchesSearch && matchesElement;
  });

  const selectedChar = CHARACTERS_DATA.find(c => c.id === selectedCharId) || CHARACTERS_DATA[0];
  const userChar = account.characters.find(c => c.characterId === selectedCharId);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-amber-400" />
            <span>CHARACTER ENCYCLOPEDIA & BUILD DOCTOR</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse base stats, talents, ascension costs, and run AI Build Doctor evaluations.
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
              placeholder="Search characters..."
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <select
            value={selectedElement}
            onChange={e => setSelectedElement(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Elements</option>
            <option value="Pyro">Pyro</option>
            <option value="Hydro">Hydro</option>
            <option value="Anemo">Anemo</option>
            <option value="Electro">Electro</option>
            <option value="Dendro">Dendro</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Roster List & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roster Cards List */}
        <div className="space-y-3 lg:col-span-1 max-h-[700px] overflow-y-auto pr-1">
          {filteredCharacters.map(char => {
            const isSelected = char.id === selectedCharId;
            const isOwned = account.characters.some(c => c.characterId === char.id);

            return (
              <div
                key={char.id}
                onClick={() => setSelectedCharId(char.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border-amber-500/50 shadow-lg'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                    <img
                      src={CharacterAssetResolver.getAssets(char.id).icon}
                      alt={char.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback on image load error
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute bottom-0 right-0 bg-slate-950/80 px-1 py-0.5 text-[9px] font-bold text-amber-400 border-tl rounded-tl">
                      {char.rarity}★
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-slate-100">{char.name}</h3>
                      {isOwned && (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                          Owned
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">{char.weaponType} • {char.region}</p>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
              </div>
            );
          })}
        </div>

        {/* Character Detail View & BUILD DOCTOR */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Header */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
                  <span>{selectedChar.rarity}★ {selectedChar.element} {selectedChar.weaponType}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-100 mt-1">{selectedChar.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{selectedChar.description}</p>
              </div>

              {/* Account Level Badge */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">YOUR ROSTER LEVEL</span>
                <span className="text-lg font-bold font-mono text-amber-300">
                  {userChar ? `Lvl ${userChar.level}/90` : 'Not Owned'}
                </span>
              </div>
            </div>

            {/* Base Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Base HP</span>
                <span className="text-xs font-bold font-mono text-slate-200">{selectedChar.baseStats.hp}</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Base ATK</span>
                <span className="text-xs font-bold font-mono text-slate-200">{selectedChar.baseStats.atk}</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Base DEF</span>
                <span className="text-xs font-bold font-mono text-slate-200">{selectedChar.baseStats.def}</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">{selectedChar.baseStats.specialStat}</span>
                <span className="text-xs font-bold font-mono text-amber-300">
                  {selectedChar.baseStats.specialStatValue}
                </span>
              </div>
            </div>
          </div>

          {/* BUILD DOCTOR Report Card */}
          <div className="bg-gradient-to-b from-[#121626] to-[#0f121d] border border-amber-500/30 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-amber-300 text-sm tracking-wider">BUILD DOCTOR DIAGNOSIS</h3>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">
                Account Kit Match
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-rose-950/30 border border-rose-500/30 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-300">BIGGEST ISSUE</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Energy Recharge is too low for consistent Elemental Burst uptime in rotations.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-2xl flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-300">SECONDARY ISSUE</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Artifact set mismatch: Currently missing 4-Piece Crimson Witch set bonus.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-300">NEXT FARMING TARGET</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Farm Taishan Mansion Domain for Diligence books to get Normal Attack talent from Level 8 to 10.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
