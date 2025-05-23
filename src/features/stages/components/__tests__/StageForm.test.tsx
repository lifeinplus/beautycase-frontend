import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, expect, vi } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockOnSubmit } from '../../../../tests/mocks/form'
import { mockNavigate } from '../../../../tests/mocks/router'
import { setFormData } from '../../../form/formSlice'
import { mockStage } from '../../__mocks__/stagesApi'
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
        vi.mocked(useAppSelector).mockReturnValue(mockStage)
    })

    it('renders all required form fields', () => {
        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const topPanel = screen.getByTestId('mocked-top-panel')
        expect(topPanel).toBeInTheDocument()

        const title = screen.getByPlaceholderText('Заголовок')
        const subtitle = screen.getByPlaceholderText('Подзаголовок')
        const imageUrlSection = screen.getByTestId('mocked-image-url-section')
        const comment = screen.getByPlaceholderText('Комментарий')
        const steps = screen.getByPlaceholderText('Шаги')
        const buttonNavigateSection = screen.getByTestId(
            'mocked-button-navigate-section'
        )

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
        expect(imageUrlSection).toBeInTheDocument()
        expect(comment).toBeInTheDocument()
        expect(steps).toBeInTheDocument()
        expect(buttonNavigateSection).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByTestId('mocked-back-button')
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to products selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByTestId('mocked-button-navigate-section')
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/products/selection')
    })

    it('displays the correct number of added store links', () => {
        render(<StageForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const stagesText = screen.getByText('Выбрано: 2')
        expect(stagesText).toBeInTheDocument()
    })
})
