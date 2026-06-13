import { useState, useEffect } from 'react'
import { fetchEnergyMix } from './api/fetchEnergyMix'
import { EnergyMixChart } from './components/EnergyMixChart'
import { CleanEnergyBar } from './components/CleanEnergyBar'
import { ChargingWindow } from './components/ChargingWindow'
import type { EnergyMixResponse } from './types'

const containerStyle: React.CSSProperties = {
  maxWidth: 860,
  margin: '0 auto',
  padding: '24px 24px 64px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#111827',
  lineHeight: 1.6,
}

const sectionStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
}

const h2Style: React.CSSProperties = {
  margin: '0 0 20px',
  fontSize: 18,
  fontWeight: 700,
  color: '#1f2937',
}

const skeletonStyle: React.CSSProperties = {
  height: 320,
  borderRadius: 8,
  background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.4s infinite',
}

export default function App() {
  const [data, setData] = useState<EnergyMixResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEnergyMix()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <main style={containerStyle}>
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: '#111827' }}>
            UK Energy Mix
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: '#6b7280' }}>
            48-hour forecast · clean energy tracker
          </p>
        </header>

        <section style={sectionStyle} aria-labelledby="forecast-heading">
          <h2 id="forecast-heading" style={h2Style}>Energy mix forecast</h2>

          {loading && <div style={skeletonStyle} aria-label="Loading chart..." />}

          {error && (
            <p role="alert" style={{ color: '#dc2626', margin: 0 }}>
              {error}
            </p>
          )}

          {data && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <EnergyMixChart days={data.days} />
              <CleanEnergyBar days={data.days} />
            </div>
          )}
        </section>

        <section style={sectionStyle} aria-labelledby="charger-heading">
          <h2 id="charger-heading" style={h2Style}>EV charging optimizer</h2>
          <ChargingWindow />
        </section>
      </main>
    </>
  )
}
