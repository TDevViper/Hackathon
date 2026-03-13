import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem', height: 60,
      background: 'rgba(240,246,255,0.85)',
      borderBottom: '1px solid var(--border2)',
      backdropFilter: 'blur(16px)',
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
        }}>⚡</div>
        <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)', letterSpacing: -0.5 }}>
          Supply<span style={{ color: 'var(--blue)' }}>Guard</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: 4 }}>
        {[['/', 'Home'], ['/dashboard', 'Dashboard']].map(([to, label]) => (
          <Link key={to} to={to} style={{
            padding: '7px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600,
            color: pathname === to ? '#fff' : 'var(--muted2)',
            background: pathname === to ? 'var(--blue)' : 'transparent',
            boxShadow: pathname === to ? '0 4px 12px rgba(37,99,235,0.3)' : 'none',
            transition: 'all 0.2s',
          }}>{label}</Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--green)', fontWeight: 600 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite' }} />
        LIVE
      </div>
    </nav>
  )
}
