import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ReferenceListsMobileView } from '../ReferenceListsMobileView'
import type { ReferenceList } from '../../types'

vi.mock('@/shared/components/table/MobileView')

describe('ReferenceListMobileView', () => {
    const mockReferenceLists: ReferenceList[] = [
        { id: 'brands', name: 'names.brands' },
        { id: 'stores', name: '' },
    ]

    it('renders the MobileView component with correct props', () => {
        render(<ReferenceListsMobileView data={mockReferenceLists} />)

        expect(screen.getByTestId('mocked-mobile-view')).toBeInTheDocument()
        expect(screen.getByText('names.brands')).toBeInTheDocument()
    })
})
