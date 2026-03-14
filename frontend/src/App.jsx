import React, { useState, useEffect, useMemo, useCallback } from 'react';
import RiskAlertBanner from './components/RiskAlertBanner';
import DashboardHeader from './components/DashboardHeader';
import RiskHeatmap from './components/RiskHeatmap';
import RiskTrend from './components/RiskTrend';
import AlertCard from './components/AlertCard';
import { fetchNews, fetchRisk } from './services/api';

function buildTrend(news) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((name, i) => {
    const slice = news.filter((_, idx) => idx % 7 === i);
    return {
      name,
      high:   slice.filter(n => n.risk === 'high').length   || Math.round(news.filter(n=>n.risk==='high').length   * (0.1 + 0.15 * Math.abs(Math.sin(i * 1.3)))),
      medium: slice.filter(n => n.risk === 'medium').length || Math.round(news.filter(n=>n.risk==='medium').length * (0.1 + 0.15 * Math.abs(Math.sin(i * 0.9)))),
      low:    slice.filter(n => n.risk === 'low').length    || Math.round(news.filter(n=>n.risk==='low').length    * (0.1 + 0.15 * Math.abs(Math.sin(i * 1.7)))),
    };
  });
}

const App = () => {
  const [headlines, setHeadlines] = useState([]);
  const [risks, setRisks]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [searchTerm, setSearchTerm]     = useState('');
  const [refreshTimer, setRefreshTimer] = useState(30);
  const [showAlert, setShowAlert]   = useState(false);
  const [highAlerts, setHighAlerts] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const [news, riskData] = await Promise.all([fetchNews(), fetchRisk()]);
      setHeadlines(news);
      setRisks(riskData);
      const highs = riskData.filter(r => r.risk === 'high');
      if (highs.length > 0) {
        setHighAlerts(highs.map(h => ({ location: h.country, value: 92 })));
        setShowAlert(true);
      }
    } catch (e) {
      console.error('Failed to load data', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTimer(prev => {
        if (prev <= 1) { loadData(); return 30; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loadData]);

  const filteredHeadlines = useMemo(() =>
    headlines.filter(h =>
      h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (h.country || '').toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, headlines]);

  const trendData   = useMemo(() => buildTrend(headlines), [headlines]);
  const heatmapData = useMemo(() =>
    risks.map(r => ({ lat: r.lat || 0, lng: r.lng || 0, weight: r.risk === 'high' ? 0.9 : r.risk === 'medium' ? 0.5 : 0.2 }))
         .filter(p => p.lat !== 0 || p.lng !== 0),
    [risks]);

  const handleExport  = () => window.print();
  const handleRefresh = () => { setRefreshTimer(30); loadData(); };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-slate-800 border-t-blue-500 animate-spin" />
      <p className="text-xs font-mono text-slate-500 tracking-widest uppercase">Fetching intelligence…</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">

      {showAlert && highAlerts.length > 0 && (
        <RiskAlertBanner alerts={highAlerts} onClose={() => setShowAlert(false)} />
      )}

      <DashboardHeader
        onSearch={setSearchTerm}
        onExport={handleExport}
        onRefresh={handleRefresh}
        refreshTimer={refreshTimer}
      />

      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Live Feed */}
        <section className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          <div className="flex justify-between items-center mb-2 px-1">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">Live Intel Feed</h2>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
              {filteredHeadlines.length} Events
            </span>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
            {filteredHeadlines.length === 0
              ? <p className="text-center text-slate-600 text-xs font-mono py-12 tracking-widest">NO EVENTS FOUND</p>
              : filteredHeadlines.map(item => <AlertCard key={item.id} item={item} />)
            }
          </div>
        </section>

        {/* Right: Visualizations */}
        <section className="lg:col-span-8 space-y-6 order-1 lg:order-2">

          <div className="bg-slate-900/50 backdrop-blur rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="px-5 pt-4 pb-1 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">🌍 Global Risk Heatmap</h3>
              <span className="text-[10px] font-mono text-slate-600">{risks.length} countries</span>
            </div>
            <RiskHeatmap data={heatmapData} />
          </div>

          <div className="bg-slate-900/50 backdrop-blur rounded-3xl p-6 border border-slate-800 shadow-xl">
            <RiskTrend data={trendData} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Critical Alerts', value: risks.filter(r=>r.risk==='high').length,   color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20',     icon: '🔴' },
              { label: 'Elevated Risk',   value: risks.filter(r=>r.risk==='medium').length, color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   icon: '🟡' },
              { label: 'Stable',          value: risks.filter(r=>r.risk==='low').length,    color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: '🟢' },
            ].map(s => (
              <div key={s.label} className={`rounded-2xl p-4 border ${s.bg} ${s.border}`}>
                <div className={`text-xs font-bold mb-2 ${s.color}`}>{s.icon} {s.label}</div>
                <div className={`text-4xl font-black font-mono ${s.color}`}>{s.value}</div>
                <div className="text-[11px] text-slate-500 mt-1">active events</div>
              </div>
            ))}
          </div>

        </section>
      </main>

      <footer className="p-8 text-center no-print">
        <p className="text-[10px] text-slate-700 font-mono tracking-widest uppercase">
          Supply Chain Risk Architecture • AI-Powered • Built 2026
        </p>
      </footer>
    </div>
  );
};

export default App;