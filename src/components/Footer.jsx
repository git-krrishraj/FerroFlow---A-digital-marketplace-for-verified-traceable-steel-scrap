import React from 'react';
import { RotateCcw, Database, Shield, Sparkles } from 'lucide-react';

export default function Footer({ onResetDemo, onOpenTrustModal }) {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Branding summary */}
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">FERROFLOW INDIA</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase font-mono">
                OPJEMS 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              A circular-economy B2B marketplace turning fragmented scrap into reliable raw material for carbon, stainless & alloy steel producers.
            </p>
          </div>

          {/* Demo Controls Section (Requirement 4) */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
              <Database className="w-3.5 h-3.5 text-orange-400" />
              <span>State: <strong className="text-slate-300 font-mono">localStorage</strong></span>
            </div>

            {/* Crucial Requirement 4: Reset Demo Data Button */}
            <button
              onClick={onResetDemo}
              id="reset-demo-btn"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/50 hover:border-rose-700 rounded-lg transition-all cursor-pointer shadow-sm active:scale-98"
              title="Clears localStorage and reloads the default 3 scrap lots"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>Reset Demo Data</span>
            </button>
          </div>

        </div>

        {/* Bottom footer row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenTrustModal}
              className="hover:text-orange-400 transition-colors cursor-pointer"
            >
              Trust Architecture
            </button>
            <span>•</span>
            <span className="text-slate-400">Jamshedpur–Bokaro–Raipur Corridor</span>
            <span>•</span>
            <span className="text-slate-400">Zero Backend Required</span>
          </div>

          <p className="text-[11px] text-slate-400">
            FerroFlow B2B Steel Scrap Marketplace • Single-Page React App
          </p>
        </div>

      </div>
    </footer>
  );
}
