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

        expect(screen.getByText('Дата')).toBeInTheDocument()
        expect(screen.getByText('Время')).toBeInTheDocument()
        expect(screen.getByText('Категория')).toBeInTheDocument()
        expect(screen.getByText('Клиент')).toBeInTheDocument()
    })

    it('renders the table data correctly', () => {
        render(<MakeupBagTable makeupBags={mockMakeupBags} />)

        const dates = screen.getAllByText('2025.04.10')
        const time = screen.getAllByText('14:30')

        expect(dates).toHaveLength(2)
        expect(time).toHaveLength(2)

        const category = screen.getByText('Test Category 1')
        const client = screen.getByText('Test Client 1')

        expect(category).toBeInTheDocument()
        expect(client).toBeInTheDocument()
    })
})
