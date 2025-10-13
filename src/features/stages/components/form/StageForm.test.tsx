import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { mockOnSubmit } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { mockStage1 } from '../../api/__mocks__/stagesApi'
import { StageForm } from './StageForm'

vi.mock('@/app/hooks/hooks')
vi.mock('@/shared/components/forms/image/url-section/ImageUrlSection')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')

vi.mock('@/features/form/slice/formSlice')

describe('StageForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockStage1)
    })

    it('renders all required form fields', () => {
        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)

        expect(screen.getByRole('navigation')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-image-url-section')
        ).toBeInTheDocument()

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

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })
})
