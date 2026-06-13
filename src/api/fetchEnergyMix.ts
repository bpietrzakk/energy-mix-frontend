import type { EnergyMixResponse, ApiError } from '../types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export async function fetchEnergyMix(): Promise<EnergyMixResponse> {
  const res = await fetch(`${BASE_URL}/api/energy-mix`)

  if (!res.ok) {
    const err: ApiError = await res.json()
    throw new Error(err.error)
  }

  return res.json()
}
