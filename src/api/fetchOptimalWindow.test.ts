import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchOptimalWindow } from './fetchOptimalWindow'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('fetchOptimalWindow', () => {
  it('returns window data on success', async () => {
    const mockWindow = { from: '2026-06-13T12:00Z', to: '2026-06-13T14:00Z', cleanEnergyPercent: 85 }

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWindow),
    }))

    const result = await fetchOptimalWindow(2)
    expect(result.cleanEnergyPercent).toBe(85)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('hours=2'))
  })

  it('throws with API error message on non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ timestamp: '', status: 400, error: "Parametr 'hours' musi być liczbą od 1 do 6" }),
    }))

    await expect(fetchOptimalWindow(99)).rejects.toThrow("Parametr 'hours' musi być liczbą od 1 do 6")
  })
})
