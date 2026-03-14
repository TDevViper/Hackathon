import React from 'react';

const RISK_CONFIG = {
  high:   { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'CRITICAL', dot: 'bg-red-500' },
  medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'WARNING',  dot: 'bg-amber-500' },
  low:    { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'STABLE',   dot: 'bg-emerald-500' },
};

const CAT_ICON = { weather: '🌪', war: '⚔️', transport: '🚢', politics: '🏛' };
const FLAG = { 
  China:'🇨🇳', Germany:'🇩🇪', Netherlands:'🇳🇱', Taiwan:'🇹🇼', India:'🇮🇳', 
  Ukraine:'🇺🇦', USA:'🇺🇸', US:'🇺🇸', Suez:'🇪🇬', Egypt:'🇪🇬', 
  Singapore:'🇸🇬', Brazil:'🇧🇷', Japan:'🇯🇵', Global:'🌍' 
};

export default function AlertCard({ item }) {
  const cfg = RISK_CONFIG[item.risk] || RISK_CONFIG.medium;

  return (
    <div className={`
      flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
      ${cfg.bg} ${cfg.border} hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]
      group cursor-pointer backdrop-blur-sm
    `}>
      {/* Category Icon with Layered Shadow */}
      <div className={`
        min-w-[42px] h-[42px] rounded-lg text-xl flex items-center justify-center
        bg-slate-900 border ${cfg.border} shadow-inner transition-transform group-hover:rotate-12
      `}>
        {CAT_ICON[item.category] || '📡'}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-sm text-slate-100 truncate tracking-tight">
            {item.title}
          </h3>
          {item.risk === 'high' && (
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          )}
        </div>
        
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="text-base leading-none">{FLAG[item.country] || '🌐'}</span>
            {item.country}
          </span>
          <span className="text-slate-700">|</span>
          <span className="capitalize">{item.category}</span>
          <span className="text-slate-700">|</span>
          <span className="font-mono text-[10px] opacity-70">{item.time}</span>
        </div>
      </div>

      {/* Modern Status Badge */}
      <div className="flex flex-col items-end gap-1">
        <span className={`
          text-[9px] font-black font-mono px-2 py-0.5 rounded border
          ${cfg.color} border-current bg-slate-950/50 tracking-tighter
        `}>
          {cfg.label}
        </span>
        <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
           <div className={`h-full ${item.risk === 'high' ? 'w-full bg-red-500' : item.risk === 'medium' ? 'w-1/2 bg-amber-500' : 'w-1/4 bg-emerald-500'}`} />
        </div>
      </div>
    </div>
  );
}