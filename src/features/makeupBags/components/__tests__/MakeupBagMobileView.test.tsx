import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { mockMakeupBags } from '../../__mocks__/makeupBagsApi'
import { MakeupBagMobileView } from '../MakeupBagMobileView'

vi.mock('../../../../components/table/MobileView')
vi.mock('../../../../utils/date')

describe('MakeupBagMobileView', () => {
    it('renders the MobileView component with correct props', () => {
        render(<MakeupBagMobileView makeupBags={mockMakeupBags} />)

        const mobileView = screen.getByTestId('mocked-mobile-view')
        const dates = screen.getAllByText('2025.04.10 14:30')
        const title = screen.getByText('Test Client 1')
        const subtitle = screen.getByText('Test Category 1')

        expect(mobileView).toBeInTheDocument()
        expect(dates).toHaveLength(2)
        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
    })
})
