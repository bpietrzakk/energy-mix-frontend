import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import type { DayEnergyMix } from '../types'

const SOURCE_COLORS = {
  wind: '#4ade80',
  solar: '#facc15',
  nuclear: '#60a5fa',
  hydro: '#38bdf8',
  biomass: '#a78bfa',
} as const

const DAY_LABELS = ['Today', 'Tomorrow', 'Day after tomorrow']

interface Props {
  days: DayEnergyMix[]
}

export function EnergyMixChart({ days }: Props) {
  const data = days.map((day, i) => ({
    name: DAY_LABELS[i],
    ...day.sources,
  }))

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} unit="%" width={40} />
        <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
        <Legend />
        {(Object.keys(SOURCE_COLORS) as (keyof typeof SOURCE_COLORS)[]).map((source) => (
          <Bar key={source} dataKey={source} stackId="mix" fill={SOURCE_COLORS[source]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
