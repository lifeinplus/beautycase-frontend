import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockCategory1 } from '@/features/categories/api/__mocks__/categoriesApi'
import { fullName } from '@/shared/utils/ui/fullName'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import {
    mockMakeupBag1,
    mockMakeupBags,
} from '../../api/__mocks__/makeupBagsApi'
import { MakeupBagMobileView } from './MakeupBagMobileView'

vi.mock('@/shared/utils/date/formatDate')

describe('MakeupBagMobileView', () => {
    it('renders the mobile view component with correct props', () => {
        renderWithRouter(<MakeupBagMobileView makeupBags={mockMakeupBags} />)

        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(2)

        expect(
            screen.getByText(
                fullName(
                    mockMakeupBag1.client?.firstName,
                    mockMakeupBag1.client?.lastName
                )
            )
        ).toBeInTheDocument()

        expect(
            screen.getByText(`categories.${mockCategory1.name}.short`)
        ).toBeInTheDocument()
    })
})
