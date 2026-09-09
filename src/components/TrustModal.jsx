import React from 'react';
import { X, CheckCircle2, XCircle, ShieldCheck, Cpu, FileCheck, FlaskConical, Radio } from 'lucide-react';

export default function TrustModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <span className="text-[11px] font-mono text-orange-400 font-semibold tracking-wider uppercase">
              OPJEMS 2026 Core Architecture
            </span>
            <h2 className="text-lg font-bold text-white">
              AI without Expensive Sensors: Capabilities & Trust Boundaries
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs sm:text-sm">
          
          {/* Principle Alert */}
          <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300">
            <span className="font-bold">FerroFlow Product Principle:</span> Never convert an AI estimate into a false certification. Trust level is transparently displayed beside every lot.
          </div>

          {/* Grid: What AI Can Do vs What It Cannot Do */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* What AI Can Do */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>What AI Can Do</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">From ordinary photos and listing data:</p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Detect visible contamination & oxidation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Estimate broad scrap category (SS 304, Carbon, Alloy)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Identify surface, stamping & shape patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Flag suspicious or inconsistent listings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Predict likely buyer fit & EAF compatibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Rank lots by automated quality confidence score</span>
                </li>
              </ul>
            </div>

            {/* What AI Cannot Do */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800 text-rose-400 font-bold uppercase tracking-wider text-xs">
                <XCircle className="w-4 h-4" />
                <span>What AI Cannot Do</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">A smartphone camera alone cannot reliably determine:</p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>Exact Cr / Ni / Mo / C metallurgical percentages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>Certified chemical composition certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>Internal structural & tensile properties</span>
                </li>
              </ul>
              <div className="mt-4 p-2.5 bg-slate-900 rounded-lg text-[11px] text-slate-400 border border-slate-800">
                These require physical measurement, supplier Mill Test Certificates (MTC), or lab testing.
              </div>
            </div>

          </div>

          {/* 4-Tier Trust Architecture Hierarchy */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <h3 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider mb-3">
              FerroFlow 4-Tier Trust Architecture
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/20">
                <div className="flex items-center gap-2 font-semibold text-cyan-400 mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Level 1 — Visual Screening</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Immediate automated edge AI screening on listing photos. Generates preliminary confidence.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-amber-500/20">
                <div className="flex items-center gap-2 font-semibold text-amber-400 mb-1">
                  <FileCheck className="w-4 h-4" />
                  <span>Level 2 — Supplier Documents</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Verified origin documents, weighbridge receipts, and supplier Mill Test Certificates.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-indigo-500/20">
                <div className="flex items-center gap-2 font-semibold text-indigo-400 mb-1">
                  <FlaskConical className="w-4 h-4" />
                  <span>Level 3 — Lab Verification</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Randomized audit or buyer-requested third-party metallurgical lab chemical assay.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/20">
                <div className="flex items-center gap-2 font-semibold text-emerald-400 mb-1">
                  <Radio className="w-4 h-4" />
                  <span>Level 4 — Spectroscopy Integration</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Handheld XRF / optical emission spectrometer API integration directly at weighbridge.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-3 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
