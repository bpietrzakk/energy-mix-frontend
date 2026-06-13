export interface EnergySource {
  wind: number
  solar: number
  nuclear: number
  hydro: number
  biomass: number
}

export interface DayEnergyMix {
  date: string
  sources: EnergySource
  cleanEnergyPercent: number
}

export interface EnergyMixResponse {
  days: DayEnergyMix[]
}

export interface OptimalWindowResponse {
  from: string
  to: string
  cleanEnergyPercent: number
}

export interface ApiError {
  timestamp: string
  status: number
  error: string
}
