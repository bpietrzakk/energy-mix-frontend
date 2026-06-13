import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CleanEnergyBar } from './CleanEnergyBar'
import type { DayEnergyMix } from '../types'

const days: DayEnergyMix[] = [
  { date: '2026-06-13', sources: { wind: 50, solar: 15, nuclear: 10, hydro: 2, biomass: 3 }, cleanEnergyPercent: 80 },
  { date: '2026-06-14', sources: { wind: 30, solar: 20, nuclear: 10, hydro: 1, biomass: 4 }, cleanEnergyPercent: 65.9 },
  { date: '2026-06-15', sources: { wind: 20, solar: 22, nuclear: 11, hydro: 0, biomass: 7 }, cleanEnergyPercent: 60 },
]

describe('CleanEnergyBar', () => {
  it('renders a bar for each day', () => {
    render(<CleanEnergyBar days={days} />)
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('Tomorrow')).toBeInTheDocument()
    expect(screen.getByText('In 2 days')).toBeInTheDocument()
  })

  it('displays formatted percentage values', () => {
    render(<CleanEnergyBar days={days} />)
    expect(screen.getByText('80.0%')).toBeInTheDocument()
    expect(screen.getByText('65.9%')).toBeInTheDocument()
    expect(screen.getByText('60.0%')).toBeInTheDocument()
  })
})
