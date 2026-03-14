import React from 'react';
import { AlertTriangle, X, ChevronRight } from 'lucide-react';

const RiskAlertBanner = ({ alerts, onClose }) => {
  if (!alerts || alerts.length === 0) return null;

  // Taking the primary critical alert to display
  const topAlert = alerts[0];

  return (
    <div className="bg-slate-900 border-b border-red-500/30 relative overflow-hidden no-print">
      {/* Subtle background pulse for urgency */}
      <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
      
      <div className="relative flex items-center justify-between px-6 py-3 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4">
          {/* Status Indicator matching Heatmap's red */}
          <div className="flex items-center justify-center">
            <span className="absolute h-3 w-3 rounded-full bg-red-500 animate-ping opacity-25" />
            <div className="bg-red-500 p-1 rounded shadow-[0_0_12px_rgba(239,68,68,0.4)]">
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-red-500/20 text-red-500 text-[10px] font-black px-2 py-0.5 rounded border border-red-500/30 uppercase tracking-tighter">
              Critical Spike
            </span>
            <p className="text-sm font-medium text-slate-200">
              High risk surge in <span className="text-white font-bold underline decoration-red-500/50">{topAlert.location}</span>: 
              Risk Level <span className="text-red-400 font-mono font-bold">{topAlert.value}%</span>
            </p>
          </div>

          <button className="hidden lg:flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-white transition-all uppercase tracking-widest ml-6">
            View Analytics <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Dismiss Interaction */}
        <button 
          onClick={onClose}
          className="text-slate-500 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RiskAlertBanner;