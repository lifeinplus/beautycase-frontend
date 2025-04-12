import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { type AdaptiveNavBarProps } from '../../../../components/navigation/AdaptiveNavBar'
import { type TopPanelProps } from '../../../../components/TopPanel'
import { mockDispatch } from '../../../../tests/mocks/app'
import { mockUrlYouTube } from '../../../../tests/mocks/form'
import { mockNavigate } from '../../../../tests/mocks/router'
import { setFormData } from '../../../form/formSlice'
import { LessonForm } from '../LessonForm'

vi.mock('react-hook-form', async () => ({
    useForm: vi.fn(),
}))

vi.mock('../../../../components/navigation/AdaptiveNavBar', () => ({
    AdaptiveNavBar: ({ children }: AdaptiveNavBarProps) => (
        <div data-testid="adaptive-navbar">{children}</div>
    ),
}))

vi.mock('../../../../components/TopPanel', () => ({
    TopPanel: ({ title, onBack }: TopPanelProps) => (
        <div data-testid="top-panel">
            <button data-testid="back-button" onClick={onBack}>
                Back
            </button>
            <h2>{title}</h2>
        </div>
    ),
}))

vi.mock('../../../form/formSlice', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...(actual as object),
        setFormData: vi.fn(),
    }
})

describe('LessonForm', () => {
    const mockOnSubmit = vi.fn()

    const mockRegister = vi.fn().mockImplementation((name) => ({ name }))
    const mockReset = vi.fn()
    const mockWatch = vi.fn().mockImplementation((field) => {
        if (field === 'videoUrl') return mockUrlYouTube
        return null
    })
    const mockHandleSubmit = vi.fn((fn) => fn)
    const mockFormState = { errors: {} }

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        vi.mocked(useForm as Mock).mockReturnValue({
            register: mockRegister,
            reset: mockReset,
            watch: mockWatch,
            handleSubmit: mockHandleSubmit,
            formState: mockFormState,
        })
    })

    it('renders all required form fields', () => {
        render(<LessonForm title="Test Title" onSubmit={mockOnSubmit} />)

        expect(screen.getByText('Заголовок')).toBeInTheDocument()
        expect(screen.getByText('Краткое описание')).toBeInTheDocument()
        expect(screen.getByText('Ссылка на видео')).toBeInTheDocument()
        expect(screen.getByText('Полное описание')).toBeInTheDocument()
        expect(screen.getByText('Продукты')).toBeInTheDocument()
    })

    it('displays "Выбрать" when no products are selected', () => {
        render(<LessonForm title="Test Title" onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: /Продукты/i })
        expect(button).toHaveTextContent('Выбрать')
    })

    it('displays the correct number of selected products', () => {
        const mockWatch = vi.fn().mockImplementation((field) => {
            if (field === 'productIds') return ['1', '2']
            return null
        })

        vi.mocked(useForm as Mock).mockReturnValue({
            register: mockRegister,
            reset: mockReset,
            watch: mockWatch,
            handleSubmit: mockHandleSubmit,
            formState: mockFormState,
        })

        render(<LessonForm title="Test Lesson Form" onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: /Продукты/i })
        expect(button).toHaveTextContent('Выбрано: 2')
    })

    it('calls onSubmit when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<LessonForm title="Test Title" onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: /Сохранить/i })
        await user.click(button)

        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<LessonForm title="Test Title" onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: /Назад/i })
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to products selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<LessonForm title="Test Title" onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: /Продукты/i })
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/products/selection')
    })
})
