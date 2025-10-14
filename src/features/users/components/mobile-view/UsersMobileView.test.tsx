import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import { mockUser1, mockUsers } from '../../api/__mocks__/usersApi'
import { UsersMobileView } from './UsersMobileView'

vi.mock('@/shared/utils/date/formatDate')

describe('UsersMobileView', () => {
    it('renders the mobile view component with correct props', () => {
        renderWithRouter(<UsersMobileView data={mockUsers} />)

        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(2)
        expect(screen.getByText('Alice')).toBeInTheDocument()
        expect(
            screen.getByText(`account:fields.role.types.${mockUser1.role}`)
        ).toBeInTheDocument()
    })
})
