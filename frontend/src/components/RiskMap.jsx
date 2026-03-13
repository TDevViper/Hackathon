import { useEffect, useRef, useState } from 'react'

const RISK_COLOR = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' }
const COUNTRY_COORDS = { China:{lat:35.86,lng:104.19}, Germany:{lat:51.16,lng:10.45}, Netherlands:{lat:52.13,lng:5.29}, Taiwan:{lat:23.69,lng:120.96}, India:{lat:20.59,lng:78.96}, Ukraine:{lat:48.37,lng:31.16}, USA:{lat:37.09,lng:-95.71}, US:{lat:37.09,lng:-95.71}, Suez:{lat:30.0,lng:32.5}, Egypt:{lat:26.82,lng:30.80}, Singapore:{lat:1.35,lng:103.82}, Brazil:{lat:-14.23,lng:-51.92}, Japan:{lat:36.20,lng:138.25} }
const ROUTES = [
  {from:{lat:35.86,lng:104.19},to:{lat:51.16,lng:10.45},risk:'high'},
  {from:{lat:23.69,lng:120.96},to:{lat:37.09,lng:-95.71},risk:'high'},
  {from:{lat:20.59,lng:78.96},to:{lat:51.16,lng:10.45},risk:'medium'},
  {from:{lat:1.35,lng:103.82},to:{lat:35.86,lng:104.19},risk:'low'},
  {from:{lat:-14.23,lng:-51.92},to:{lat:37.09,lng:-95.71},risk:'medium'},
]

export default function RiskMap({ risks }) {
  const ref = useRef(null)
  const gRef = useRef(null)
  const [ready, setReady] = useState(false)

  const points = risks.map(r => {
    const c = (r.lat && r.lng) ? {lat:r.lat,lng:r.lng} : COUNTRY_COORDS[r.country] || {lat:0,lng:0}
    return {...c, color: RISK_COLOR[r.risk]||'#64748B', label:`${r.country} — ${(r.risk||'').toUpperCase()}`, size: r.risk==='high'?0.6:0.45}
  })

  useEffect(() => {
    if (!ref.current) return
    import('react-globe.gl').then(mod => {
      const G = mod.default
      const g = G()(ref.current)
      g.width(ref.current.offsetWidth).height(360)
       .backgroundColor('rgba(0,0,0,0)')
       .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
       .atmosphereColor('#93C5FD').atmosphereAltitude(0.18)
       .pointsData(points).pointColor('color').pointAltitude(0.02).pointRadius('size').pointLabel('label')
       .arcsData(ROUTES)
       .arcStartLat(d=>d.from.lat).arcStartLng(d=>d.from.lng)
       .arcEndLat(d=>d.to.lat).arcEndLng(d=>d.to.lng)
       .arcColor(d=>RISK_COLOR[d.risk]).arcAltitude(0.25)
       .arcDashLength(0.4).arcDashGap(0.2).arcDashAnimateTime(3000).arcStroke(0.6)
       .controls().autoRotate = true
      g.controls().autoRotateSpeed = 0.5
      g.controls().enableZoom = false
      g.pointOfView({lat:20,lng:30,altitude:2}, 1000)
      gRef.current = g
      setReady(true)
    })
    return () => gRef.current?._destructor?.()
  }, [])

  useEffect(() => { if (gRef.current && ready) gRef.current.pointsData(points) }, [risks, ready])

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', border: '1px solid var(--border2)', position: 'relative' }}>
      <div ref={ref} style={{ width: '100%', height: 360 }} />
      {!ready && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'var(--muted)', letterSpacing:2 }}>
          Loading globe...
        </div>
      )}
    </div>
  )
}
