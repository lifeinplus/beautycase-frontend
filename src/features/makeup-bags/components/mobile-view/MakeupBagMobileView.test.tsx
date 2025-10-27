import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockCategory1 } from '@/features/categories/api/__mocks__/categoriesApi'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { mockMakeupBags } from '../../api/__mocks__/makeupBagsApi'
import { MakeupBagMobileView } from './MakeupBagMobileView'

vi.mock('@/shared/utils/date/formatDate')

describe('MakeupBagMobileView', () => {
    it('renders the mobile view component with correct props', () => {
        renderWithRouter(<MakeupBagMobileView makeupBags={mockMakeupBags} />)

        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(2)
        expect(screen.getByText('Test Client 1')).toBeInTheDocument()
        expect(
            screen.getByText(`categories.${mockCategory1.name}.short`)
        ).toBeInTheDocument()
    })
})
