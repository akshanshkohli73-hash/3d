'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  User,
  Users,
  Shield,
  Sparkles,
  Swords,
  Wheat,
  MapPin,
  Flame,
  BookOpen,
  Trophy,
  BookMarked,
  Calculator,
  Bot,
  Settings,
  Search,
  Command,
  X,
  Plus,
  Send,
  Zap,
  ChevronRight,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { useAccount } from '@/services/accountStore';

const NAV_ITEMS = [
  { href: '/', label: 'HOME', icon: Home },
  { href: '/account', label: 'ACCOUNT', icon: User },
  { href: '/characters', label: 'CHARACTERS', icon: Users },
  { href: '/weapons', label: 'WEAPONS', icon: Shield },
  { href: '/artifacts', label: 'ARTIFACTS', icon: Sparkles },
  { href: '/teams', label: 'TEAMS', icon: Swords },
  { href: '/farming', label: 'FARMING', icon: Wheat },
  { href: '/map', label: 'MAP', icon: MapPin },
  { href: '/wishes', label: 'WISHES', icon: Flame },
  { href: '/quests', label: 'QUESTS', icon: BookOpen },
  { href: '/achievements', label: 'ACHIEVEMENTS', icon: Trophy },
  { href: '/encyclopedia', label: 'ENCYCLOPEDIA', icon: BookMarked },
  { href: '/damage-lab', label: 'DAMAGE LAB', icon: Calculator },
  { href: '/ai-assistant', label: 'AI ASSISTANT', icon: Bot },
  { href: '/settings', label: 'SETTINGS', icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { account, updateResin } = useAccount();

  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [isAiDockOpen, setIsAiDockOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Chat dock state
  const [dockMessages, setDockMessages] = useState<Array<{ sender: string; text: string }>>([
    { sender: 'assistant', text: 'Hello Traveler! I am TEYVAT AI. How can I assist your account today?' }
  ]);
  const [dockInput, setDockInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDockSend = async (textToSend?: string) => {
    const text = textToSend || dockInput;
    if (!text.trim() || isAiLoading) return;

    setDockMessages(prev => [...prev, { sender: 'user', text }]);
    setDockInput('');
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, account })
      });
      const data = await res.json();
      if (data.success) {
        setDockMessages(prev => [...prev, { sender: 'assistant', text: data.text }]);
      } else {
        setDockMessages(prev => [...prev, { sender: 'assistant', text: 'Sorry, I ran into an issue connecting to TEYVAT AI services.' }]);
      }
    } catch (e) {
      setDockMessages(prev => [...prev, { sender: 'assistant', text: 'Error connecting to server.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredNav = NAV_ITEMS.filter(item =>
    item.label.toLowerCase().includes(commandQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d0f17] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation Header */}
      <header className="h-16 border-b border-slate-800/80 bg-[#121522]/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                TEYVAT AI
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded border border-amber-500/30 text-amber-400/90 bg-amber-500/10">
                v5.2
              </span>
            </div>
          </Link>
        </div>

        {/* Account Quick Stats Header Controls */}
        <div className="flex items-center gap-3">
          {/* Universal Command Bar trigger */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg px-3 py-1.5 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search or command...</span>
            <kbd className="bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.5 text-[10px] rounded flex items-center gap-0.5 ml-2">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* Resin Widget */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-cyan-500/30 px-2.5 py-1 rounded-lg text-xs">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span className="font-mono text-cyan-200 font-medium">{account.resin.current}</span>
            <span className="text-slate-500">/{account.resin.max}</span>
            <button
              onClick={() => updateResin(account.resin.current + 20)}
              title="Add 20 Resin"
              className="ml-1 text-[10px] text-cyan-400 hover:text-cyan-200 px-1 bg-cyan-950/50 hover:bg-cyan-900/60 rounded border border-cyan-800/50"
            >
              +20
            </button>
          </div>

          {/* Primogems Widget */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 border border-amber-500/30 px-2.5 py-1 rounded-lg text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-amber-200 font-medium">{account.primogems.toLocaleString()}</span>
          </div>

          {/* AI Assistant Toggle Button */}
          <button
            onClick={() => setIsAiDockOpen(!isAiDockOpen)}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
              isAiDockOpen
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="hidden md:inline">ASK TEYVAT AI</span>
          </button>
        </div>
      </header>

      {/* Main App Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-60 border-r border-slate-800/80 bg-[#101320] p-3 space-y-1 select-none overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-500 tracking-wider">
            NAVIGATION
          </div>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 border border-amber-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-6 px-3">
            <div className="bg-gradient-to-b from-slate-900 to-[#141829] border border-amber-500/20 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
                <span>ACTIVE GOAL</span>
                <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-400">High</span>
              </div>
              <p className="text-xs font-bold text-slate-200">{account.goals[0]?.title || 'Build Hu Tao'}</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${account.goals[0]?.progressPercent || 78}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 flex justify-between">
                <span>Progress</span>
                <span className="font-mono">{account.goals[0]?.progressPercent || 78}%</span>
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden flex">
            <div className="w-64 bg-[#101320] h-full p-4 space-y-2 border-r border-slate-800 flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-amber-400 text-sm">TEYVAT AI MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium ${
                      isActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Central View Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6 max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* Universal Docked AI Assistant Panel */}
        {isAiDockOpen && (
          <aside className="w-full md:w-96 border-l border-slate-800 bg-[#0e111d] flex flex-col h-[calc(100vh-4rem)] fixed md:relative right-0 bottom-0 top-16 z-30 shadow-2xl">
            <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between bg-[#131626]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-wider text-amber-300">TEYVAT AI ASSISTANT</span>
              </div>
              <button
                onClick={() => setIsAiDockOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {dockMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex items-center gap-2 text-xs text-amber-400/80 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <Bot className="w-4 h-4 animate-spin" />
                  <span>Consulting account data & game formulas...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 border-t border-slate-800/50 flex gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
              <button
                onClick={() => handleDockSend('What should I do today?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
              >
                🎯 What should I do today?
              </button>
              <button
                onClick={() => handleDockSend('Why is my Hu Tao weak?')}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
              >
                🔥 Why is Hu Tao weak?
              </button>
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 border-t border-slate-800/80 bg-[#131626] flex items-center gap-2">
              <input
                type="text"
                value={dockInput}
                onChange={e => setDockInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleDockSend()}
                placeholder="Ask about your account..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
              />
              <button
                onClick={() => handleDockSend()}
                disabled={isAiLoading}
                className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Universal Command Bar Palette (Cmd+K) */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-xl bg-[#121626] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-3.5 border-b border-slate-800 flex items-center gap-3 bg-slate-900/50">
              <Search className="w-4 h-4 text-amber-400" />
              <input
                type="text"
                autoFocus
                value={commandQuery}
                onChange={e => setCommandQuery(e.target.value)}
                placeholder="Type a command or section..."
                className="flex-1 bg-transparent text-sm text-slate-100 focus:outline-none"
              />
              <button
                onClick={() => setIsCommandOpen(false)}
                className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded"
              >
                ESC
              </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto space-y-1">
              {filteredNav.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setIsCommandOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-slate-300 hover:bg-amber-500/10 hover:text-amber-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#121522]/95 border-t border-slate-800/80 backdrop-blur-md flex items-center justify-around z-40 px-2">
        {NAV_ITEMS.slice(0, 5).map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
