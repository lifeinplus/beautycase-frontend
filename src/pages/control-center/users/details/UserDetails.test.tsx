import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
    mockUserResult,
    useGetUserByIdQuery,
} from '@/features/users/api/__mocks__/usersApi'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { UserDetails } from './UserDetails'

vi.mock('@/features/users/api/usersApi')
vi.mock('@/shared/components/layout/header/Header')
vi.mock('./hooks/useUserDetailsActions')

describe('UserDetails', () => {
    beforeEach(() => {
        useGetUserByIdQuery.mockReturnValue({
            data: mockUserResult,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        renderWithRouter(<UserDetails />)

        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(
            screen.getByText(mockUserResult.user.username)
        ).toBeInTheDocument()
    })

    it('renders the page with no data', () => {
        useGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        })

        renderWithRouter(<UserDetails />)

        expect(screen.getAllByText('— —')).toHaveLength(2)
    })
})
