import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <div style={{
        display: 'inline-block', fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11, color: 'var(--green)', border: '1px solid rgba(34,197,94,0.3)',
        background: 'rgba(34,197,94,0.06)', padding: '4px 14px',
        borderRadius: 50, marginBottom: '1.5rem', letterSpacing: 1
      }}>AI-POWERED · RUNS LOCALLY · NO API COST</div>

      <h1 style={{
        fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 600,
        lineHeight: 1.1, marginBottom: '1.2rem', letterSpacing: -1
      }}>
        Know supply chain risks<br />
        <span style={{ color: 'var(--red)' }}>before they hit.</span>
      </h1>

      <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
        AI monitors global news in real time, classifies supply chain threats, and shows you exactly where the risk is — before your shipment fails.
      </p>

      <button onClick={() => navigate('/dashboard')} style={{
        padding: '13px 32px', background: 'var(--red)', color: '#fff',
        border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600,
        transition: 'all 0.2s', boxShadow: '0 0 24px rgba(239,68,68,0.25)'
      }}>
        Open Dashboard →
      </button>

      {/* Feature grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: '4rem' }}>
        {[
          { icon: '🤖', title: 'Local AI', desc: 'Llama 3.2 via Ollama — no cloud, no cost, works offline' },
          { icon: '🌍', title: 'World Map', desc: 'Live risk pins across every country in your supply chain' },
          { icon: '⚡', title: 'Real-time', desc: 'NewsAPI feeds classified instantly by category and severity' },
        ].map(f => (
          <div key={f.title} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '1.2rem', textAlign: 'left'
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
