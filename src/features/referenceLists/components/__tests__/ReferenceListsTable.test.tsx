import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import type { ReferenceList } from '../../types'
import { ReferenceListsTable } from '../ReferenceListsTable'

vi.mock('../../../../components/table/Table')
vi.mock('../../../../components/table/TableRow')

describe('ReferenceListsTable', () => {
    const data: ReferenceList[] = [
        { id: 'brands', name: 'Бренды' },
        { id: 'stores', name: 'Магазины' },
    ]

    it('renders the table headers correctly', () => {
        render(<ReferenceListsTable data={data} />)
        expect(screen.getByText('Справочник')).toBeInTheDocument()
    })

    it('renders the table data correctly', () => {
        render(<ReferenceListsTable data={data} />)
        expect(screen.getByText('Бренды')).toBeInTheDocument()
        expect(screen.getByText('Магазины')).toBeInTheDocument()
    })
})
