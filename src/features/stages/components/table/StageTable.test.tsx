import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockStage1, mockStages } from '../../api/__mocks__/stagesApi'
import { StageTable } from './StageTable'

vi.mock('@/shared/components/table/table/Table')
vi.mock('@/shared/components/table/TableRow')
vi.mock('@/shared/utils/date/formatDate')

describe('StageTable', () => {
    it('renders the table headers correctly', () => {
        render(<StageTable stages={mockStages} />)

        expect(screen.getByText('table.date')).toBeInTheDocument()
        expect(screen.getByText('table.time')).toBeInTheDocument()
        expect(screen.getByText('table.title')).toBeInTheDocument()
        expect(screen.getByText('table.subtitle')).toBeInTheDocument()
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
