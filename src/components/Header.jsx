import React from 'react';
import { PlusCircle, ShieldCheck, Info, Sparkles, Layers } from 'lucide-react';

export default function Header({ onOpenAddModal, onOpenTrustModal, listingCount }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-slate-900 shadow-lg shadow-orange-500/20 border border-orange-400/30">
              <span className="text-xl font-black text-white tracking-tighter">FF</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" title="System Live"></div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>FERROFLOW</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30 tracking-widest uppercase">
                    India
                  </span>
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Pilot Corridor Active
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal truncate">
                A digital marketplace for verified, traceable steel scrap
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onOpenTrustModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
              title="View FerroFlow Trust Architecture"
            >
              <Info className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">Trust Layer</span> Architecture
            </button>

            <button
              onClick={onOpenAddModal}
              id="add-listing-btn"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 rounded-lg shadow-md shadow-orange-950/50 hover:shadow-orange-600/30 transition-all cursor-pointer active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Listing</span>
              <span className="ml-1 px-1.5 py-0.2 bg-black/25 rounded text-[11px] font-mono">
                AI Ingest
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
