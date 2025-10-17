import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import {
    mockUser1,
    mockUser2,
    mockUsers,
} from '@/features/users/api/__mocks__/usersApi'
import { useGetAllUsersQuery } from '@/features/users/api/usersApi'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { UsersList } from './UsersList'

vi.mock('@/features/users/api/usersApi')
vi.mock('@/shared/components/layout/header/Header')

describe('UsersList', () => {
    beforeEach(() => {
        vi.mocked(useGetAllUsersQuery as Mock).mockReturnValue({
            data: mockUsers,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        renderWithRouter(<UsersList />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByText(/hero.headline/)).toBeInTheDocument()
    })

    it('renders page components and list views', async () => {
        renderWithRouter(<UsersList />)
        expect(screen.getAllByText(mockUser1.username)).toHaveLength(2)
        expect(screen.getAllByText(mockUser2.username)).toHaveLength(2)
    })
})
