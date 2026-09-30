'use client';

import React, { useState } from 'react';
import { MAP_MARKERS_DATA } from '@/data';
import {
  MapPin,
  Search,
  Layers,
  Sparkles,
  Navigation,
  CheckCircle2,
  Filter,
  Route
} from 'lucide-react';

export default function InteractiveMapPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [aiSpatialQuery, setAiSpatialQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<any>(MAP_MARKERS_DATA[0]);
  const [routeActive, setRouteActive] = useState(false);

  const filteredMarkers = MAP_MARKERS_DATA.filter(m => {
    const matchesCat = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesReg = selectedRegion === 'ALL' || m.region === selectedRegion;
    const matchesQuery = !aiSpatialQuery ||
                         m.title.toLowerCase().includes(aiSpatialQuery.toLowerCase()) ||
                         (m.relatedMaterialId && m.relatedMaterialId.includes(aiSpatialQuery.toLowerCase()));
    return matchesCat && matchesReg && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-amber-400" />
            <span>INTERACTIVE TEYVAT MAP & AI SPATIAL SEARCH</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore Teyvat markers, materials, local specialties, and generate AI optimized farming routes.
          </p>
        </div>

        {/* AI Spatial Search Input */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl max-w-md w-full">
          <Sparkles className="w-4 h-4 text-amber-400 ml-2" />
          <input
            type="text"
            value={aiSpatialQuery}
            onChange={e => setAiSpatialQuery(e.target.value)}
            placeholder='AI Spatial: "Where can I find Silk Flowers?"'
            className="bg-transparent text-xs text-slate-100 focus:outline-none flex-1"
          />
          <button
            onClick={() => setRouteActive(true)}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1"
          >
            <Route className="w-3.5 h-3.5" /> Route
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Layer Filters Sidebar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 lg:col-span-1">
          <span className="text-xs font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> MAP LAYERS
          </span>

          <div className="space-y-2 text-xs">
            {['ALL', 'LocalSpecialty', 'Boss', 'Domain', 'Statue', 'Teleport'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'All Markers' : cat}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-300 block mb-2">Region Filter</span>
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
            >
              <option value="ALL">All Regions</option>
              <option value="Liyue">Liyue</option>
              <option value="Mondstadt">Mondstadt</option>
              <option value="Inazuma">Inazuma</option>
              <option value="Fontaine">Fontaine</option>
            </select>
          </div>
        </div>

        {/* Interactive Map Visualizer Canvas */}
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-3xl p-6 relative min-h-[500px] flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Top Bar Stats */}
          <div className="flex items-center justify-between bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 z-10">
            <span className="text-xs font-bold text-slate-200">
              Showing {filteredMarkers.length} Markers
            </span>
            {routeActive && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Optimized Route Active (3 Stops)
              </span>
            )}
          </div>

          {/* Canvas Simulation Overlay with Markers */}
          <div className="relative w-full h-[380px] bg-[#111628] rounded-2xl border border-slate-800/80 overflow-hidden my-4 flex items-center justify-center">
            {/* Background Texture grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Simulated Map Markers */}
            {filteredMarkers.map((marker, idx) => {
              const isSelected = selectedMarker?.id === marker.id;
              const posX = marker.location[0];
              const posY = marker.location[1];

              return (
                <div
                  key={marker.id}
                  onClick={() => setSelectedMarker(marker)}
                  style={{ left: `${posX}%`, top: `${posY}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  <div className={`p-2 rounded-xl flex items-center justify-center font-bold text-[10px] shadow-lg ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-500/30'
                      : 'bg-slate-900 text-amber-300 border border-amber-500/40'
                  }`}>
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Marker Inspector Bottom Card */}
          {selectedMarker && (
            <div className="bg-slate-900/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between z-10">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-amber-300 uppercase">
                  {selectedMarker.category} • {selectedMarker.region}
                </span>
                <h3 className="text-sm font-bold text-slate-100">{selectedMarker.title}</h3>
                <p className="text-xs text-slate-400">{selectedMarker.description}</p>
              </div>

              <button
                onClick={() => setRouteActive(!routeActive)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Add to Route</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
