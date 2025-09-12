import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockQuestionnaires } from '../../api/__mocks__/questionnairesApi'
import { QuestionnaireMobileView } from './QuestionnaireMobileView'

vi.mock('@/shared/components/table/mobile-view/MobileView')
vi.mock('@/shared/utils/date/formatDate')

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
