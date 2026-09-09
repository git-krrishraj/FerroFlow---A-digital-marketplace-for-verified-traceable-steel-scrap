import React from 'react';
import { Scale, ShieldCheck, Sparkles, MapPin, TrendingUp } from 'lucide-react';

export default function StatsBar({ listings }) {
  // Compute metrics dynamically from current listings in localStorage
  const totalVolume = listings.reduce((acc, item) => {
    const num = parseInt(item.quantity, 10) || 0;
    return acc + num;
  }, 0);

  const verifiedCount = listings.filter(
    (item) => item.status === 'Verified' || item.status === 'Lab Verified'
  ).length;

  const avgConfidence = listings.length > 0
    ? Math.round(
        listings.reduce((acc, item) => acc + (Number(item.confidence) || 0), 0) /
          listings.length
      )
    : 0;

  const locations = Array.from(new Set(listings.map((item) => item.location)));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* Metric 1: Total Listed Volume */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5 sm:p-4 hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-wider">Available Volume</span>
          <Scale className="w-4 h-4 text-orange-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{totalVolume}</span>
          <span className="text-xs font-medium text-slate-400">Metric Tons</span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
          <TrendingUp className="w-3 h-3" />
          <span>Across {listings.length} live scrap lots</span>
        </div>
      </div>

      {/* Metric 2: Verified Lots */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5 sm:p-4 hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-wider">Trust Verified</span>
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-400">{verifiedCount}</span>
          <span className="text-xs font-medium text-slate-400">of {listings.length} Lots</span>
        </div>
        <div className="mt-1 text-[11px] text-slate-400 truncate">
          Verified or Lab Certified
        </div>
      </div>

      {/* Metric 3: Avg AI Confidence */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5 sm:p-4 hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-wider">Avg AI Confidence</span>
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-cyan-400">{avgConfidence}%</span>
          <span className="text-xs font-medium text-slate-400">Vision Score</span>
        </div>
        <div className="mt-1 text-[11px] text-slate-400 truncate">
          Preliminary Visual Screening
        </div>
      </div>

      {/* Metric 4: Steel Corridor Hubs */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5 sm:p-4 hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-wider">Active Corridor</span>
          <MapPin className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-300">{locations.length}</span>
          <span className="text-xs font-medium text-slate-400">Regional Hubs</span>
        </div>
        <div className="mt-1 text-[11px] text-slate-400 truncate" title={locations.join(' • ')}>
          {locations.slice(0, 3).join(', ')}{locations.length > 3 ? '...' : ''}
        </div>
      </div>
    </div>
  );
}
