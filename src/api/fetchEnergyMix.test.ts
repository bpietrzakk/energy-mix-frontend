import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchEnergyMix } from './fetchEnergyMix'

const mockResponse = {
  days: [
    { date: '2026-06-13', sources: { wind: 50, solar: 15, nuclear: 10, hydro: 2, biomass: 3 }, cleanEnergyPercent: 80 },
    { date: '2026-06-14', sources: { wind: 30, solar: 20, nuclear: 10, hydro: 1, biomass: 4 }, cleanEnergyPercent: 65 },
    { date: '2026-06-15', sources: { wind: 20, solar: 22, nuclear: 11, hydro: 0, biomass: 7 }, cleanEnergyPercent: 60 },
  ],
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('fetchEnergyMix', () => {
  it('returns parsed data on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    }))

    const result = await fetchEnergyMix()
    expect(result.days).toHaveLength(3)
    expect(result.days[0].cleanEnergyPercent).toBe(80)
  })

  it('throws with API error message on non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ timestamp: '', status: 500, error: 'Server error' }),
    }))

    await expect(fetchEnergyMix()).rejects.toThrow('Server error')
  })
})
