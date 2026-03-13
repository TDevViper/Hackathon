const COLORS = {
  high:   { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.3)',   text: '#EF4444', label: 'HIGH'   },
  medium: { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.3)',  text: '#F59E0B', label: 'MEDIUM' },
  low:    { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.3)',   text: '#22C55E', label: 'LOW'    },
}

const ICONS = { weather: '🌊', war: '⚔️', transport: '🚢', politics: '🏛️' }

export default function AlertCard({ item }) {
  const c = COLORS[item.risk] || COLORS.low

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 'var(--radius)',
      padding: '12px 14px',
      display: 'flex', alignItems: 'flex-start', gap: 12,
      animation: 'fadeIn 0.3s ease'
    }}>
      <span style={{ fontSize: 20, flexShrink: 0 }}>{ICONS[item.category] || '⚡'}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{
            fontSize: 10, fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace",
            color: c.text, letterSpacing: 1
          }}>{c.label}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.country}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>{item.time}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.4 }}>{item.title}</p>
      </div>
    </div>
  )
}
