import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockQuestionnaire1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useGetQuestionnaireByIdQuery } from '@/features/questionnaires/api/questionnairesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { QuestionnaireResult } from './QuestionnaireResult'

vi.mock('@/features/questionnaires/components/data/QuestionnaireData')
vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/layout/top-panel/TopPanel')
vi.mock('@/shared/utils/date/formatDate')

describe('QuestionnaireResult', () => {
    beforeEach(() => {
        vi.mocked(useGetQuestionnaireByIdQuery as Mock).mockReturnValue({
            data: mockQuestionnaire1,
            isLoading: false,
            error: null,
        })
    })

    it('renders questionnaire data', () => {
        render(<QuestionnaireResult />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-questionnaire-data')
        ).toBeInTheDocument()

        expect(screen.getAllByText(mockQuestionnaire1.name)).toHaveLength(3)
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<QuestionnaireResult />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })
})
