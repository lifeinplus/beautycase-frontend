import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockMakeupBags } from '../../api/__mocks__/makeupBagsApi'
import { MakeupBagTable } from './MakeupBagTable'

vi.mock('@/shared/utils/date/formatDate')

describe('MakeupBagTable', () => {
    it('renders the table headers correctly', () => {
        render(<MakeupBagTable makeupBags={mockMakeupBags} />)

        const columns = [
            'table.date',
            'table.time',
            'table.category',
            'table.clientName',
        ]

        columns.forEach((c) => expect(screen.getByText(c)).toBeInTheDocument())
    })

    it('renders the table data correctly', () => {
        render(<MakeupBagTable makeupBags={mockMakeupBags} />)

        expect(screen.getAllByText('2025.04.10')).toHaveLength(2)
        expect(screen.getAllByText('14:30')).toHaveLength(2)

        expect(screen.getByText('categories.basic.short')).toBeInTheDocument()
        expect(screen.getByText('Test Client 1')).toBeInTheDocument()
    })
})
