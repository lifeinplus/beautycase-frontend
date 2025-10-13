import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { ReferenceList } from '../../types'
import { ReferenceListsTable } from './ReferenceListsTable'

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
