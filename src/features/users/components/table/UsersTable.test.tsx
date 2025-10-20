import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockUser1, mockUsers } from '../../api/__mocks__/usersApi'
import { UsersTable } from './UsersTable'

vi.mock('@/shared/utils/date/formatDate')

describe('UsersTable', () => {
    it('renders the table headers correctly', () => {
        render(<UsersTable data={mockUsers} />)

        const columns = [
            'table.createdAt',
            'table.username',
            'table.role',
            'table.updatedAt',
        ]

        columns.forEach((c) => expect(screen.getByText(c)).toBeInTheDocument())
    })

    it('renders the table data correctly', () => {
        render(<UsersTable data={mockUsers} />)

        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(4)
        expect(
            screen.getByText(`account:fields.role.types.${mockUser1.role}`)
        ).toBeInTheDocument()
        expect(screen.getByText(mockUser1.username)).toBeInTheDocument()
    })
})
