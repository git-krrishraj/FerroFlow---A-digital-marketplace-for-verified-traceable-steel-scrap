import React, { useState } from 'react';
import { X, Camera, MapPin, Scale, ShieldCheck, Sparkles, Truck, Check, AlertCircle, FileText } from 'lucide-react';

export default function LotDetailModal({ listing, onClose }) {
  const [inquired, setInquired] = useState(false);

  if (!listing) return null;

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
    seller,
    timestamp,
  } = listing;

  const handleInquire = () => {
    setInquired(true);
    setTimeout(() => {
      setInquired(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {id}
            </span>
            <span className="text-xs text-slate-400">• Added {timestamp || 'Recently'}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Top visual block & badges */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center shrink-0">
              <Camera className="w-8 h-8 text-slate-400 mb-1" />
              <span className="text-[9px] font-mono text-slate-400">LOT PHOTO</span>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-base font-bold text-white">{grade}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Seller: <span className="text-slate-300 font-medium">{seller || 'Verified Scrap Aggregator'}</span>
              </p>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Scale className="w-3.5 h-3.5 text-orange-400" />
                  {quantity}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {location}
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-400">
                  {landedPrice || '₹35,000/t'}
                </span>
              </div>
            </div>
          </div>

          {/* AI Screening Analysis breakdown */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                AI Optical Screening Metrics
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                Confidence: {confidence}%
              </span>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                style={{ width: `${confidence}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400">
              <div>• Surface oxidation: <span className="text-slate-200">Low (&lt;3%)</span></div>
              <div>• Non-ferrous risk: <span className="text-slate-200">Negligible</span></div>
              <div>• Moisture estimate: <span className="text-slate-200">Dry batch</span></div>
              <div>• Probable classification: <span className="text-slate-200">{grade}</span></div>
            </div>
          </div>

          {/* Lot Description */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Lot Specification & Notes
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800">
              {description}
            </p>
          </div>

          {/* Trust Architecture tier */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block">Trust Level</span>
              <span>{evidenceLevel || 'Level 1 — Visual Screening'}</span>
            </div>
          </div>

          {/* Inquiry Feedback Banner */}
          {inquired && (
            <div className="flex items-center gap-2 p-3 text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-700/60 rounded-xl animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Inquiry initiated! Escrow lock and transport matching request dispatched to corridor dispatch.</span>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleInquire}
              disabled={inquired}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-lg shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{inquired ? 'Inquiry Sent' : 'Request Freight & Quote'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
