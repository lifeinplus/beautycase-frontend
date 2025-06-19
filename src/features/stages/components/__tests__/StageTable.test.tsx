import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockStage1, mockStages } from '../../__mocks__/stagesApi'
import { StageTable } from '../StageTable'

vi.mock('../../../../components/table/Table')
vi.mock('../../../../components/table/TableRow')
vi.mock('../../../../utils/date')

describe('StageTable', () => {
    it('renders the table headers correctly', () => {
        render(<StageTable stages={mockStages} />)

        expect(screen.getByText('Дата')).toBeInTheDocument()
        expect(screen.getByText('Время')).toBeInTheDocument()
        expect(screen.getByText('Заголовок')).toBeInTheDocument()
        expect(screen.getByText('Подзаголовок')).toBeInTheDocument()
    })

    it('renders the table data correctly', () => {
        render(<StageTable stages={mockStages} />)

        const dates = screen.getAllByText('2025.04.10')
        const time = screen.getAllByText('14:30')

        expect(dates).toHaveLength(2)
        expect(time).toHaveLength(2)

        const title = screen.getByText(mockStage1.title)
        const subtitle = screen.getByText(mockStage1.subtitle)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
    })
})
