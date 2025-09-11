import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockQuestionnaire1 } from '@/features/questionnaires/__mocks__/questionnairesApi'
import { useGetQuestionnaireByIdQuery } from '@/features/questionnaires/questionnairesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { QuestionnaireResult } from './QuestionnaireResult'

vi.mock('@/features/questionnaires/components/QuestionnaireData')
vi.mock('@/features/questionnaires/questionnairesApi')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/utils/date')

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

        expect(screen.getByText(mockQuestionnaire1.name)).toBeInTheDocument()
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<QuestionnaireResult />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })
})
