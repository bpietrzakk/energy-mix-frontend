import { useState } from 'react'
import { fetchOptimalWindow } from '../api/fetchOptimalWindow'
import type { OptimalWindowResponse } from '../types'

export function ChargingWindow() {
  const [hours, setHours] = useState(2)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<OptimalWindowResponse | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await fetchOptimalWindow(hours)
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label
            htmlFor="hours"
            style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}
          >
            Charging duration (hours): <strong>{hours}</strong>
          </label>
          <input
            id="hours"
            type="range"
            min={1}
            max={6}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', minHeight: 44 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280' }}>
            <span>1h</span>
            <span>6h</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 8,
            border: 'none',
            background: loading ? '#9ca3af' : '#22c55e',
            color: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'background 0.2s, opacity 0.2s',
            minHeight: 44,
          }}
        >
          {loading ? 'Searching...' : 'Find optimal window'}
        </button>

        {error && (
          <p role="alert" style={{ margin: 0, color: '#dc2626', fontSize: 14 }}>
            {error}
          </p>
        )}
      </form>

      {result && (
        <div
          style={{
            marginTop: 24,
            padding: 20,
            borderRadius: 12,
            background: '#f0fdf4',
            border: '1px solid #86efac',
          }}
        >
          <p style={{ margin: '0 0 12px', fontWeight: 700, fontSize: 16, color: '#15803d' }}>
            Optimal charging window
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Start</span>
              <span style={{ fontWeight: 500 }}>
                {new Date(result.from).toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>End</span>
              <span style={{ fontWeight: 500 }}>
                {new Date(result.to).toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #86efac', paddingTop: 8, marginTop: 4 }}>
              <span style={{ color: '#6b7280' }}>Clean energy</span>
              <span style={{ fontWeight: 700, color: '#15803d' }}>
                {result.cleanEnergyPercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
