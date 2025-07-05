import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import {
    renderWithProviderAndRouter,
    renderWithProviders,
} from '@/tests/mocks/wrappers'
import { selectUserId } from '@/features/auth/authSlice'
import {
    mockUseGetUserByIdQuery,
    mockUserResult,
} from '@/features/users/__mocks__/usersApi'
import { AccountPage } from '../AccountPage'

vi.mock('@/app/hooks')
vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/layout/Header')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/features/users/usersApi')
vi.mock('../../components/AccountFields')

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

        expect(screen.getByTestId('mocked-data-wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-loading')).toBeInTheDocument()
    })

    it('renders the page title and subtitle', () => {
        renderWithProviderAndRouter(<AccountPage />)

        const matchers = [
            'mocked-header',
            'mocked-hero',
            'mocked-data-wrapper',
            'mocked-account-fields',
            'mocked-nav-bar',
        ]

        matchers.forEach((m) =>
            expect(screen.getByTestId(m)).toBeInTheDocument()
        )
    })

    it('handles error state', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: false,
            error: mockError,
        })

        renderWithProviders(<AccountPage />)

        expect(screen.getByTestId('mocked-error')).toBeInTheDocument()
    })
})
