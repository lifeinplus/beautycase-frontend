import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, expect, vi, Mock } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { type AdaptiveNavBarProps } from '../../../../components/navigation/AdaptiveNavBar'
import { type TopPanelProps } from '../../../../components/TopPanel'
import { mockCategories } from '../../../../tests/mocks/handlers/categoriesHandlers'
import { mockUsers } from '../../../../tests/mocks/handlers/usersHandlers'
import { mockDispatch } from '../../../../tests/mocks/app'
import { mockOnSubmit } from '../../../../tests/mocks/form'
import { mockNavigate } from '../../../../tests/mocks/router'
import { setFormData } from '../../../form/formSlice'
import { useGetCategoriesQuery } from '../../../categories/categoriesApiSlice'
import { useGetUsersQuery } from '../../../users/usersApiSlice'
import { MakeupBagForm } from '../MakeupBagForm'

vi.mock('../../../../components/navigation/AdaptiveNavBar', () => ({
    AdaptiveNavBar: ({ children }: AdaptiveNavBarProps) => (
        <div data-testid="mocked-adaptive-navbar">{children}</div>
    ),
}))

vi.mock('../../../../components/TopPanel', () => ({
    TopPanel: ({ title, onBack }: TopPanelProps) => (
        <div data-testid="mocked-top-panel">
            <button data-testid="mocked-back-button" onClick={onBack}>
                Back
            </button>
            <h2>{title}</h2>
        </div>
    ),
}))

vi.mock('../../../categories/categoriesApiSlice', () => ({
    useGetCategoriesQuery: vi.fn(),
}))

vi.mock('../../../form/formSlice', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...(actual as object),
        setFormData: vi.fn(),
    }
})

vi.mock('../../../users/usersApiSlice', () => ({
    useGetUsersQuery: vi.fn(),
}))

describe('MakeupBagForm', () => {
    const mockFormData = {
        categoryId: 'category1',
        clientId: 'user1',
        stageIds: ['stage1', 'stage2'],
        toolIds: ['tool1'],
    }

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockFormData)

        vi.mocked(useGetCategoriesQuery as Mock).mockReturnValue({
            data: mockCategories,
        })

        vi.mocked(useGetUsersQuery as Mock).mockReturnValue({
            data: mockUsers,
        })
    })

    it('renders all required form fields', () => {
        render(<MakeupBagForm title="Test Title" onSubmit={mockOnSubmit} />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Test Title', level: 1 })
        ).toBeInTheDocument()

        expect(screen.getByText('Категория')).toBeInTheDocument()
        expect(screen.getByText('Клиент')).toBeInTheDocument()
        expect(screen.getByText('Этапы')).toBeInTheDocument()
        expect(screen.getByText('Инструменты')).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title="Test Title" onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: /Назад/i })
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to tools selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title="Test Title" onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: /Инструменты/i })
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/tools/selection')
    })

    it('navigates to stages selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title="Test Title" onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: /Этапы/i })
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/stages/selection')
    })

    it('renders stage and tool button texts based on watch values', () => {
        render(<MakeupBagForm title="Test Title" onSubmit={mockOnSubmit} />)

        expect(screen.getByText('Выбрано: 2')).toBeInTheDocument()
        expect(screen.getByText('Выбрано: 1')).toBeInTheDocument()
    })
})
