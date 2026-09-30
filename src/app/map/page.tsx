'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MAP_MARKERS_DATA } from '@/data';
import {
  MapPin,
  Search,
  Layers,
  Sparkles,
  Navigation,
  CheckCircle2,
  Filter,
  Route,
  Compass
} from 'lucide-react';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then(mod => mod.Polyline),
  { ssr: false }
);

export default function InteractiveMapPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [aiSpatialQuery, setAiSpatialQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<any>(MAP_MARKERS_DATA[0]);
  const [routeActive, setRouteActive] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredMarkers = MAP_MARKERS_DATA.filter(m => {
    const matchesCat = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesReg = selectedRegion === 'ALL' || m.region === selectedRegion;
    const matchesQuery = !aiSpatialQuery ||
                         m.title.toLowerCase().includes(aiSpatialQuery.toLowerCase()) ||
                         (m.relatedMaterialId && m.relatedMaterialId.includes(aiSpatialQuery.toLowerCase()));
    return matchesCat && matchesReg && matchesQuery;
  });

  // Calculate route positions
  const routePositions = filteredMarkers.slice(0, 4).map(m => [m.location[0], m.location[1]] as [number, number]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-amber-400" />
            <span>REAL INTERACTIVE TEYVAT MAP & SPATIAL ASSISTANT</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real Leaflet map engine with Teyvat geography, marker layers, material filtering, and AI route generation.
          </p>
        </div>

        {/* AI Spatial Search Input */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl max-w-md w-full">
          <Sparkles className="w-4 h-4 text-amber-400 ml-2" />
          <input
            type="text"
            value={aiSpatialQuery}
            onChange={e => setAiSpatialQuery(e.target.value)}
            placeholder='AI Spatial: "Find Silk Flowers in Liyue"'
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

      {/* Main Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Layer Filters Sidebar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 lg:col-span-1">
          <span className="text-xs font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> MAP LAYERS
          </span>

          <div className="space-y-1.5 text-xs">
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

        {/* Interactive Leaflet Map Canvas */}
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-3xl p-4 relative min-h-[550px] flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Top Bar Stats */}
          <div className="flex items-center justify-between bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 z-10 mb-2">
            <span className="text-xs font-bold text-slate-200">
              Active Markers: {filteredMarkers.length}
            </span>
            {routeActive && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Route Active ({routePositions.length} Stops)
              </span>
            )}
          </div>

          {/* Leaflet Map Integration */}
          <div className="relative w-full h-[450px] rounded-2xl border border-slate-800 overflow-hidden my-2">
            {isClient ? (
              <MapContainer
                center={[30, 115]}
                zoom={4}
                scrollWheelZoom={true}
                className="w-full h-full z-0"
              >
                <TileLayer
                  attribution='&copy; Genshin Impact Map / TEYVAT AI Spatial System'
                  url="https://map-tiles.hoyolab.com/genshin/{z}/{x}/{y}.jpg"
                />
                {filteredMarkers.map(marker => (
                  <Marker
                    key={marker.id}
                    position={[marker.location[0], marker.location[1]]}
                    eventHandlers={{
                      click: () => setSelectedMarker(marker),
                    }}
                  >
                    <Popup>
                      <div className="p-1 text-xs">
                        <strong className="block font-bold text-slate-900">{marker.title}</strong>
                        <span className="text-slate-600">{marker.category} • {marker.region}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {routeActive && routePositions.length > 1 && (
                  <Polyline
                    positions={routePositions}
                    pathOptions={{ color: '#f59e0b', weight: 4, dashArray: '8, 8' }}
                  />
                )}
              </MapContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400 text-xs font-mono">
                Loading Teyvat Map Engine...
              </div>
            )}
          </div>

          {/* Marker Inspector Bottom Card */}
          {selectedMarker && (
            <div className="bg-slate-900/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between z-10 mt-2">
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
                <span>{routeActive ? 'Clear Route' : 'Generate Route'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
