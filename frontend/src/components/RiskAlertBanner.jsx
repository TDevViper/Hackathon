import React from 'react';
import { AlertTriangle, ChevronRight, X } from 'lucide-react';

const RiskAlertBanner = ({ alerts, onClose }) => {
  if (!alerts || alerts.length === 0) return null;

  // We take the most critical (first) alert for the banner
  const topAlert = alerts[0];

  return (
    <div className="relative group no-print">
      {/* Glow Effect Layer */}
      <div className="absolute inset-0 bg-red-600/5 blur-sm" />
      
      <div className="relative bg-slate-950 border-y border-red-500/30 flex items-center justify-between px-6 py-2.5 transition-all">
        <div className="flex items-center gap-4 overflow-hidden">
          {/* Pulsing Status Icon */}
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-20 animate-ping" />
            <div className="relative bg-red-500 rounded-full p-1 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              <AlertTriangle className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Alert Content */}
          <div className="flex items-center gap-3">
            <span className="bg-red-500/10 text-red-500 text-[10px] font-black px-1.5 py-0.5 rounded border border-red-500/20 tracking-tighter uppercase">
              Spike Detected
            </span>
            <p className="text-sm font-medium text-slate-200 truncate">
              Major volatility in <span className="text-white font-bold underline decoration-red-500/50">{topAlert.location}</span>: 
              Risk score surged to <span className="text-red-400 font-mono">{topAlert.value}%</span>
            </p>
          </div>

          {/* Action Link */}
          <button className="hidden md:flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest ml-4 group">
            Analyze Impact <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Close Interaction */}
        <button 
          onClick={onClose}
          className="text-slate-600 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RiskAlertBanner;