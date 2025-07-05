import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockQuestionnaires } from '../../__mocks__/questionnairesApi'
import { QuestionnaireTable } from '../QuestionnaireTable'

vi.mock('../../../../shared/components/table/Table')
vi.mock('../../../../shared/components/table/TableRow')
vi.mock('../../../../shared/utils/date')

describe('QuestionnaireTable', () => {
    it('renders the table headers correctly', () => {
        render(<QuestionnaireTable questionnaires={mockQuestionnaires} />)

        const headers = [
            'table.date',
            'table.time',
            'table.clientName',
            'table.age',
            'table.city',
        ]

        headers.forEach((header) =>
            expect(screen.getByText(header)).toBeInTheDocument()
        )
    })

    it('renders the table data correctly', () => {
        render(<QuestionnaireTable questionnaires={mockQuestionnaires} />)

        const dates = screen.getAllByText('2025.04.10')
        const time = screen.getAllByText('14:30')

        expect(dates).toHaveLength(2)
        expect(time).toHaveLength(2)

        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('City 1')).toBeInTheDocument()
        expect(screen.getByText('30')).toBeInTheDocument()
    })
})
