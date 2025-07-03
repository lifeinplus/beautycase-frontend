import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'

import { useAppSelector } from '../../../../app/hooks'
import { renderWithRouter } from '../../../../tests/mocks/wrappers'
import { selectRole, selectUsername } from '../../../auth/authSlice'
import { HomePage } from '../HomePage'

vi.mock('../../../../app/hooks')
vi.mock('../../../auth/hooks/useAuthLogout')
vi.mock('../../components/HomeButton')

describe('HomePage', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })
    })

    it('renders title, logo and motto', () => {
        renderWithRouter(<HomePage />)

        expect(screen.getByText('Beautycase')).toBeInTheDocument()
        expect(screen.getByText('motto')).toBeInTheDocument()
    })

    it('should display login and register links when user is not logged in', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        renderWithRouter(<HomePage />)

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
        renderWithRouter(<HomePage />)

        expect(screen.getByText(/auth.loggedIn/i)).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: 'auth.logout' })
        ).toBeInTheDocument()
    })
})
