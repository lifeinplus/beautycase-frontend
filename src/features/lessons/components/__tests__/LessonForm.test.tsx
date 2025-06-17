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
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
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

        const topPanel = screen.getByTestId('mocked-top-panel')
        const title = screen.getByPlaceholderText('Заголовок')
        const shortDescription = screen.getByPlaceholderText('Краткое описание')
        const videoUrl = screen.getByPlaceholderText('Ссылка на видео')
        const fullDescription = screen.getByPlaceholderText('Полное описание')
        const products = screen.getByText('Продукты')

        expect(topPanel).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(shortDescription).toBeInTheDocument()
        expect(videoUrl).toBeInTheDocument()
        expect(fullDescription).toBeInTheDocument()
        expect(products).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<LessonForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByTestId('mocked-back-button')
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to products selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<LessonForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByTestId('mocked-button-navigate-section')
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/products/selection')
    })

    it('displays the correct number of selected products', () => {
        render(<LessonForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByTestId('mocked-button-navigate-section')
        expect(button).toHaveTextContent('Выбрано: 3')
    })
})
