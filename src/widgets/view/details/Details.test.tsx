import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { clearFormData } from '@/features/form/formSlice'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { Details, type DetailsProps } from './Details'

vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/modals/ModalDelete')
vi.mock('@/shared/components/modals/ModalDuplicate')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/utils/errorUtils')
vi.mock('@/app/hooks')

describe('Details', () => {
    const mockDeleteItem = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const mockDuplicateItem = vi.fn()
    const mockDuplicateUnwrap = vi.fn()

    const mockMediaContent = (
        <div data-testid="mocked-media-content">Media Content</div>
    )

    const mockProps: DetailsProps = {
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
        render(<Details {...mockProps} />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 1,
                name: mockProps.title,
            })
        ).toBeInTheDocument()

        expect(screen.getByText(mockProps.subtitle!)).toBeInTheDocument()
        expect(screen.getByText(mockProps.description!)).toBeInTheDocument()
        expect(screen.getByTestId('mocked-data-wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-media-content')).toBeInTheDocument()
        expect(screen.getByRole('complementary')).toBeInTheDocument()
    })

    it('dispatches clearFormData on mount', () => {
        render(<Details {...mockProps} />)
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('renders navigation buttons for actions that user can access', () => {
        render(<Details {...mockProps} />)

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

        render(<Details {...mockProps} />)
        await user.click(screen.getByRole('button', { name: /back/ }))

        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath, {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('navigates to edit page when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(<Details {...mockProps} />)
        await user.click(screen.getByRole('button', { name: /edit/ }))

        expect(mockNavigate).toHaveBeenCalledWith('/products/edit/123')
    })

    it('does not render duplicate button when showDuplicate is false', () => {
        render(<Details {...mockProps} showDuplicate={false} />)

        expect(
            screen.queryByRole('button', { name: /duplicate/ })
        ).not.toBeInTheDocument()
    })

    it('opens duplicate modal when duplicate button is clicked', async () => {
        const user = userEvent.setup()

        render(<Details {...mockProps} showDuplicate />)
        await user.click(screen.getByRole('button', { name: /duplicate/ }))

        expect(screen.getByTestId('mocked-modal-duplicate')).toBeInTheDocument()
    })

    it('opens delete modal when delete button is clicked', async () => {
        const user = userEvent.setup()

        render(<Details {...mockProps} />)
        await user.click(screen.getByRole('button', { name: /delete/ }))

        expect(screen.getByTestId('mocked-modal-delete')).toBeInTheDocument()
    })

    it('handles successful item duplication', async () => {
        const user = userEvent.setup()

        render(<Details {...mockProps} showDuplicate />)

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

        render(<Details {...mockProps} showDuplicate />)

        await user.click(screen.getByRole('button', { name: /duplicate/ }))
        await user.click(screen.getByTestId('mocked-modal-duplicate-confirm'))

        expect(mockDuplicateItem).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('handles successful item deletion', async () => {
        const user = userEvent.setup()

        render(<Details {...mockProps} />)

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

        render(<Details {...mockProps} />)

        await user.click(screen.getByRole('button', { name: /delete/ }))
        await user.click(screen.getByTestId('mocked-modal-delete-confirm'))

        expect(mockDeleteItem).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
