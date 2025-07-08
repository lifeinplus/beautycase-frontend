import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { mockQuestionnaires } from '../../__mocks__/questionnairesApi'
import { QuestionnaireMobileView } from '../QuestionnaireMobileView'

vi.mock('@/shared/components/table/MobileView')
vi.mock('@/shared/utils/date')

describe('QuestionnaireMobileView', () => {
    it('renders the MobileView component with correct props', () => {
        render(<QuestionnaireMobileView questionnaires={mockQuestionnaires} />)

        const mobileView = screen.getByTestId('mocked-mobile-view')
        const dates = screen.getAllByText('2025.04.10 14:30')
        const title = screen.getByText('Client 1')
        const subtitle = screen.getByText('City 1')

        expect(mobileView).toBeInTheDocument()
        expect(dates).toHaveLength(2)
        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
    })
})
