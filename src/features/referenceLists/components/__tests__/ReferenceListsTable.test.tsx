import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import type { ReferenceList } from '../../types'
import { ReferenceListsTable } from '../ReferenceListsTable'

vi.mock('@/shared/components/table/Table')
vi.mock('@/shared/components/table/TableRow')

describe('ReferenceListsTable', () => {
    const data: ReferenceList[] = [
        { id: 'brands', name: 'Brands' },
        { id: 'stores', name: 'Stores' },
    ]

    it('renders the table headers correctly', () => {
        render(<ReferenceListsTable data={data} />)
        expect(screen.getByText('table.referenceList')).toBeInTheDocument()
    })

    it('renders the table data correctly', () => {
        render(<ReferenceListsTable data={data} />)
        expect(screen.getByText('Brands')).toBeInTheDocument()
        expect(screen.getByText('Stores')).toBeInTheDocument()
    })
})
