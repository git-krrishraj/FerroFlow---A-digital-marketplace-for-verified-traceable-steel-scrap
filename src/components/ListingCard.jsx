import React from 'react';
import { Camera, MapPin, Scale, ShieldCheck, CheckCircle2, Clock, Sparkles, FileText, ArrowRight } from 'lucide-react';

export default function ListingCard({ listing, onSelectListing }) {
  const {
    id,
    grade,
    quantity,
    location,
    confidence,
    status,
    landedPrice,
    evidenceLevel,
    description,
    timestamp,
  } = listing;

  // Status color scheme conforming to requirement:
  // "Include color-coded badges for 'Status' (Green for Verified, Yellow for Docs Pending)"
  const getStatusBadge = (statusVal) => {
    switch (statusVal) {
      case 'Verified':
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
          icon: CheckCircle2,
          label: 'Verified',
        };
      case 'Docs Pending':
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
          icon: Clock,
          label: 'Docs Pending',
        };
      case 'Lab Verified':
        return {
          bg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          dot: 'bg-indigo-400',
          icon: ShieldCheck,
          label: 'Lab Verified',
        };
      case 'AI Screened':
      default:
        return {
          bg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          dot: 'bg-cyan-400',
          icon: Sparkles,
          label: statusVal || 'AI Screened',
        };
    }
  };

  const statusMeta = getStatusBadge(status);
  const StatusIcon = statusMeta.icon;

  // Confidence color gradient & bar
  const getConfidenceColor = (conf) => {
    if (conf >= 92) return 'from-emerald-500 to-teal-400';
    if (conf >= 88) return 'from-cyan-500 to-emerald-400';
    return 'from-amber-500 to-orange-400';
  };

  const getGradeBadge = (gradeVal) => {
    if (gradeVal === 'SS 304') {
      return 'bg-blue-900/40 text-blue-300 border-blue-700/50';
    }
    if (gradeVal === 'Carbon Steel') {
      return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
    return 'bg-purple-900/40 text-purple-300 border-purple-700/50';
  };

  return (
    <div className="group flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-black/40 flex-1">
      
      {/* Thumbnail: Generic grey box with camera icon as required */}
      <div className="relative w-full h-44 bg-slate-800/90 border-b border-slate-800 flex flex-col items-center justify-center group-hover:bg-slate-800 transition-colors">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Camera icon in generic grey container */}
        <div className="relative z-10 flex flex-col items-center justify-center p-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-700/80 border border-slate-600/70 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-slate-500 transition-transform">
            <Camera className="w-7 h-7 text-slate-300" strokeWidth={1.75} />
          </div>
          <span className="mt-2 text-xs font-medium text-slate-400 tracking-wide uppercase">
            Visual Lot Thumbnail
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {id || 'LOT-AI'}
          </span>
        </div>

        {/* Status Badge in upper corner */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-sm ${statusMeta.bg}`}
          >
            <span className={`w-2 h-2 rounded-full ${statusMeta.dot} animate-pulse`}></span>
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{statusMeta.label}</span>
          </span>
        </div>

        {/* Lot ID / Timestamp in bottom overlay */}
        <div className="absolute bottom-2 left-3 z-10 text-[11px] text-slate-400 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm border border-slate-800">
          {timestamp || 'Recent'}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        {/* Header: Grade & Quantity */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase border mb-1.5 ${getGradeBadge(grade)}`}>
                {grade}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                {grade} Scrap Lot
              </h3>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-orange-400 font-bold text-lg sm:text-xl">
                <Scale className="w-4 h-4 text-slate-400" />
                <span>{quantity}</span>
              </div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Weight (Tons)
              </div>
            </div>
          </div>

          {/* Location & Landed Price */}
          <div className="grid grid-cols-2 gap-2 py-2.5 my-2.5 border-y border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate font-medium">{location}</span>
            </div>
            <div className="text-right text-slate-300 font-medium">
              <span className="text-slate-400">Price: </span>
              <span className="font-semibold text-emerald-400">{landedPrice || '₹35,000/t (est)'}</span>
            </div>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {description || 'Standard verified steel scrap lot ready for electric arc furnace or induction furnace processing.'}
          </p>
        </div>

        {/* AI Confidence Visual Progress Bar */}
        <div className="pt-2 border-t border-slate-800/60 mt-auto">
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="flex items-center gap-1 font-medium text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI Visual Confidence
            </span>
            <span className="font-bold font-mono text-cyan-300 text-xs">
              {confidence}%
            </span>
          </div>

          {/* Visual Progress Bar Container */}
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getConfidenceColor(confidence)} transition-all duration-500`}
              style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
              role="progressbar"
              aria-valuenow={confidence}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          {/* Evidence level footnote from slide deck */}
          <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-500">
            <span className="truncate max-w-[180px]" title={evidenceLevel}>
              {evidenceLevel || 'Level 1 — Visual Screening'}
            </span>
            <button
              onClick={() => onSelectListing(listing)}
              className="inline-flex items-center gap-0.5 text-orange-400 hover:text-orange-300 font-medium transition-colors cursor-pointer"
            >
              <span>Inspect</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
