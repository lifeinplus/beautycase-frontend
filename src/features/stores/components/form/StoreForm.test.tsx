import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import type { FormRef } from '@/features/form/types'
import { mockError } from '@/tests/mocks'
import { renderWithProviders } from '@/tests/mocks/wrappers'
import { mockStore1 } from '../../api/__mocks__/storesApi'
import {
    useCreateStoreMutation,
    useUpdateStoreByIdMutation,
} from '../../api/storesApi'
import { StoreForm } from './StoreForm'

vi.mock('@/app/hooks/hooks')
vi.mock('@/shared/components/forms/button/Button')
vi.mock('../../api/storesApi')

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
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

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
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

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
