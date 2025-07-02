import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, expect, beforeEach } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockOnSubmit } from '../../../../tests/mocks/form'
import { mockNavigate } from '../../../../tests/mocks/router'
import { setFormData } from '../../../form/formSlice'
import { mockLesson1 } from '../../__mocks__/lessonsApi'
import { LessonForm } from '../LessonForm'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/NavBar')
vi.mock('../../../../components/navigation/NavButton')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../form/components/ButtonNavigateSection')
vi.mock('../../../form/components/TextareaSection')
vi.mock('../../../form/formSlice')

describe('LessonForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockLesson1)
    })

    it('renders all required form fields', () => {
        render(<LessonForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const placeholders = [
            'fields.title.label',
            'fields.shortDescription.label',
            'fields.videoUrl.label',
            'fields.fullDescription.label',
        ]

        placeholders.forEach((p) =>
            expect(screen.getByPlaceholderText(p)).toBeInTheDocument()
        )

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
        expect(screen.getByText('fields.products.label')).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<LessonForm title={mockTitle} onSubmit={mockOnSubmit} />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to products selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<LessonForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const buttons = screen.getAllByTestId('mocked-button-navigate-section')
        await user.click(buttons[0])

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('products')
    })

    it('displays the correct number of selected products', () => {
        render(<LessonForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const buttons = screen.getAllByTestId('mocked-button-navigate-section')
        expect(buttons[0]).toHaveTextContent('fields.products.selected: 3')
        expect(buttons[1]).toHaveTextContent('fields.clients.select')
    })
})
