import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { selectUserId } from '@/features/auth/slice/authSlice'
import {
    mockUserResult,
    useGetUserByIdQuery,
} from '@/features/users/api/__mocks__/usersApi'
import { Account } from '@/pages/account/Account'
import { mockError } from '@/tests/mocks'
import {
    renderWithProviderAndRouter,
    renderWithProviders,
} from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/account/components/fields/AccountFields')
vi.mock('@/features/users/api/usersApi')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')
vi.mock('@/shared/components/layout/header/Header')

describe('Account', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectUserId) return 'user123'
            return null
        })

        useGetUserByIdQuery.mockReturnValue({
            data: mockUserResult,
            isLoading: false,
            error: null,
        })
    })

    it('renders loading state correctly', () => {
        useGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        })

        renderWithProviders(<Account />)

        expect(screen.getByText('loading')).toBeInTheDocument()
    })

    it('renders the page title and subtitle', () => {
        renderWithProviderAndRouter(<Account />)

        const matchers = ['mocked-header', 'mocked-account-fields']

        matchers.forEach((m) =>
            expect(screen.getByTestId(m)).toBeInTheDocument()
        )

        expect(screen.getByText(/hero.headline/)).toBeInTheDocument()
        expect(screen.getByText(/hero.byline/)).toBeInTheDocument()
    })

    it('handles error state', () => {
        useGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: false,
            error: mockError,
        })

        renderWithProviders(<Account />)

        expect(screen.getByText('UNKNOWN_ERROR')).toBeInTheDocument()
    })
})
