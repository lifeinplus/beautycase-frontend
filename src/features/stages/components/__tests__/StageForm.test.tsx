import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks'
import { mockOnSubmit } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { mockStage1 } from '../../__mocks__/stagesApi'
import { StageForm } from '../StageForm'

vi.mock('@/app/hooks')
vi.mock('@/shared/components/forms/ButtonNavigateSection')
vi.mock('@/shared/components/forms/InputSection')
vi.mock('@/shared/components/forms/ImageUrlSection')
vi.mock('@/shared/components/forms/TextareaSection')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/features/form/formSlice')

describe('StageForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockStage1)
    })

    it('renders all required form fields', () => {
        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const testIds = ['mocked-top-panel', 'mocked-image-url-section']

        testIds.forEach((id) =>
            expect(screen.getByTestId(id)).toBeInTheDocument()
        )

        const placeholders = [
            'fields.title.label',
            'fields.subtitle.label',
            'fields.comment.label',
            'fields.stepsText.label',
        ]

        placeholders.forEach((p) =>
            expect(screen.getByPlaceholderText(p)).toBeInTheDocument()
        )
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })
})
