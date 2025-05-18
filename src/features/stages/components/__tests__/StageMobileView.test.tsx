import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockStages } from '../../__mocks__/stagesApi'
import { StageMobileView } from '../StageMobileView'

vi.mock('../../../../components/table/MobileView')
vi.mock('../../../../utils/date')

describe('StageMobileView', () => {
    it('renders the MobileView component with correct props', () => {
        render(<StageMobileView stages={mockStages} />)

        const mobileView = screen.getByTestId('mocked-mobile-view')
        const dates = screen.getAllByText('2025.04.10 14:30')
        const title = screen.getByText('Base Makeup')

        expect(mobileView).toBeInTheDocument()
        expect(dates).toHaveLength(2)
        expect(title).toBeInTheDocument()
    })
})
