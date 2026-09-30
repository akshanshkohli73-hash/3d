'use client';

import React, { useState } from 'react';
import { useAccount } from '@/services/accountStore';
import { evaluateArtifact } from '@/services/engines';
import {
  Sparkles,
  Search,
  Lock,
  Unlock,
  Upload,
  Camera,
  Check,
  AlertTriangle,
  Award,
  Filter
} from 'lucide-react';

export default function ArtifactsPage() {
  const { account, toggleArtifactLock, updateAccount } = useAccount();

  const [slotFilter, setSlotFilter] = useState('ALL');
  const [recommendationFilter, setRecommendationFilter] = useState('ALL');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const filteredArtifacts = account.artifacts.filter(art => {
    const matchesSlot = slotFilter === 'ALL' || art.slot === slotFilter;
    const evalResult = art.evaluation || evaluateArtifact(art);
    const matchesRec = recommendationFilter === 'ALL' || evalResult.recommendation === recommendationFilter;
    return matchesSlot && matchesRec;
  });

  const handleSimulateVisionScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/ai/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: 'mock_data', imageType: 'Artifact' })
      });
      const data = await res.json();
      if (data.success) {
        setScanResult(data);
      }
    } catch (e) {
      console.error('Vision scan error', e);
    } finally {
      setIsScanning(false);
    }
  };

  const handleConfirmAddArtifact = () => {
    if (!scanResult) return;
    const newArt = {
      id: 'art_' + Date.now(),
      setId: scanResult.extractedData.setId,
      slot: scanResult.extractedData.slot,
      mainStat: scanResult.extractedData.mainStat,
      mainStatValue: scanResult.extractedData.mainStatValue,
      substats: scanResult.extractedData.substats,
      level: scanResult.extractedData.level,
      rarity: 5 as const,
      locked: true,
      evaluation: scanResult.evaluation
    };

    updateAccount(prev => ({
      ...prev,
      artifacts: [newArt, ...prev.artifacts]
    }));
    setScanResult(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>ARTIFACT EVALUATOR & VISION SCANNER</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic kit-aware artifact scoring (KEEP / LOCK / EQUIP / DISCARD) & OCR drop scanner.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={slotFilter}
            onChange={e => setSlotFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Slots</option>
            <option value="flower">Flower</option>
            <option value="plume">Plume</option>
            <option value="sands">Sands</option>
            <option value="goblet">Goblet</option>
            <option value="circlet">Circlet</option>
          </select>

          <select
            value={recommendationFilter}
            onChange={e => setRecommendationFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Recommendations</option>
            <option value="LOCK">LOCK (God Tier)</option>
            <option value="KEEP">KEEP (Good)</option>
            <option value="EQUIP">EQUIP</option>
            <option value="DISCARD">DISCARD Candidate</option>
          </select>
        </div>
      </div>

      {/* Vision Scanner Dropzone */}
      <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Camera className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-300 text-sm">SCREENSHOT DROP SCANNER</h3>
          </div>
          <span className="text-[10px] text-slate-400">AI Vision OCR Parsing</span>
        </div>

        <div
          onClick={handleSimulateVisionScan}
          className="border-2 border-dashed border-amber-500/40 hover:border-amber-400 bg-slate-950/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
        >
          {isScanning ? (
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Sparkles className="w-5 h-5 animate-spin text-amber-400" />
              <span>Extracting main stats & substat rolls from screenshot...</span>
            </div>
          ) : (
            <div className="space-y-1">
              <Upload className="w-6 h-6 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-200">Click to upload or scan test artifact screenshot</p>
              <p className="text-[10px] text-slate-500">Auto-detects set, slot, main stat, substats, and level</p>
            </div>
          )}
        </div>

        {/* Scan Confirmation Modal Card */}
        {scanResult && (
          <div className="p-4 bg-slate-950 border border-amber-500/50 rounded-2xl space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> OCR EXTRACTED SUCCESSFUL (Confidence: 96%)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                RECOMMENDATION: {scanResult.evaluation.recommendation} (Score: {scanResult.evaluation.score}/100)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Set</span>
                <span className="font-bold text-slate-200">{scanResult.extractedData.setName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Slot</span>
                <span className="font-bold text-slate-200 uppercase">{scanResult.extractedData.slot}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Main Stat</span>
                <span className="font-bold text-amber-300">{scanResult.extractedData.mainStat} ({scanResult.extractedData.mainStatValue})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Substats</span>
                <span className="text-[11px] text-slate-300">
                  {scanResult.extractedData.substats.map((s: any) => `${s.name} ${s.value}`).join(', ')}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setScanResult(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAddArtifact}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl"
              >
                Save to Inventory
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Artifact Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArtifacts.map(art => {
          const evalResult = art.evaluation || evaluateArtifact(art);

          return (
            <div
              key={art.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {art.slot} +{art.level}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      evalResult.recommendation === 'LOCK' ? 'bg-amber-500 text-slate-950' :
                      evalResult.recommendation === 'KEEP' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      evalResult.recommendation === 'EQUIP' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {evalResult.recommendation} ({evalResult.score})
                    </span>
                    <button
                      onClick={() => toggleArtifactLock(art.id)}
                      className="p-1 text-slate-400 hover:text-amber-400"
                    >
                      {art.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-100 capitalize">
                  {art.setId.replaceAll('_', ' ')}
                </h3>

                <div className="bg-slate-950 p-2.5 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between items-center text-amber-300 font-bold">
                    <span>{art.mainStat}</span>
                    <span className="font-mono">{art.mainStatValue}</span>
                  </div>
                  <div className="pt-1 border-t border-slate-800/80 space-y-0.5 text-[11px] text-slate-400">
                    {art.substats.map((sub, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{sub.name}</span>
                        <span className="font-mono text-slate-300">+{sub.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-300 block mb-0.5">Evaluation Reasoning:</span>
                {evalResult.reasoning}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
