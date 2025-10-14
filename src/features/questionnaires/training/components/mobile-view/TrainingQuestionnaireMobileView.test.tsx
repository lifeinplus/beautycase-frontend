import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import { mockTrainingQuestionnaires } from '../../../api/__mocks__/questionnairesApi'
import { TrainingQuestionnaireMobileView } from './TrainingQuestionnaireMobileView'

vi.mock('@/shared/utils/date/formatDate')

describe('TrainingQuestionnaireMobileView', () => {
    it('renders the mobile view component with correct props', () => {
        renderWithRouter(
            <TrainingQuestionnaireMobileView
                data={mockTrainingQuestionnaires}
            />
        )

        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(2)
        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('@client1')).toBeInTheDocument()
    })
})
