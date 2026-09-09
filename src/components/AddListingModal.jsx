import React, { useState } from 'react';
import { X, UploadCloud, Camera, Sparkles, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AddListingModal({ isOpen, onClose, onAddListing }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [fakeFileName, setFakeFileName] = useState(null);
  const [isScreening, setIsScreening] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  // Quick corridor presets for convenience
  const locationPresets = ['Jamshedpur', 'Bokaro', 'Raipur', 'Durgapur', 'Nagpur'];

  const handleFakeFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFakeFileName(file.name);
    } else {
      setFakeFileName('scrap_batch_inspection_sample.jpg');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!description.trim()) {
      setValidationError('Please enter a description for the scrap lot.');
      return;
    }
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      setValidationError('Please enter a valid positive quantity in metric tons.');
      return;
    }
    if (!location.trim()) {
      setValidationError('Please specify a location or hub.');
      return;
    }

    // Step 1: Immediately disable the submit button and show a 2.5-second CSS spinning loader
    // overlaying the modal with the text, "AI visual screening in progress..."
    setIsScreening(true);

    setTimeout(() => {
      // Step 2: String-matching heuristics for the Description input
      const descLower = description.toLowerCase();
      let assignedGrade = 'Alloy Steel'; // Default

      if (descLower.includes('stainless') || descLower.includes('304')) {
        assignedGrade = 'SS 304';
      } else if (descLower.includes('carbon')) {
        assignedGrade = 'Carbon Steel';
      } else {
        assignedGrade = 'Alloy Steel';
      }

      // Step 3: Pseudo-Random Generation between 82% and 98%
      const assignedConfidence = Math.floor(Math.random() * (98 - 82 + 1)) + 82;

      // Estimated market prices based on grade
      const priceMap = {
        'SS 304': '₹39,200/t',
        'Carbon Steel': '₹28,800/t',
        'Alloy Steel': '₹45,500/t',
      };

      // Step 4 & 5: Build listing object with generic grey box camera placeholder and 'AI Screened' status
      const formattedQty = quantity.toString().endsWith('t')
        ? quantity
        : `${quantity}t`;

      const newListing = {
        id: `LOT-${Math.floor(1000 + Math.random() * 9000)}`,
        grade: assignedGrade,
        quantity: formattedQty,
        location: location.trim(),
        confidence: assignedConfidence,
        status: 'AI Screened',
        landedPrice: priceMap[assignedGrade] || '₹35,000/t',
        evidenceLevel: 'Level 1 — Visual Screening (Computer Vision)',
        description: description.trim(),
        seller: 'Verified Industrial Seller (Direct)',
        timestamp: 'Just now',
        hasCustomImage: false, // Generic grey box with camera icon
      };

      // Push to state & localStorage, close modal, and instantly re-render dashboard
      onAddListing(newListing);
      setIsScreening(false);
      resetForm();
      onClose();
    }, 2500); // 2.5-second delay
  };

  const resetForm = () => {
    setDescription('');
    setQuantity('');
    setLocation('');
    setFakeFileName(null);
    setValidationError('');
    setIsScreening(false);
  };

  const handleClose = () => {
    if (isScreening) return; // Prevent closing mid-screening
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Step 1 Loader: 2.5-second CSS spinning loader overlaying the modal */}
        {isScreening && (
          <div className="absolute inset-0 z-50 bg-slate-950/92 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            {/* CSS Spinning Loader */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
              </div>
            </div>

            {/* Prompt required text: "AI visual screening in progress..." */}
            <h3 className="text-lg font-bold text-white tracking-tight mb-2">
              AI visual screening in progress...
            </h3>

            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Evaluating surface texture, optical spectrometry patterns, and contamination heuristics.
            </p>

            <div className="mt-5 w-48 bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 h-full rounded-full animate-[pulse_1s_ease-in-out_infinite] w-3/4"></div>
            </div>
            <span className="mt-2 text-[11px] font-mono text-slate-500">
              Confidence engine analyzing...
            </span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Add Scrap Lot</h2>
              <p className="text-xs text-slate-400">AI-assisted visual classification & listing</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isScreening}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-30 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {validationError && (
            <div className="flex items-center gap-2 p-3 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/60 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Description Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Description <span className="text-orange-400">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isScreening}
              rows={3}
              placeholder="e.g., Heavy SS 304 pipe cutoffs from fabrication facility, clean without slag..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all resize-none disabled:opacity-50"
            />
            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
              <span>Keyword hints: <span className="text-slate-300 font-mono">stainless</span>, <span className="text-slate-300 font-mono">304</span>, or <span className="text-slate-300 font-mono">carbon</span></span>
              <span>AI Classifier Ready</span>
            </div>
          </div>

          {/* Quantity & Location Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Quantity (Tons) <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled={isScreening}
                  placeholder="e.g. 50"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-3.5 pr-8 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all disabled:opacity-50"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  t
                </span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Location / Corridor Hub <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isScreening}
                placeholder="e.g. Jamshedpur"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Location preset buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[11px] text-slate-400 mr-1">Quick Hub:</span>
            {locationPresets.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocation(loc)}
                disabled={isScreening}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                  location === loc
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Fake File Upload Button for Photos */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Photos (AI Optical Ingest)
            </label>
            <label
              htmlFor="fake-photo-upload"
              className="group relative flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 hover:border-orange-500/50 rounded-xl bg-slate-950/40 hover:bg-slate-950/70 transition-all cursor-pointer"
            >
              <input
                id="fake-photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFakeFileUpload}
                disabled={isScreening}
                className="sr-only"
              />
              <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-orange-500/20 flex items-center justify-center text-slate-400 group-hover:text-orange-400 mb-2 transition-colors">
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-center">
                {fakeFileName ? (
                  <span className="text-xs font-medium text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {fakeFileName}
                  </span>
                ) : (
                  <>
                    <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                      Click to upload scrap photos
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      JPG, PNG, WEBP (Simulated thumbnail camera placeholder assigned)
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Simulated Disclaimer Banner */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>FerroFlow Trust Principle</span>
            </div>
            <p>
              AI visual screening flags likely grade & purity. It does NOT replace certified chemical spectroscopy. Lots are published with an 'AI Screened' badge.
            </p>
          </div>

          {/* Modal Footer / Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              disabled={isScreening}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isScreening}
              id="submit-listing-btn"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-lg shadow-md shadow-orange-950/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit for AI Screening</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
