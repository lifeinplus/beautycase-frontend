import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockTrainings } from '../../../api/__mocks__/questionnairesApi'
import { TrainingQuestionnaireTable } from './TrainingQuestionnaireTable'

vi.mock('@/shared/components/table/table/Table')
vi.mock('@/shared/components/table/table-row/TableRow')
vi.mock('@/shared/utils/date/formatDate')

describe('TrainingQuestionnaireTable', () => {
    it('renders the table headers correctly', () => {
        render(<TrainingQuestionnaireTable data={mockTrainings} />)

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
        render(<TrainingQuestionnaireTable data={mockTrainings} />)

        const dates = screen.getAllByText('2025.04.10')
        const time = screen.getAllByText('14:30')

        expect(dates).toHaveLength(2)
        expect(time).toHaveLength(2)

        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('City 1')).toBeInTheDocument()
        expect(screen.getByText('30')).toBeInTheDocument()
    })
})
