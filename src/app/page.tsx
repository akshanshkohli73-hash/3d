'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Target,
  Users,
  Shield,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Bot,
  Wheat,
  Plus
} from 'lucide-react';
import { useAccount } from '@/services/accountStore';
import { generateDailyPlan } from '@/services/engines';

export default function HomeDashboard() {
  const { account, updateResin } = useAccount();

  const [isAskingAi, setIsAskingAi] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<any>(null);
  const [showWhyModal, setShowWhyModal] = useState(false);

  const activeGoal = account.goals[0] || {
    title: 'Build Hu Tao',
    progressPercent: 78,
    priority: 'High'
  };

  const handleWhatShouldIDo = async () => {
    setIsAskingAi(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'What should I do today?', account })
      });
      const data = await res.json();
      if (data.success) {
        setAiRecommendation(data);
      } else {
        setAiRecommendation({ text: 'Unable to retrieve AI recommendation.' });
      }
    } catch (e) {
      setAiRecommendation({ text: 'Error connecting to TEYVAT AI server.' });
    } finally {
      setIsAskingAi(false);
    }
  };

  const dailyPlan = generateDailyPlan(account);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-[#121626] border border-amber-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TEYVAT AI COMMAND CENTER</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Your Genshin account, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">understood.</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl">
              UID {account.uid} ({account.server}) • AR {account.adventureRank} • World Level {account.worldLevel}
            </p>
          </div>

          {/* Core Signature Feature: "WHAT SHOULD I DO?" Button */}
          <button
            onClick={handleWhatShouldIDo}
            disabled={isAskingAi}
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm md:text-base px-6 py-4 rounded-2xl shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {isAskingAi ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>ANALYZING ACCOUNT...</span>
              </>
            ) : (
              <>
                <Bot className="w-6 h-6 fill-slate-950" />
                <span>WHAT SHOULD I DO?</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Account Overview Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Adventure Rank</span>
          <span className="text-xl font-bold font-mono text-slate-100">{account.adventureRank}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Resin Counter</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono text-cyan-300">{account.resin.current}</span>
            <span className="text-xs text-slate-500 font-mono">/200</span>
          </div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Primogems</span>
          <span className="text-xl font-bold font-mono text-amber-300">{account.primogems.toLocaleString()}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Intertwined Fates</span>
          <span className="text-xl font-bold font-mono text-purple-300">{account.intertwinedFates}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Total Characters</span>
          <span className="text-xl font-bold font-mono text-slate-100">{account.characters.length}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-[11px] font-medium text-slate-400">Built Characters</span>
          <span className="text-xl font-bold font-mono text-emerald-400">
            {account.characters.filter(c => c.isBuilt).length}
          </span>
        </div>
      </div>

      {/* AI Recommendation Result Panel (if generated) */}
      {aiRecommendation && (
        <div className="bg-gradient-to-b from-[#141829] to-[#0f1220] border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-amber-300 text-sm tracking-wide">AI RECOMMENDATION FOR TODAY</h3>
                <p className="text-[11px] text-slate-400">Synthesized from inventory, active goal & domain rotations</p>
              </div>
            </div>
            <button
              onClick={() => setShowWhyModal(true)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>WHY?</span>
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
            {aiRecommendation.text}
          </div>

          {aiRecommendation.structured && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Data Used</span>
                <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                  {aiRecommendation.structured.dataUsed?.map((d: string, i: number) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Next Steps</span>
                <ul className="text-xs text-amber-300 space-y-0.5 list-disc list-inside">
                  {aiRecommendation.structured.nextSteps?.map((n: string, i: number) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Grid: AI Daily Plan & Active Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's AI Daily Plan */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <h2 className="font-bold text-slate-100 text-sm tracking-wide">AI DAILY PLAN</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Resin Needed: {dailyPlan.totalResinNeeded}</span>
          </div>

          <div className="space-y-3">
            {dailyPlan.actions.map(action => (
              <div
                key={action.priority}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex items-start gap-4 transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold flex items-center justify-center shrink-0">
                  {action.priority}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs md:text-sm font-bold text-slate-100">{action.title}</h3>
                    {action.resinCost > 0 && (
                      <span className="text-[10px] bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 px-2 py-0.5 rounded-full font-mono">
                        {action.resinCost} Resin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{action.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why Explanation Box */}
          <div className="bg-[#121524] border border-amber-500/20 rounded-2xl p-4 space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> REASONING
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{dailyPlan.why}</p>
          </div>
        </div>

        {/* Right Col: Active Goal & Quick Action Shortcuts */}
        <div className="space-y-6">
          {/* Active Goal Widget */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" /> CURRENT GOAL
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                {activeGoal.priority} Priority
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-100">{activeGoal.title}</h3>
              <p className="text-xs text-slate-400 mt-1">Target: Level 90 / Crown Talents</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span>Progress</span>
                <span className="font-mono">{activeGoal.progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeGoal.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Blocked By</span>
              <ul className="space-y-1">
                <li className="text-xs text-rose-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>18 Silk Flowers</span>
                </li>
                <li className="text-xs text-rose-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>8 Juvenile Jades</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold text-slate-300 tracking-wider">QUICK ACTIONS</span>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/characters"
                className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-200 flex flex-col items-center gap-2 transition-colors text-center"
              >
                <Users className="w-5 h-5 text-amber-400" />
                <span>Build Doctor</span>
              </Link>
              <Link
                href="/map"
                className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-200 flex flex-col items-center gap-2 transition-colors text-center"
              >
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Find Materials</span>
              </Link>
              <Link
                href="/teams"
                className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-200 flex flex-col items-center gap-2 transition-colors text-center"
              >
                <Shield className="w-5 h-5 text-purple-400" />
                <span>Team Builder</span>
              </Link>
              <Link
                href="/farming"
                className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-200 flex flex-col items-center gap-2 transition-colors text-center"
              >
                <Wheat className="w-5 h-5 text-cyan-400" />
                <span>Resin Planner</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WHY Modal Explanation */}
      {showWhyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121626] border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-amber-300">WHY THIS RECOMMENDATION?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              TEYVAT AI analyzed your exact account state without making universal assumptions. It cross-referenced:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Active goal: <strong>Build Hu Tao</strong></li>
              <li>Current Resin: <strong>120 / 200</strong></li>
              <li>Today&apos;s Domain Rotation: <strong>Taishan Mansion (Diligence Books)</strong></li>
              <li>Inventory missing: <strong>18 Silk Flowers, 8 Juvenile Jades, 72 Diligence Books</strong></li>
            </ul>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowWhyModal(false)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
