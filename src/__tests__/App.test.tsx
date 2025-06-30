import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../app/hooks'
import { renderWithProviderAndRouter } from '../tests/mocks/wrappers'
import App from '../App'

vi.mock('../app/hooks')
vi.mock('../components/ScrollToTop')
vi.mock('../features/auth/components/PersistLogin')
vi.mock('../features/auth/components/RequireAuth')
vi.mock('../features/auth/components/RequireRole')

describe('App', () => {
    beforeEach(() => {
        document.documentElement.classList.remove('dark')
    })

    it('renders without crashing', () => {
        renderWithProviderAndRouter(<App />)

        expect(screen.getByTestId('mocked-toaster')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-scroll-to-top')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-persist-login')).toBeInTheDocument()
    })

    it('adds dark class to html element when darkMode is true', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        renderWithProviderAndRouter(<App />)

        expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('does not add dark class to html element when darkMode is false', () => {
        vi.mocked(useAppSelector).mockReturnValue(false)

        renderWithProviderAndRouter(<App />)

        expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
})
