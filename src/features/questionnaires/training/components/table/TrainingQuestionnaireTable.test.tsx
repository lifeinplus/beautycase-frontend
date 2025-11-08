import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '@/tests/mocks/wrappers'
import { mockTrainingQuestionnaires } from '../../../api/__mocks__/questionnairesApi'
import { TrainingQuestionnaireTable } from './TrainingQuestionnaireTable'

vi.mock('@/shared/utils/date/formatDate')

describe('TrainingQuestionnaireTable', () => {
    it('renders the table headers correctly', () => {
        renderWithProviders(
            <TrainingQuestionnaireTable data={mockTrainingQuestionnaires} />
        )

        const headers = [
            'training.table.date',
            'training.table.time',
            'training.table.clientName',
            'training.table.contact',
        ]

        headers.forEach((header) =>
            expect(screen.getByText(header)).toBeInTheDocument()
        )
    })

    it('renders the table data correctly', () => {
        renderWithProviders(
            <TrainingQuestionnaireTable data={mockTrainingQuestionnaires} />
        )

        const dates = screen.getAllByText('2025.04.10')
        const time = screen.getAllByText('14:30')

        expect(dates).toHaveLength(2)
        expect(time).toHaveLength(2)

        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('@client1')).toBeInTheDocument()
    })
})
