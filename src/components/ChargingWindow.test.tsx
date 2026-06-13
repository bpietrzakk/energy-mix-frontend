import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChargingWindow } from './ChargingWindow'
import * as api from '../api/fetchOptimalWindow'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('ChargingWindow', () => {
  it('renders the form with slider and button', () => {
    render(<ChargingWindow />)
    expect(screen.getByLabelText(/charging duration/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /find optimal window/i })).toBeInTheDocument()
  })

  it('shows result after successful fetch', async () => {
    vi.spyOn(api, 'fetchOptimalWindow').mockResolvedValue({
      from: '2026-06-13T12:00:00Z',
      to: '2026-06-13T14:00:00Z',
      cleanEnergyPercent: 85,
    })

    render(<ChargingWindow />)
    await userEvent.click(screen.getByRole('button', { name: /find optimal window/i }))

    await waitFor(() => {
      expect(screen.getByText('Optimal charging window')).toBeInTheDocument()
      expect(screen.getByText('85.0%')).toBeInTheDocument()
    })
  })

  it('shows error message on failed fetch', async () => {
    vi.spyOn(api, 'fetchOptimalWindow').mockRejectedValue(new Error('Service unavailable'))

    render(<ChargingWindow />)
    await userEvent.click(screen.getByRole('button', { name: /find optimal window/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Service unavailable')
    })
  })

  it('disables the button while loading', async () => {
    vi.spyOn(api, 'fetchOptimalWindow').mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({
        from: '2026-06-13T12:00:00Z',
        to: '2026-06-13T14:00:00Z',
        cleanEnergyPercent: 85,
      }), 100))
    )

    render(<ChargingWindow />)
    await userEvent.click(screen.getByRole('button', { name: /find optimal window/i }))

    expect(screen.getByRole('button', { name: /searching/i })).toBeDisabled()
  })
})
