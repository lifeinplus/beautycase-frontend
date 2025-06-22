import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockMakeupBags } from '../../__mocks__/makeupBagsApi'
import { MakeupBagTable } from '../MakeupBagTable'

vi.mock('../../../../components/table/Table')
vi.mock('../../../../components/table/TableRow')
vi.mock('../../../../utils/date')

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

        expect(screen.getByText('Test Category 1')).toBeInTheDocument()
        expect(screen.getByText('Test Client 1')).toBeInTheDocument()
    })
})
