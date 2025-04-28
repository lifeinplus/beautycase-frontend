import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockQuestionnaires } from '../../__mocks__/questionnaireApiSlice'
import { QuestionnaireTable } from '../QuestionnaireTable'

vi.mock('../../../../components/table/Table')
vi.mock('../../../../components/table/TableRow')
vi.mock('../../../../utils/date')

describe('QuestionnaireTable', () => {
    it('renders the table headers correctly', () => {
        render(<QuestionnaireTable questionnaires={mockQuestionnaires} />)

        expect(screen.getByText('Дата')).toBeInTheDocument()
        expect(screen.getByText('Время')).toBeInTheDocument()
        expect(screen.getByText('Имя клиента')).toBeInTheDocument()
        expect(screen.getByText('Возраст')).toBeInTheDocument()
        expect(screen.getByText('Город')).toBeInTheDocument()
    })

    it('renders makeup bag data correctly', () => {
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
