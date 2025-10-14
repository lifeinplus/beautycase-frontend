import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import type { ReferenceList } from '../../types'
import { ReferenceListsMobileView } from './ReferenceListsMobileView'

describe('ReferenceListMobileView', () => {
    const mockReferenceLists: ReferenceList[] = [
        { id: 'brands', name: 'names.brands' },
        { id: 'stores', name: '' },
    ]

    it('renders the mobile view component with correct props', () => {
        renderWithRouter(<ReferenceListsMobileView data={mockReferenceLists} />)
        expect(screen.getByText('names.brands')).toBeInTheDocument()
    })
})
