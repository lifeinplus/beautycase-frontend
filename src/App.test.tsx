import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import App from './App'
import { useAppSelector } from './app/hooks/hooks'
import { renderWithProviderAndRouter } from './tests/mocks/wrappers'

vi.mock('./app/hooks/hooks')
vi.mock('./features/auth/components/persist-login/PersistLogin')
vi.mock('./features/auth/components/require-auth/RequireAuth')
vi.mock('./features/auth/components/require-role/RequireRole')
vi.mock('./shared/components/common/scroll-to-top/ScrollToTop')

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
