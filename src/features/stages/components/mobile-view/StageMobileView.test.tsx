import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import { mockStages } from '../../api/__mocks__/stagesApi'
import { StageMobileView } from './StageMobileView'

vi.mock('@/shared/utils/date/formatDate')

describe('StageMobileView', () => {
    it('renders the mobile view component with correct props', () => {
        renderWithRouter(<StageMobileView stages={mockStages} />)

        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(2)
        expect(screen.getByText('Base Makeup')).toBeInTheDocument()
    })
})
