import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ReferenceListsMobileView } from '../ReferenceListsMobileView'
import type { ReferenceList } from '../../types'

vi.mock('../../../../components/table/MobileView')

describe('ReferenceListMobileView', () => {
    const mockReferenceLists: ReferenceList[] = [
        { id: 'brands', name: 'Бренды' },
        { id: 'stores', name: '' },
    ]

    it('renders the MobileView component with correct props', () => {
        render(<ReferenceListsMobileView data={mockReferenceLists} />)

        const mobileView = screen.getByTestId('mocked-mobile-view')
        const title = screen.getByText('Бренды')

        expect(mobileView).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })
})
