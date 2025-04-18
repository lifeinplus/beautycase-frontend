import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAppSelector } from '../../../../app/hooks'
import { mockUserResult } from '../../../../tests/mocks/handlers/usersHandlers'
import {
    renderWithProvider,
    renderWithProviderAndRouter,
} from '../../../../tests/mocks/wrappers'
import { selectUserId } from '../../../auth/authSlice'
import { AccountPage } from '../AccountPage'

const mockUseGetUserByIdQuery = vi.fn()

vi.mock('../../../users/usersApiSlice', async () => ({
    useGetUserByIdQuery: () => mockUseGetUserByIdQuery(),
}))

describe('AccountPage', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectUserId) return 'user123'
            return null
        })
        mockUseGetUserByIdQuery.mockReturnValue({
            data: mockUserResult,
            isLoading: false,
            error: null,
        })
    })

    it('renders loading state correctly', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        })

        renderWithProvider(<AccountPage />)

        expect(screen.getByText('Личный кабинет')).toBeInTheDocument()
        expect(screen.getByText('Загрузка...')).toBeInTheDocument()
    })

    it('renders the page title and subtitle', () => {
        renderWithProviderAndRouter(<AccountPage />)

        expect(
            screen.getByRole('heading', { level: 2, name: 'Личный кабинет' })
        ).toBeInTheDocument()

        expect(
            screen.getByText('Сведения о вас и доступный контент')
        ).toBeInTheDocument()
    })

    it('renders user data correctly', () => {
        renderWithProviderAndRouter(<AccountPage />)

        expect(screen.getByText('Имя пользователя')).toBeInTheDocument()
        expect(
            screen.getByText(mockUserResult.user.username)
        ).toBeInTheDocument()

        expect(screen.getByText('Роль')).toBeInTheDocument()
        expect(screen.getByText(mockUserResult.user.role)).toBeInTheDocument()
    })

    it('renders makeup bags section with a link', () => {
        renderWithProviderAndRouter(<AccountPage />)

        expect(screen.getByText('Косметички')).toBeInTheDocument()
        expect(screen.getByText('Daily Makeup')).toBeInTheDocument()
        expect(screen.getByText('Evening Makeup')).toBeInTheDocument()

        const links = screen.getAllByRole('link', { name: 'Открыть' })
        expect(links).toHaveLength(2)
        expect(links[0]).toHaveAttribute('href', `/makeup_bags/1`)
        expect(links[1]).toHaveAttribute('href', `/makeup_bags/2`)
    })

    it('handles empty makeup bags', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: { ...mockUserResult, makeupBags: [] },
            isLoading: false,
            error: null,
        })

        renderWithProvider(<AccountPage />)

        expect(
            screen.getByText('У вас нет доступных косметичек')
        ).toBeInTheDocument()
    })

    it('handles empty lessons', () => {
        renderWithProviderAndRouter(<AccountPage />)

        expect(
            screen.getByText('У вас нет доступных уроков')
        ).toBeInTheDocument()
    })

    it('handles error state', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: false,
            error: 'User not found',
        })

        renderWithProvider(<AccountPage />)

        expect(
            screen.getByText('An unknown error occurred')
        ).toBeInTheDocument()
    })
})
