'use client';

import React, { useState } from 'react';
import { useAccount } from '@/services/accountStore';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Brain,
  Trash2,
  Plus,
  HelpCircle,
  Settings2,
  Zap,
  Code
} from 'lucide-react';

export default function AiAssistantPage() {
  const { account, addMemory, deleteMemory } = useAccount();

  const [activeTab, setActiveTab] = useState<'chat' | 'memory'>('chat');
  const [selectedMode, setSelectedMode] = useState<string>('ACCOUNT');
  const [explanationLevel, setExplanationLevel] = useState<string>('Normal');

  // Messages State
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; structured?: any }>>([
    {
      sender: 'assistant',
      text: 'Greetings Traveler! I am TEYVAT AI, your account intelligence assistant. Ask me anything about your current goals, farming recommendations, or build optimizations!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Memory Editor Form State
  const [memoryKey, setMemoryKey] = useState('');
  const [memoryVal, setMemoryVal] = useState('');

  const handleSend = async (promptText?: string) => {
    const text = promptText || input;
    if (!text.trim() || isLoading) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, account, mode: selectedMode })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'assistant', text: data.text, structured: data.structured }]);
      } else {
        setMessages(prev => [...prev, { sender: 'assistant', text: 'Error connecting to TEYVAT AI backend.' }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'assistant', text: 'Network connection failure.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryKey.trim() || !memoryVal.trim()) return;
    addMemory(memoryKey, memoryVal);
    setMemoryKey('');
    setMemoryVal('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Bot className="w-6 h-6 text-amber-400" />
            <span>GENERAL TEYVAT AI ASSISTANT (&quot;ASK MY ACCOUNT&quot;)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deeply integrated Genshin intelligence assistant powered by structured tool execution & account memory.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'chat' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Chat & Assistant
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'memory' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            AI Memory Manager ({account.aiMemories.length})
          </button>
        </div>
      </div>

      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Mode & Explanation Controls Panel */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 lg:col-span-1">
            <span className="text-xs font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
              <Settings2 className="w-4 h-4" /> ASSISTANT MODES
            </span>

            <div className="space-y-1.5 text-xs">
              {['ACCOUNT', 'BUILDS', 'TEAMS', 'FARMING', 'MAP', 'WISHES', 'DAMAGE', 'GENERAL'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                    selectedMode === mode ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {mode} Mode
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 block mb-2">Explanation Style</span>
              <select
                value={explanationLevel}
                onChange={e => setExplanationLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="Quick">Quick Summary</option>
                <option value="Normal">Normal Balanced</option>
                <option value="Deep">Deep Theorycraft</option>
                <option value="Teacher">Teacher (Beginner)</option>
                <option value="Technical">Technical (Formulas)</option>
              </select>
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col h-[600px] justify-between shadow-2xl">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none whitespace-pre-wrap'
                  }`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-amber-400 bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-sm">
                  <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Executing structured tool calls & AI reasoning...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="py-2 flex gap-2 overflow-x-auto text-xs no-scrollbar">
              <button
                onClick={() => handleSend('What should I do today?')}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300"
              >
                🎯 What should I do today?
              </button>
              <button
                onClick={() => handleSend('Why is my Hu Tao weak?')}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300"
              >
                🔥 Why is Hu Tao weak?
              </button>
              <button
                onClick={() => handleSend('Calculate my Hu Tao damage')}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300"
              >
                ⚡ Damage Calculation
              </button>
            </div>

            {/* Input Bar */}
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask TEYVAT AI anything about your account or game mechanics..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500/50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading}
                className="p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Memory Manager */}
      {activeTab === 'memory' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span>PERSISTED AI MEMORIES</span>
            </h2>
            <p className="text-xs text-slate-400">
              The AI remembers these preferences across sessions. You can edit, add, or delete any stored assumption.
            </p>

            <form onSubmit={handleAddMemory} className="flex gap-2 text-xs">
              <input
                type="text"
                value={memoryKey}
                onChange={e => setMemoryKey(e.target.value)}
                placeholder="Preference Key (e.g. favorite_element)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 flex-1"
              />
              <input
                type="text"
                value={memoryVal}
                onChange={e => setMemoryVal(e.target.value)}
                placeholder="Preference Value (e.g. Pyro)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {account.aiMemories.map(mem => (
                <div key={mem.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-amber-300 font-mono">{mem.key}</span>
                    <span className="text-slate-400 mx-2">:</span>
                    <span className="text-slate-200">{mem.value}</span>
                  </div>
                  <button
                    onClick={() => deleteMemory(mem.id)}
                    className="p-1 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
