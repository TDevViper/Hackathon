import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import EventList from './EventList'
import RiskMap   from './RiskMap'
import { fetchNews, fetchRisk } from '../services/api'

const RISK_COLOR = { high: '#EF4444', medium: '#F59E0B', low: '#22C55E' }

export default function Dashboard() {
  const [news,    setNews]    = useState([])
  const [risks,   setRisks]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchNews(), fetchRisk()]).then(([n, r]) => {
      setNews(n); setRisks(r); setLoading(false)
    })
  }, [])

  const stats = {
    high:   risks.filter(r => r.risk === 'high').length,
    medium: risks.filter(r => r.risk === 'medium').length,
    low:    risks.filter(r => r.risk === 'low').length,
  }

  const chartData = risks.map(r => ({ name: r.country, risk: r.risk === 'high' ? 3 : r.risk === 'medium' ? 2 : 1 }))

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--muted)', fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}>
      Fetching intelligence...
    </div>
  )

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem' }}>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Critical Alerts', value: stats.high,   color: '#EF4444' },
          { label: 'Medium Risk',     value: stats.medium, color: '#F59E0B' },
          { label: 'Low Risk',        value: stats.low,    color: '#22C55E' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '14px 16px'
          }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 0.5 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: s.color, fontFamily: "'IBM Plex Mono', monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Map + Chart row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--muted)', letterSpacing: 1, marginBottom: 8 }}>GLOBAL RISK MAP</div>
          <RiskMap risks={risks} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--muted)', letterSpacing: 1, marginBottom: 8 }}>RISK BY COUNTRY</div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem', height: 380 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" domain={[0,3]} hide />
                <YAxis type="category" dataKey="name" tick={{ fill: '#64748B', fontSize: 12 }} width={65} />
                <Tooltip
                  formatter={(v) => [v === 3 ? 'HIGH' : v === 2 ? 'MEDIUM' : 'LOW', 'Risk']}
                  contentStyle={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)' }}
                />
                <Bar dataKey="risk" radius={[0,4,4,0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={RISK_COLOR[entry.risk]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Event feed */}
      <div>
        <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--muted)', letterSpacing: 1, marginBottom: 10 }}>LIVE EVENT FEED</div>
        <EventList events={news} />
      </div>
    </div>
  )
}
