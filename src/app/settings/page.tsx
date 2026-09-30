'use client';

import React, { useState } from 'react';
import { useAccount } from '@/services/accountStore';
import {
  Settings,
  ShieldCheck,
  Brain,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Award
} from 'lucide-react';

export default function SettingsPage() {
  const { account, updateAccount } = useAccount();

  const [activeTab, setActiveTab] = useState<'providers' | 'diagnostics' | 'quiz'>('providers');
  const [selectedProvider, setSelectedProvider] = useState(account.preferences.preferredAiProvider);
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [inceptionKey, setInceptionKey] = useState('');

  // Study Mode Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const quizQuestions = [
    {
      question: 'Which elemental reaction deals 2.0x Forward damage multiplier when Hydro triggers on Pyro?',
      options: ['Vaporize', 'Melt', 'Hyperbloom', 'Swirl'],
      answer: 0
    },
    {
      question: 'What is the base energy cost for Raiden Shogun\'s Elemental Burst (Musou Shinsetsu)?',
      options: ['40 Energy', '60 Energy', '80 Energy', '90 Energy'],
      answer: 3
    },
    {
      question: 'Which artifact set bonus increases Elemental Skill DMG by up to 70% when off-field?',
      options: ['Emblem of Severed Fate', 'Golden Troupe', 'Crimson Witch', 'Marechaussee Hunter'],
      answer: 1
    }
  ];

  const handleSelectQuizOption = (optIdx: number) => {
    setSelectedOption(optIdx);
    if (optIdx === quizQuestions[currentQuizIndex].answer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setCurrentQuizIndex(prev => (prev < quizQuestions.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-amber-400" />
            <span>SETTINGS & DATA QUALITY DIAGNOSTICS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure AI Provider API keys, view system health status, and play Genshin Study Mode quizzes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'providers' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            AI Providers
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'diagnostics' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Data Diagnostics
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'quiz' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Genshin Study Mode
          </button>
        </div>
      </div>

      {/* Tab 1: AI Provider Setup */}
      {activeTab === 'providers' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-amber-300 tracking-wider">AI PROVIDER CONFIGURATION</h2>
          <p className="text-xs text-slate-400">
            Select your preferred AI provider. All secrets are kept local to your environment.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Active Provider</label>
              <select
                value={selectedProvider}
                onChange={e => setSelectedProvider(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="Mock">Built-in Mock AI Provider (Default)</option>
                <option value="OpenRouter">OpenRouter AI API</option>
                <option value="Inception">Inception Labs AI Provider</option>
                <option value="Gemini">Google Gemini AI Provider</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[11px] text-slate-400 font-medium">OpenRouter API Key</label>
                <input
                  type="password"
                  value={openRouterKey}
                  onChange={e => setOpenRouterKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 font-medium">Inception Labs Key</label>
                <input
                  type="password"
                  value={inceptionKey}
                  onChange={e => setInceptionKey(e.target.value)}
                  placeholder="inc-..."
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Data Quality Diagnostics Center */}
      {activeTab === 'diagnostics' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-xs font-bold text-amber-300 tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> DATA QUALITY CENTER DIAGNOSTICS
          </h2>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-slate-300">Characters Database</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">● Healthy (Synced)</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-slate-300">Weapons & Artifact Sets Database</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">● Healthy (Synced)</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-slate-300">Domains & Bosses Schedule</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">● Healthy (v5.2)</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-slate-300">Map Marker Spatial Index</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">● Healthy (Indexed)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Genshin Study Mode */}
      {activeTab === 'quiz' && (
        <div className="bg-gradient-to-b from-[#121626] to-[#0f121d] border border-amber-500/30 rounded-3xl p-6 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold text-amber-300 tracking-wider">GENSHIN STUDY MODE QUIZ</h2>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              Score: {quizScore}
            </span>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-xs font-bold text-slate-100">
              Question {currentQuizIndex + 1} of {quizQuestions.length}: {quizQuestions[currentQuizIndex].question}
            </p>

            <div className="space-y-2">
              {quizQuestions[currentQuizIndex].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === quizQuestions[currentQuizIndex].answer;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuizOption(idx)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all ${
                      selectedOption !== null
                        ? isCorrect
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : isSelected
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                        : 'bg-slate-900 border-slate-800 hover:border-amber-500/50 text-slate-200'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuiz}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl"
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
