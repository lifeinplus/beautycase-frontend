import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, expect, vi } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockOnSubmit } from '../../../../tests/mocks/form'
import { mockNavigate } from '../../../../tests/mocks/router'
import { setFormData } from '../../../form/formSlice'
import { mockStage1 } from '../../__mocks__/stagesApi'
import { StageForm } from '../StageForm'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../form/components/ButtonNavigateSection')
vi.mock('../../../form/components/InputSection')
vi.mock('../../../form/components/ImageUrlSection')
vi.mock('../../../form/components/TextareaSection')
vi.mock('../../../form/formSlice')

describe('StageForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockStage1)
    })

    it('renders all required form fields', () => {
        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const testIds = [
            'mocked-top-panel',
            'mocked-image-url-section',
            'mocked-button-navigate-section',
        ]

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

    it('navigates to products selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)
        await user.click(screen.getByTestId('mocked-button-navigate-section'))

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/products/selection')
    })

    it('displays the correct number of added store links', () => {
        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)

        expect(
            screen.getByText('fields.products.selected: 2')
        ).toBeInTheDocument()
    })
})
