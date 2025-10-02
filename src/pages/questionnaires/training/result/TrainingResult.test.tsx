import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockTraining1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useGetTrainingByIdQuery } from '@/features/questionnaires/api/questionnairesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { TrainingResult } from './TrainingResult'

vi.mock('@/features/questionnaires/components/data/TrainingData')
vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/layout/top-panel/TopPanel')
vi.mock('@/shared/utils/date/formatDate')

describe('TrainingResult', () => {
    beforeEach(() => {
        vi.mocked(useGetTrainingByIdQuery as Mock).mockReturnValue({
            data: mockTraining1,
            isLoading: false,
            error: null,
        })
    })

    it('renders questionnaire data', () => {
        render(<TrainingResult />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-questionnaire-data')
        ).toBeInTheDocument()

        expect(screen.getAllByText(mockTraining1.name)).toHaveLength(3)
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<TrainingResult />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })
})
