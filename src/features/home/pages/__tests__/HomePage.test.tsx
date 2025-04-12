import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'

import { useAppSelector } from '../../../../app/hooks'
import { renderWithRouter } from '../../../../tests/mocks/wrappers'
import { selectRole, selectUsername } from '../../../auth/authSlice'
import { HomePage } from '../HomePage'

vi.mock('../../../auth/hooks/useAuthLogout', () => ({
    useAuthLogout: vi.fn(),
}))

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

        const title = screen.getByText('Добро пожаловать в')
        const logo = screen.getByText('Beautycase')
        const motto = screen.getByText(
            'Все ваши инструменты и продукты для макияжа в одном месте.'
        )

        expect(title).toBeInTheDocument()
        expect(logo).toBeInTheDocument()
        expect(motto).toBeInTheDocument()
    })

    it('should display login and register links when user is not logged in', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        renderWithRouter(<HomePage />)

        const login = screen.getByRole('link', { name: 'Войти' })
        const register = screen.getByRole('link', {
            name: 'зарегистрироваться',
        })

        expect(login).toBeInTheDocument()
        expect(register).toBeInTheDocument()
    })

    it('should display logout button when user is logged in', () => {
        renderWithRouter(<HomePage />)

        const text = screen.getByText(/Выполнен вход/i)
        const button = screen.getByRole('button', { name: 'Выйти' })

        expect(text).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })
})
