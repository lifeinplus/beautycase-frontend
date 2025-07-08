import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, vi, expect, beforeEach, it, Mock } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks'
import { renderWithProviders } from '@/tests/mocks/wrappers'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { clearFormData } from '@/features/form/formSlice'
import type { FormRef } from '@/features/form/types'
import {
    useCreateStoreMutation,
    useUpdateStoreByIdMutation,
} from '../../storesApi'
import { StoreForm } from '../StoreForm'
import { mockStore1 } from '../../__mocks__/storesApi'

vi.mock('@/app/hooks')
vi.mock('@/shared/components/forms/Button')
vi.mock('@/shared/utils/errorUtils')
vi.mock('../../storesApi')

describe('StoreForm', () => {
    const mockRef = { current: { focusInput: vi.fn() } as FormRef }

    const mockCreateStore = vi.fn()
    const mockCreateUnwrap = vi.fn()

    const mockUpdateStoreById = vi.fn()
    const mockUpdateUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        vi.mocked(useCreateStoreMutation as Mock).mockReturnValue([
            mockCreateStore,
            { isLoading: false },
        ])

        mockCreateStore.mockReturnValue({ unwrap: mockCreateUnwrap })
        mockCreateUnwrap.mockResolvedValue({})

        vi.mocked(useUpdateStoreByIdMutation as Mock).mockReturnValue([
            mockUpdateStoreById,
            { isLoading: false },
        ])

        mockUpdateStoreById.mockReturnValue({ unwrap: mockUpdateUnwrap })
        mockUpdateUnwrap.mockResolvedValue({})
    })

    it('renders the form correctly', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Store',
        })

        renderWithProviders(<StoreForm ref={mockRef} />)

        expect(
            screen.getByPlaceholderText('fields.name.label')
        ).toBeInTheDocument()

        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('focuses input when focusInput method is called', () => {
        render(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('fields.name.label')
        vi.spyOn(input, 'focus')

        mockRef.current.focusInput()

        expect(input.focus).toHaveBeenCalled()
    })

    it('calls createStore when add button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProviders(<StoreForm ref={mockRef} />)

        await user.type(
            screen.getByPlaceholderText('fields.name.label'),
            'New Store'
        )

        await user.click(screen.getByRole('button'))

        expect(mockCreateStore).toHaveBeenCalledWith({ name: 'New Store' })
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('calls updateStore when update button is clicked', async () => {
        const user = userEvent.setup()

        const { _id, ...store } = mockStore1

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Store',
        })

        render(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('fields.name.label')
        await user.clear(input)
        await user.type(input, store.name)

        await user.click(screen.getByRole('button'))

        expect(mockUpdateStoreById).toHaveBeenCalledWith({
            id: '123',
            store,
        })

        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('handles createStore error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockCreateUnwrap.mockRejectedValue(mockError)

        render(<StoreForm ref={mockRef} />)

        await user.type(
            screen.getByPlaceholderText('fields.name.label'),
            'New Store'
        )

        await user.click(screen.getByRole('button'))

        expect(mockCreateStore).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('handles updateStore error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUpdateUnwrap.mockRejectedValue(mockError)

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Store',
        })

        render(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('fields.name.label')
        const addButton = screen.getByRole('button')

        await user.type(input, 'New Store')
        await user.click(addButton)

        expect(mockUpdateStoreById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('renders error message and applies error class', async () => {
        const user = userEvent.setup()

        render(<StoreForm ref={mockRef} />)
        await user.click(screen.getByTestId('mocked-button'))

        expect(screen.getByText('fields.name.errors.required')).toHaveClass(
            /error/
        )
    })
})
