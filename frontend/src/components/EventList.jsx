import { useState } from 'react'
import AlertCard from './AlertCard'

export default function EventList({ events }) {
  const [filter, setFilter] = useState('all')

  const filters = ['all', 'high', 'medium', 'low']
  const filtered = filter === 'all' ? events : events.filter(e => e.risk === filter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 12px', borderRadius: 6, border: '1px solid',
            fontSize: 11, fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: 0.5, textTransform: 'uppercase', transition: 'all 0.15s',
            background: filter === f ? 'var(--bg3)' : 'transparent',
            borderColor: filter === f ? 'rgba(255,255,255,0.15)' : 'var(--border)',
            color: filter === f ? 'var(--text)' : 'var(--muted)',
          }}>{f}</button>
        ))}
        <span style={{
          marginLeft: 'auto', fontSize: 11,
          color: 'var(--muted)', alignSelf: 'center',
          fontFamily: "'IBM Plex Mono', monospace"
        }}>{filtered.length} events</span>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0
          ? <p style={{ color: 'var(--muted)', fontSize: 13, padding: '1rem 0' }}>No events found.</p>
          : filtered.map(e => <AlertCard key={e.id} item={e} />)
        }
      </div>
    </div>
  )
}
