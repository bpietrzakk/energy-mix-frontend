import type { DayEnergyMix } from '../types'
import { DAY_LABELS } from '../utils/dayLabels'

interface Props {
  days: DayEnergyMix[]
}

export function CleanEnergyBar({ days }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {days.map((day, i) => (
        <div key={day.date}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, fontWeight: 500 }}>
            <span>{DAY_LABELS[i]}</span>
            <span>{day.cleanEnergyPercent.toFixed(1)}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: 12,
              borderRadius: 6,
              background: '#e5e7eb',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${day.cleanEnergyPercent}%`,
                height: '100%',
                borderRadius: 6,
                background: 'linear-gradient(90deg, #4ade80, #22c55e)',
                transition: 'width 0.4s ease-out',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
