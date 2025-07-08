import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockCategory1 } from '@/features/categories/__mocks__/categoriesApi'
import { mockMakeupBags } from '../../__mocks__/makeupBagsApi'
import { MakeupBagMobileView } from '../MakeupBagMobileView'

vi.mock('@/shared/components/table/MobileView')
vi.mock('@/shared/utils/date')

describe('MakeupBagMobileView', () => {
    it('renders the MobileView component with correct props', () => {
        render(<MakeupBagMobileView makeupBags={mockMakeupBags} />)

        expect(screen.getByTestId('mocked-mobile-view')).toBeInTheDocument()
        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(2)
        expect(screen.getByText('Test Client 1')).toBeInTheDocument()

        expect(
            screen.getByText(`categories.${mockCategory1.name}.short`)
        ).toBeInTheDocument()
    })
})
