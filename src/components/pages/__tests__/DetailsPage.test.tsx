import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mockDispatch } from '../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../app/hooks'
import { selectRole, selectUsername } from '../../../features/auth/authSlice'
import { clearFormData } from '../../../features/form/formSlice'
import { mockNavigate } from '../../../tests/mocks/router'
import { mockError } from '../../../utils/__mocks__/errorUtils'
import { DetailsPage, type DetailsPageProps } from '../DetailsPage'

vi.mock('../../../app/hooks')
vi.mock('../../../utils/errorUtils')
vi.mock('../../navigation/AdaptiveNavBar')
vi.mock('../../navigation/NavigationButton')
vi.mock('../../ui/ModalDelete')
vi.mock('../../ui/ModalDuplicate')
vi.mock('../../TopPanel')
vi.mock('../../DataWrapper')

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

        const buttons = [
            'navigation:actions.back',
            'navigation:actions.edit',
            'navigation:actions.delete',
        ]

        buttons.forEach((b) =>
            expect(screen.getByRole('button', { name: b })).toBeInTheDocument()
        )
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} />)
        await user.click(screen.getByRole('button', { name: /back/ }))

        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath, {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('navigates to edit page when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} />)
        await user.click(screen.getByRole('button', { name: /edit/ }))

        expect(mockNavigate).toHaveBeenCalledWith('/products/edit/123')
    })

    it('does not render duplicate button when showDuplicate is false', () => {
        render(<DetailsPage {...mockProps} showDuplicate={false} />)

        expect(
            screen.queryByRole('button', { name: /duplicate/ })
        ).not.toBeInTheDocument()
    })

    it('opens duplicate modal when duplicate button is clicked', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} showDuplicate />)
        await user.click(screen.getByRole('button', { name: /duplicate/ }))

        expect(screen.getByTestId('mocked-modal-duplicate')).toBeInTheDocument()
    })

    it('opens delete modal when delete button is clicked', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} />)
        await user.click(screen.getByRole('button', { name: /delete/ }))

        expect(screen.getByTestId('mocked-modal-delete')).toBeInTheDocument()
    })

    it('handles successful item duplication', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} showDuplicate />)

        await user.click(screen.getByRole('button', { name: /duplicate/ }))
        await user.click(screen.getByTestId('mocked-modal-duplicate-confirm'))

        expect(mockDuplicateItem).toHaveBeenCalledWith('123')
        expect(toast.success).toHaveBeenCalledWith('toast.duplicate')
        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath)
    })

    it('handles duplicate item error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockDuplicateUnwrap.mockRejectedValue(mockError)

        render(<DetailsPage {...mockProps} showDuplicate />)

        await user.click(screen.getByRole('button', { name: /duplicate/ }))
        await user.click(screen.getByTestId('mocked-modal-duplicate-confirm'))

        expect(mockDuplicateItem).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('handles successful item deletion', async () => {
        const user = userEvent.setup()

        render(<DetailsPage {...mockProps} />)

        await user.click(screen.getByRole('button', { name: /delete/ }))
        await user.click(screen.getByTestId('mocked-modal-delete-confirm'))

        expect(mockDeleteItem).toHaveBeenCalledWith('123')
        expect(toast.success).toHaveBeenCalledWith('toast.delete')
        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath)
    })

    it('handles delete item error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockDeleteUnwrap.mockRejectedValue(mockError)

        render(<DetailsPage {...mockProps} />)

        await user.click(screen.getByRole('button', { name: /delete/ }))
        await user.click(screen.getByTestId('mocked-modal-delete-confirm'))

        expect(mockDeleteItem).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
