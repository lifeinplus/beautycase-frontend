import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { StartupProgress } from './StartupProgress'

describe('StartupProgress', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('renders initial state correctly', () => {
        render(<StartupProgress />)

        expect(screen.getByText(/0%/)).toBeInTheDocument()
        expect(screen.getByText(/Запуск сервера/i)).toBeInTheDocument()
        expect(screen.getByText(/Server is starting up/i)).toBeInTheDocument()
    })

    it('increments progress over time', () => {
        render(<StartupProgress />)

        expect(screen.getByText(/0%/)).toBeInTheDocument()

        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(screen.getByText(/3%/)).toBeInTheDocument()

        act(() => {
            vi.advanceTimersByTime(9000)
        })
        expect(screen.getByText(/33%/)).toBeInTheDocument()
    })

    it('caps progress at 100%', () => {
        render(<StartupProgress />)

        act(() => {
            vi.advanceTimersByTime(40000)
        })

        expect(screen.getByText(/100%/)).toBeInTheDocument()
    })

    it('cleans up interval on unmount', () => {
        const { unmount } = render(<StartupProgress />)

        const clearSpy = vi.spyOn(global, 'clearInterval')

        unmount()

        expect(clearSpy).toHaveBeenCalled()
    })
})
