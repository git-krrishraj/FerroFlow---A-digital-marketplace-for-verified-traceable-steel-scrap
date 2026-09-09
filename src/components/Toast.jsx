import React, { useEffect } from 'react';
import { CheckCircle2, RotateCcw, X, Info } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isReset = toast.type === 'reset';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl backdrop-blur-md text-slate-100 max-w-md">
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isReset && <RotateCcw className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isReset && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
        
        <div className="flex-1 text-xs sm:text-sm">
          <p className="font-semibold text-white">{toast.title}</p>
          {toast.message && <p className="text-slate-400 text-xs">{toast.message}</p>}
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
