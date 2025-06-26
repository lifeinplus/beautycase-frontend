import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import {
    renderWithProviderAndRouter,
    renderWithProviders,
} from '../../../../tests/mocks/wrappers'
import { selectUserId } from '../../../auth/authSlice'
import {
    mockUseGetUserByIdQuery,
    mockUserResult,
} from '../../../users/__mocks__/usersApi'
import { AccountPage } from '../AccountPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')
vi.mock('../../../users/usersApi')

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

        renderWithProviders(<AccountPage />)

        const dataWrapper = screen.getByTestId('mocked-data-wrapper')
        const loading = screen.getByTestId('mocked-loading')

        expect(dataWrapper).toBeInTheDocument()
        expect(loading).toBeInTheDocument()
    })

    it('renders the page title and subtitle', () => {
        renderWithProviderAndRouter(<AccountPage />)

        const header = screen.getByTestId('mocked-header')
        const hero = screen.getByTestId('mocked-hero')
        const dataWrapper = screen.getByTestId('mocked-data-wrapper')
        const navBar = screen.getByTestId('mocked-nav-bar')

        expect(header).toBeInTheDocument()
        expect(hero).toBeInTheDocument()
        expect(dataWrapper).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()
    })

    it('renders user data correctly', () => {
        renderWithProviderAndRouter(<AccountPage />)

        expect(screen.getByText('fields.username.label')).toBeInTheDocument()
        expect(
            screen.getByText(mockUserResult.user.username)
        ).toBeInTheDocument()

        expect(screen.getByText('fields.role.label')).toBeInTheDocument()
        expect(screen.getByText(mockUserResult.user.role)).toBeInTheDocument()
    })

    it('renders makeup bags section with a link', () => {
        renderWithProviderAndRouter(<AccountPage />)

        expect(screen.getByText('fields.beautyBags.label')).toBeInTheDocument()
        expect(screen.getByText('Daily Makeup')).toBeInTheDocument()
        expect(screen.getByText('Evening Makeup')).toBeInTheDocument()

        const links = screen.getAllByRole('link', {
            name: 'fields.beautyBags.link',
        })

        expect(links).toHaveLength(2)
        expect(links[0]).toHaveAttribute('href', '/makeup_bags/makeupBag1')
        expect(links[1]).toHaveAttribute('href', '/makeup_bags/makeupBag2')
    })

    it('handles empty makeup bags', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: { ...mockUserResult, makeupBags: [] },
            isLoading: false,
            error: null,
        })

        renderWithProviders(<AccountPage />)

        expect(
            screen.getByText('fields.beautyBags.emptyMessage')
        ).toBeInTheDocument()
    })

    it('handles empty lessons', () => {
        renderWithProviderAndRouter(<AccountPage />)

        expect(
            screen.getByText('fields.lessons.emptyMessage')
        ).toBeInTheDocument()
    })

    it('handles error state', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: false,
            error: 'User not found',
        })

        renderWithProviders(<AccountPage />)

        const error = screen.getByTestId('mocked-error')
        expect(error).toBeInTheDocument()
    })
})
