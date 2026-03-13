const RISK_CONFIG = {
  high:   { color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', label: 'HIGH',   dot: '#EF4444' },
  medium: { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', label: 'MED',    dot: '#F59E0B' },
  low:    { color: '#059669', bg: '#F0FDF4', border: '#A7F3D0', label: 'LOW',    dot: '#10B981' },
}
const CAT_ICON = { weather: '🌪', war: '⚔️', transport: '🚢', politics: '🏛' }
const FLAG = { China:'🇨🇳', Germany:'🇩🇪', Netherlands:'🇳🇱', Taiwan:'🇹🇼', India:'🇮🇳', Ukraine:'🇺🇦', USA:'🇺🇸', US:'🇺🇸', Suez:'🇪🇬', Egypt:'🇪🇬', Singapore:'🇸🇬', Brazil:'🇧🇷', Japan:'🇯🇵', Global:'🌍' }

export default function AlertCard({ item }) {
  const cfg = RISK_CONFIG[item.risk] || RISK_CONFIG.medium
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: cfg.bg, border: `1px solid ${cfg.border}`,
      borderRadius: 10, padding: '12px 16px',
      transition: 'all 0.15s', animation: 'fadeUp 0.3s ease forwards',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)' }}
    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}
    >
      <div style={{
        minWidth: 38, height: 38, borderRadius: 10, fontSize: 18,
        background: 'white', border: `1px solid ${cfg.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>{CAT_ICON[item.category] || '📡'}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.title}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--muted2)' }}>
          <span>{FLAG[item.country] || '🌐'} {item.country}</span>
          <span style={{ color: 'var(--border2)' }}>·</span>
          <span style={{ textTransform: 'capitalize' }}>{item.category}</span>
          <span style={{ color: 'var(--border2)' }}>·</span>
          <span>{item.time}</span>
        </div>
      </div>

      <span style={{
        fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
        color: cfg.color, background: 'white', border: `1px solid ${cfg.border}`,
        padding: '3px 8px', borderRadius: 6, letterSpacing: 1, whiteSpace: 'nowrap',
      }}>{cfg.label}</span>
    </div>
  )
}
