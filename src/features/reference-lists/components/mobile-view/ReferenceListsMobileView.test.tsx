import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { ReferenceList } from '../../types'
import { ReferenceListsMobileView } from './ReferenceListsMobileView'

vi.mock('@/shared/components/table/mobile-view/MobileView')

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
