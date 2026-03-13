import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const link = (to, label) => ({
    to, label,
    style: {
      padding: '6px 14px',
      borderRadius: 6,
      fontSize: 13,
      fontWeight: 500,
      color: pathname === to ? 'var(--text)' : 'var(--muted)',
      background: pathname === to ? 'var(--bg3)' : 'transparent',
      transition: 'all 0.15s'
    }
  })

  const links = [link('/', 'Home'), link('/dashboard', 'Dashboard')]

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1.5rem', height: 56,
      background: 'rgba(13,15,20,0.9)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(10px)',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 600, fontSize: 15,
          color: 'var(--text)', letterSpacing: 0.5
        }}>SupplyGuard</span>
      </Link>

      <div style={{ display: 'flex', gap: 4 }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={l.style}>{l.label}</Link>
        ))}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
        color: 'var(--green)'
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--green)',
          animation: 'pulse 2s ease infinite'
        }} />
        LIVE
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </div>
    </nav>
  )
}
