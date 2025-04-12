import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../../../app/hooks'
import { selectRole, selectUsername } from '../../../features/auth/authSlice'
import { clearFormData } from '../../../features/form/formSlice'
import { mockError } from '../../../tests/mocks'
import { mockDispatch } from '../../../tests/mocks/app'
import { mockNavigate } from '../../../tests/mocks/router'
import { renderWithProvider } from '../../../tests/mocks/wrappers'
import { getErrorMessage } from '../../../utils/errorUtils'
import { type TopPanelProps } from '../../TopPanel'
import { DetailsPage, type DetailsPageProps } from '../DetailsPage'

vi.mock('../../TopPanel', () => ({
    TopPanel: ({ title, onBack }: TopPanelProps) => (
        <div data-testid="top-panel">
            <button data-testid="back-button" onClick={onBack}>
                Back
            </button>
            <h2>{title}</h2>
        </div>
    ),
}))

vi.mock('../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

describe('DetailsPage', () => {
    const mockDeleteItem = vi.fn().mockReturnValue({ unwrap: vi.fn() })
    const mockDuplicateItem = vi.fn().mockReturnValue({ unwrap: vi.fn() })

    const mockMediaContent = (
        <div data-testid="media-content">Media Content</div>
    )

    const mockProps: DetailsPageProps = {
        redirectPath: '/products',
        topPanelTitle: 'Test Top Panel Title',
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        isLoading: false,
        error: null,
        deleteItem: mockDeleteItem,
        duplicateItem: mockDuplicateItem,
        mediaContent: mockMediaContent,
    }

    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'mua'
            if (selector === selectUsername) return 'inna'
            return null
        })
    })

    it('renders the component with all elements', () => {
        renderWithProvider(<DetailsPage {...mockProps} />)

        expect(screen.getByTestId('top-panel')).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: mockProps.title,
            })
        ).toBeInTheDocument()

        expect(screen.getByText(mockProps.subtitle!)).toBeInTheDocument()
        expect(screen.getByText(mockProps.description!)).toBeInTheDocument()
        expect(screen.getByTestId('media-content')).toBeInTheDocument()
        expect(screen.getByRole('complementary')).toBeInTheDocument()
    })

    it('dispatches clearFormData on mount', () => {
        renderWithProvider(<DetailsPage {...mockProps} />)
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('shows loading state when isLoading is true', () => {
        renderWithProvider(<DetailsPage {...mockProps} isLoading />)

        expect(screen.getByText('Загрузка...')).toBeInTheDocument()
        expect(screen.queryByTestId('media-content')).not.toBeInTheDocument()
    })

    it('shows error state when error is present', () => {
        renderWithProvider(<DetailsPage {...mockProps} error={mockError} />)

        expect(getErrorMessage).toHaveBeenCalledWith(mockError)
        expect(screen.getByText(mockError.message)).toBeInTheDocument()
        expect(screen.queryByTestId('media-content')).not.toBeInTheDocument()
    })

    it('renders navigation buttons for actions that user can access', () => {
        renderWithProvider(<DetailsPage {...mockProps} />)

        const btnBack = screen.getByRole('button', { name: 'Назад' })
        const btnEdit = screen.getByRole('button', { name: 'Редактировать' })
        const btnDelete = screen.getByRole('button', { name: 'Удалить' })

        expect(btnBack).toBeInTheDocument()
        expect(btnEdit).toBeInTheDocument()
        expect(btnDelete).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProvider(<DetailsPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'Назад' })
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath, {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('navigates to edit page when edit button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProvider(<DetailsPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'Редактировать' })
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith('/products/edit/123')
    })

    it('does not render duplicate button when showDuplicate is false', () => {
        renderWithProvider(<DetailsPage {...mockProps} showDuplicate={false} />)

        const button = screen.queryByRole('button', { name: 'Дублировать' })
        expect(button).not.toBeInTheDocument()
    })

    it('opens duplicate modal when duplicate button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProvider(<DetailsPage {...mockProps} showDuplicate />)

        const button = screen.getByRole('button', { name: 'Дублировать' })
        await user.click(button)

        expect(
            screen.getByText(
                `Вы действительно хотите дублировать ${mockProps.title}?`
            )
        ).toBeInTheDocument()
    })

    it('opens delete modal when delete button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProvider(<DetailsPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'Удалить' })
        await user.click(button)

        expect(
            screen.getByText(
                `Вы действительно хотите удалить ${mockProps.title}?`
            )
        ).toBeInTheDocument()
    })

    it('handles successful item duplication', async () => {
        const user = userEvent.setup()

        renderWithProvider(<DetailsPage {...mockProps} showDuplicate />)

        const button = screen.getByRole('button', { name: 'Дублировать' })
        await user.click(button)

        const buttonModal = screen.getByLabelText('Modal duplicate button')
        await user.click(buttonModal)

        expect(mockDuplicateItem).toHaveBeenCalledWith('123')
        expect(toast.success).toHaveBeenCalledWith(
            `${mockProps.title} дублирован`
        )
        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath)
    })

    it('handles successful item deletion', async () => {
        const user = userEvent.setup()

        renderWithProvider(<DetailsPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'Удалить' })
        await user.click(button)

        const buttonModal = screen.getByLabelText('Modal delete button')
        await user.click(buttonModal)

        expect(mockDeleteItem).toHaveBeenCalledWith('123')
        expect(toast.success).toHaveBeenCalledWith(`${mockProps.title} удалён`)
        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath)
    })
})
