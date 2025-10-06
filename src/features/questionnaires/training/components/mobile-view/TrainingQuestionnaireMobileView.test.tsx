import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockTrainingQuestionnaires } from '../../../api/__mocks__/questionnairesApi'
import { TrainingQuestionnaireMobileView } from './TrainingQuestionnaireMobileView'

vi.mock('@/shared/components/table/mobile-view/MobileView')
vi.mock('@/shared/utils/date/formatDate')

describe('TrainingQuestionnaireMobileView', () => {
    it('renders the MobileView component with correct props', () => {
        render(
            <TrainingQuestionnaireMobileView
                data={mockTrainingQuestionnaires}
            />
        )

        expect(screen.getByTestId('mocked-mobile-view')).toBeInTheDocument()
        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(2)
        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('@client1')).toBeInTheDocument()
    })
})
