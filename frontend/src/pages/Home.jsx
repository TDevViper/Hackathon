import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STATS = [
  { value: '10K+', label: 'Headlines Analyzed' },
  { value: '190',  label: 'Countries Monitored' },
  { value: '99%',  label: 'Uptime' },
  { value: '<1s',  label: 'Detection Speed' },
]

export default function Home() {
  const navigate   = useNavigate()
  const globeRef   = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!globeRef.current) return
    import('react-globe.gl').then(mod => {
      const Globe = mod.default
      const el = globeRef.current
      const g = Globe()(el)
      g.width(el.offsetWidth)
       .height(el.offsetHeight)
       .backgroundColor('rgba(0,0,0,0)')
       .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
       .atmosphereColor('#60A5FA')
       .atmosphereAltitude(0.25)
       .arcsData([
         { from:{lat:35.86,lng:104.19}, to:{lat:51.16,lng:10.45},  color:'#EF4444' },
         { from:{lat:23.69,lng:120.96}, to:{lat:37.09,lng:-95.71}, color:'#EF4444' },
         { from:{lat:20.59,lng:78.96},  to:{lat:51.16,lng:10.45},  color:'#F59E0B' },
         { from:{lat:1.35, lng:103.82}, to:{lat:35.86,lng:104.19}, color:'#10B981' },
         { from:{lat:-14.23,lng:-51.92},to:{lat:37.09,lng:-95.71}, color:'#F59E0B' },
         { from:{lat:30.0, lng:32.5},   to:{lat:51.16,lng:10.45},  color:'#10B981' },
         { from:{lat:35.86,lng:104.19}, to:{lat:1.35, lng:103.82}, color:'#EF4444' },
       ])
       .arcStartLat(d => d.from.lat).arcStartLng(d => d.from.lng)
       .arcEndLat(d => d.to.lat).arcEndLng(d => d.to.lng)
       .arcColor('color')
       .arcAltitude(0.3)
       .arcDashLength(0.4).arcDashGap(0.2).arcDashAnimateTime(2500)
       .arcStroke(0.8)
       .pointsData([
         {lat:35.86,lng:104.19,color:'#EF4444',size:0.6},
         {lat:23.69,lng:120.96,color:'#EF4444',size:0.6},
         {lat:51.16,lng:10.45, color:'#F59E0B',size:0.5},
         {lat:20.59,lng:78.96, color:'#F59E0B',size:0.5},
         {lat:1.35, lng:103.82,color:'#10B981',size:0.4},
       ])
       .pointColor('color').pointAltitude(0.02).pointRadius('size')
       .controls().autoRotate = true
      g.controls().autoRotateSpeed = 0.5
      g.controls().enableZoom = false
      g.pointOfView({ lat: 20, lng: 60, altitude: 1.8 }, 1200)
      setReady(true)
    })
  }, [])

  return (
    <div style={{ paddingTop: 60, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Blue gradient background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 40%, #E0F2FE 100%)',
      }} />

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, minHeight: 'calc(100vh - 60px)', alignItems: 'center' }}>

        {/* Left text */}
        <div style={{ padding: '4rem 3rem 4rem 4rem', animation: 'fadeUp 0.7s ease forwards' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem',
            background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)',
            padding: '6px 16px', borderRadius: 50, fontSize: 12, fontWeight: 600,
            color: 'var(--blue)', letterSpacing: 0.5,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite' }} />
            AI-Powered Risk Intelligence
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 900,
            lineHeight: 1.05, letterSpacing: -2, marginBottom: '1.5rem', color: 'var(--text)',
          }}>
            Know supply<br/>chain risks<br/>
            <span style={{ color: 'var(--blue)' }}>before they hit.</span>
          </h1>

          <p style={{ fontSize: 17, color: 'var(--muted2)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 420 }}>
            Real-time AI scans global headlines, classifies threats by severity, and maps disruptions — all running locally on your machine.
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate('/dashboard')} style={{
              padding: '14px 32px', background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
              color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700,
              boxShadow: '0 8px 24px rgba(37,99,235,0.35)', transition: 'all 0.2s', letterSpacing: -0.3,
            }}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform='none'}
            >Launch Dashboard →</button>

            <button onClick={() => window.open('http://localhost:8000/docs')} style={{
              padding: '14px 24px', background: 'white',
              color: 'var(--blue)', border: '1.5px solid var(--border2)',
              borderRadius: 10, fontSize: 15, fontWeight: 600,
              boxShadow: 'var(--shadow)', transition: 'all 0.2s',
            }}>API Docs</button>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: '3rem' }}>
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue)', letterSpacing: -1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right globe */}
        <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Glow behind globe */}
          <div style={{
            position: 'absolute', width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
            zIndex: 0,
          }} />
          <div ref={globeRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />
          {!ready && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--muted)', letterSpacing: 2,
            }}>Loading globe...</div>
          )}

          {/* Floating labels */}
          {ready && [
            { top: '20%', left: '10%', label: '🔴 China Port Shutdown', risk: 'high' },
            { top: '35%', left: '5%',  label: '🟡 Taiwan Strait Tension', risk: 'medium' },
            { top: '55%', left: '12%', label: '🟢 Singapore Normal', risk: 'low' },
          ].map((b, i) => (
            <div key={i} style={{
              position: 'absolute', top: b.top, left: b.left,
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--border2)', borderRadius: 8,
              padding: '6px 12px', fontSize: 11, fontWeight: 600, color: 'var(--text)',
              boxShadow: 'var(--shadow)', animation: `float ${2.5 + i * 0.5}s ease-in-out infinite`,
              whiteSpace: 'nowrap', zIndex: 10,
            }}>{b.label}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
