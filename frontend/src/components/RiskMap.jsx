import { useEffect, useRef } from 'react'

const RISK_COLORS = { high: '#EF4444', medium: '#F59E0B', low: '#22C55E' }

export default function RiskMap({ risks }) {
  const mapRef      = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (!window.L || !mapRef.current) return
    if (instanceRef.current) { instanceRef.current.remove(); instanceRef.current = null }

    const L   = window.L
    const map = L.map(mapRef.current, { center: [20, 10], zoom: 2, zoomControl: true })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO', maxZoom: 18
    }).addTo(map)

    risks.forEach(r => {
      const color = RISK_COLORS[r.risk] || '#64748B'
      const icon  = L.divIcon({
        className: '',
        html: `<div style="
          width:14px;height:14px;border-radius:50%;
          background:${color};border:2px solid #fff;
          box-shadow:0 0 10px ${color}88;
        "></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7]
      })
      L.marker([r.lat, r.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:140px">
            <b>${r.country}</b><br/>
            <span style="color:${color};font-size:11px;font-weight:600">${r.risk.toUpperCase()} RISK</span><br/>
            <span style="color:#888;font-size:12px">${r.event}</span>
          </div>
        `)
    })

    instanceRef.current = map
    return () => { map.remove(); instanceRef.current = null }
  }, [risks])

  return (
    <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
      <div ref={mapRef} style={{ height: 380, width: '100%' }} />
      <style>{`
        .leaflet-popup-content-wrapper { background:#1C2030!important; color:#E2E8F0!important; border:1px solid rgba(255,255,255,0.1)!important; border-radius:8px!important; }
        .leaflet-popup-tip { background:#1C2030!important; }
        .leaflet-control-zoom a { background:#1C2030!important; color:#E2E8F0!important; border-color:rgba(255,255,255,0.1)!important; }
      `}</style>
    </div>
  )
}
