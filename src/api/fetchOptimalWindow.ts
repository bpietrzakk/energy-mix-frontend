import type { OptimalWindowResponse, ApiError } from '../types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function fetchOptimalWindow(hours: number): Promise<OptimalWindowResponse> {
  const res = await fetch(`${BASE_URL}/api/optimal-window?hours=${hours}`)

  if (!res.ok) {
    const err: ApiError = await res.json()
    throw new Error(err.error)
  }

  return res.json()
}
