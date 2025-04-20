import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../../../app/hooks'
import { selectRole, selectUsername } from '../../../features/auth/authSlice'
import { clearFormData } from '../../../features/form/formSlice'
import { mockError } from '../../../tests/mocks'
import { mockDispatch } from '../../../tests/mocks/app'
import { mockNavigate } from '../../../tests/mocks/router'
import { DetailsPage, type DetailsPageProps } from '../DetailsPage'

vi.mock('../../navigation/AdaptiveNavBar')
vi.mock('../../navigation/NavigationButton')
vi.mock('../../ui/ModalDelete')
vi.mock('../../ui/ModalDuplicate')
vi.mock('../../TopPanel')
vi.mock('../../DataWrapper')

vi.mock('../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

describe('DetailsPage', () => {
    const mockDeleteItem = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const mockDuplicateItem = vi.fn()
    const mockDuplicateUnwrap = vi.fn()

    const mockMediaContent = (
        <div data-testid="mocked-media-content">Media Content</div>
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
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        mockDeleteItem.mockReturnValue({ unwrap: mockDeleteUnwrap })
        mockDeleteUnwrap.mockResolvedValue({})

        mockDuplicateItem.mockReturnValue({ unwrap: mockDuplicateUnwrap })
        mockDuplicateUnwrap.mockResolvedValue({})
    })

    it('renders the component with all elements', () => {
        render(<DetailsPage {...mockProps} />)

        const topPanel = screen.getByTestId('mocked-top-panel')
        const title = screen.getByRole('heading', {
            level: 2,
            name: mockProps.title,
        })
        const subtitle = screen.getByText(mockProps.subtitle!)
        const description = screen.getByText(mockProps.description!)
        const dataWrapper = screen.getByTestId('mocked-data-wrapper')
        const mediaContent = screen.getByTestId('mocked-media-content')
        const complementary = screen.getByRole('complementary')

        expect(topPanel).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(dataWrapper).toBeInTheDocument()
        expect(mediaContent).toBeInTheDocument()
        expect(complementary).toBeInTheDocument()
    })

    it('dispatches clearFormData on mount', () => {
        render(<DetailsPage {...mockProps} />)
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('renders navigation buttons for actions that user can access', () => {
        render(<DetailsPage {...mockProps} />)

        const btnBack = screen.getByRole('button', { name: 'Назад' })
        const btnEdit = screen.getByRole('button', { name: 'Редактировать' })
        const btnDelete = screen.getByRole('button', { name: 'Удалить' })

        expect(btnBack).toBeInTheDocument()
        expect(btnEdit).toBeInTheDocument()
        expect(btnDelete).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'Назад' })
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath, {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('navigates to edit page when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'Редактировать' })
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith('/products/edit/123')
    })

    it('does not render duplicate button when showDuplicate is false', () => {
        render(<DetailsPage {...mockProps} showDuplicate={false} />)

        const button = screen.queryByRole('button', { name: 'Дублировать' })
        expect(button).not.toBeInTheDocument()
    })

    it('opens duplicate modal when duplicate button is clicked', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} showDuplicate />)

        const button = screen.getByRole('button', { name: 'Дублировать' })
        await user.click(button)

        const modal = screen.getByTestId('mocked-modal-duplicate')
        expect(modal).toBeInTheDocument()
    })

    it('opens delete modal when delete button is clicked', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'Удалить' })
        await user.click(button)

        const modal = screen.getByTestId('mocked-modal-delete')
        expect(modal).toBeInTheDocument()
    })

    it('handles successful item duplication', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} showDuplicate />)

        const button = screen.getByRole('button', { name: 'Дублировать' })
        await user.click(button)

        const buttonModal = screen.getByTestId('mocked-modal-duplicate-confirm')
        await user.click(buttonModal)

        expect(mockDuplicateItem).toHaveBeenCalledWith('123')
        expect(toast.success).toHaveBeenCalledWith(
            `${mockProps.title} дублирован`
        )
        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath)
    })

    it('handles duplicate item error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockDuplicateUnwrap.mockRejectedValue(mockError)

        render(<DetailsPage {...mockProps} showDuplicate />)

        const button = screen.getByRole('button', { name: 'Дублировать' })
        await user.click(button)

        const buttonModal = screen.getByTestId('mocked-modal-duplicate-confirm')
        await user.click(buttonModal)

        expect(mockDuplicateItem).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('handles successful item deletion', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'Удалить' })
        await user.click(button)

        const buttonModal = screen.getByTestId('mocked-modal-delete-confirm')
        await user.click(buttonModal)

        expect(mockDeleteItem).toHaveBeenCalledWith('123')
        expect(toast.success).toHaveBeenCalledWith(`${mockProps.title} удалён`)
        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath)
    })

    it('handles delete item error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockDeleteUnwrap.mockRejectedValue(mockError)

        render(<DetailsPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'Удалить' })
        await user.click(button)

        const buttonModal = screen.getByTestId('mocked-modal-delete-confirm')
        await user.click(buttonModal)

        expect(mockDeleteItem).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
