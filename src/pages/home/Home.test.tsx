import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { Home } from './Home'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/hooks/useAuthLogout')
vi.mock('@/features/home/components/HomeTile')
vi.mock('@/shared/components/ui/LanguageSelect')

describe('Home', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })
    })

    it('renders title, logo and motto', () => {
        renderWithRouter(<Home />)

        expect(screen.getByText('Beautycase')).toBeInTheDocument()
        expect(screen.getByText('motto')).toBeInTheDocument()
    })

    it('should display login and register links when user is not logged in', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        renderWithRouter(<Home />)

        expect(
            screen.getByRole('link', { name: 'link.login' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('link', {
                name: 'link.register',
            })
        ).toBeInTheDocument()
    })

    it('should display logout button when user is logged in', () => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'client'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        renderWithRouter(<Home />)

        expect(screen.getByText(/auth.loggedIn/i)).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: 'auth.logout' })
        ).toBeInTheDocument()
    })
})
