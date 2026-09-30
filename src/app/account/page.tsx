'use client';

import React, { useState } from 'react';
import {
  User,
  Shield,
  Upload,
  Download,
  Copy,
  Check,
  RefreshCw,
  Clock,
  History,
  FileText,
  Camera,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useAccount } from '@/services/accountStore';

export default function AccountPage() {
  const { account, importSnapshotJSON, exportSnapshotJSON, updateAccount } = useAccount();

  const [activeTab, setActiveTab] = useState<'profile' | 'importers' | 'snapshots' | 'timeline'>('profile');
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // UID Import Simulator
  const [uidInput, setUidInput] = useState(account.uid);
  const [serverSelect, setServerSelect] = useState(account.server);

  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportSnapshotJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJsonImport = () => {
    if (!jsonInput.trim()) return;
    const success = importSnapshotJSON(jsonInput);
    if (success) {
      setImportStatus('Successfully imported account snapshot!');
      setJsonInput('');
    } else {
      setImportStatus('Failed to parse valid TEYVAT AI account JSON.');
    }
  };

  const handleUidSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      updateAccount(prev => ({
        ...prev,
        uid: uidInput,
        server: serverSelect
      }));
      setIsSyncing(false);
      setImportStatus(`Profile synced with public showcase for UID ${uidInput}!`);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <User className="w-6 h-6 text-amber-400" />
            <span>ACCOUNT INTELLIGENCE & SYNC</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage profile, import data via UID or screenshots, backup snapshots, and privacy settings.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'profile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Profile & Sync
          </button>
          <button
            onClick={() => setActiveTab('importers')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'importers' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Importers
          </button>
          <button
            onClick={() => setActiveTab('snapshots')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'snapshots' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Snapshots & Backup
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'timeline' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* Tab 1: Profile & Sync */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 tracking-wider">GAME PROFILE</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  Synced
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-300 border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">UID</span>
                  <span className="font-mono font-bold text-slate-100">{account.uid}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300 border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Server</span>
                  <span className="font-semibold text-slate-100">{account.server}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300 border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Adventure Rank</span>
                  <span className="font-mono font-bold text-amber-300">{account.adventureRank}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300 border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">World Level</span>
                  <span className="font-mono font-bold text-slate-100">{account.worldLevel}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span className="text-slate-400">Privacy Mode</span>
                  <span className="flex items-center gap-1.5 text-slate-200">
                    {account.preferences.publicProfile ? <Globe className="w-3.5 h-3.5 text-blue-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{account.preferences.publicProfile ? 'Public' : 'Private'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Sync Settings */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <span className="text-xs font-bold text-amber-300 tracking-wider">UID SHOWCASE SYNC</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect your in-game UID to auto-sync public character showcase data without providing passwords.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-400 font-medium">In-Game UID</label>
                  <input
                    type="text"
                    value={uidInput}
                    onChange={e => setUidInput(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-medium">Server</label>
                  <select
                    value={serverSelect}
                    onChange={e => setServerSelect(e.target.value as any)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="NA">America (NA)</option>
                    <option value="EU">Europe (EU)</option>
                    <option value="ASIA">Asia</option>
                    <option value="SAR">TW/HK/MO</option>
                  </select>
                </div>

                <button
                  onClick={handleUidSync}
                  disabled={isSyncing}
                  className="w-full mt-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  <span>{isSyncing ? 'Syncing Enka/Showcase...' : 'Sync Public Profile'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Importers */}
      {activeTab === 'importers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Screenshot Drop Importer */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-sm">SCREENSHOT VISION IMPORTER</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drop in-game character or artifact screenshots to automatically extract level, stats, and sub-stats via AI Vision.
              </p>

              <div className="border-2 border-dashed border-slate-700/80 hover:border-amber-500/50 bg-slate-950/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-colors">
                <Upload className="w-8 h-8 text-amber-400/80" />
                <div>
                  <p className="text-xs font-bold text-slate-200">Click to upload or drag screenshot</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Supports PNG, JPG, WEBP (Artifact, Character, Inventory screens)</p>
                </div>
              </div>
            </div>

            {/* JSON Importer */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-sm">JSON DATA IMPORTER</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste raw TEYVAT AI export JSON to restore character, wish, or inventory states.
              </p>

              <textarea
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                placeholder="Paste account JSON backup here..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500/50"
              />

              <button
                onClick={handleJsonImport}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
              >
                Import Account State
              </button>
            </div>
          </div>

          {importStatus && (
            <div className="p-3 bg-slate-900 border border-amber-500/40 text-amber-300 text-xs rounded-xl flex items-center justify-between">
              <span>{importStatus}</span>
              <button onClick={() => setImportStatus(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Snapshots & Backup */}
      {activeTab === 'snapshots' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-100 text-sm">ACCOUNT BACKUP & EXPORT</h3>
              <p className="text-xs text-slate-400 mt-0.5">Export a complete snapshot of your account data.</p>
            </div>
            <button
              onClick={handleCopyExport}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy JSON Snapshot'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-[11px] font-mono text-slate-300 max-h-64 overflow-y-auto">
            {exportSnapshotJSON()}
          </pre>
        </div>
      )}

      {/* Tab 4: Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <span>ACCOUNT RECENT ACTIVITY TIMELINE</span>
          </h3>

          <div className="space-y-4 border-l-2 border-slate-800 pl-4 ml-2">
            <div className="relative space-y-1">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-[10px] text-slate-500 font-mono">2026-02-15 10:30</span>
              <p className="text-xs font-bold text-slate-200">Acquired Hu Tao (Character Event Wish)</p>
              <p className="text-[11px] text-slate-400">Pity count: 76 pulls (50/50 Won)</p>
            </div>

            <div className="relative space-y-1">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] text-slate-500 font-mono">2026-02-14 18:20</span>
              <p className="text-xs font-bold text-slate-200">Created Active Goal: Build Hu Tao</p>
              <p className="text-[11px] text-slate-400">Target level: 90/90, 10/10/10 Talents</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
