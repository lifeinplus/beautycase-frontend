import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, vi, expect, beforeEach, it, Mock } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { mockDispatch } from '../../../../tests/mocks/app'
import { renderWithProvider } from '../../../../tests/mocks/wrappers'
import { clearFormData } from '../../../form/formSlice'
import type { FormRef } from '../../../form/types'
import {
    useCreateStoreMutation,
    useUpdateStoreMutation,
} from '../../storesApiSlice'
import { StoreForm } from '../StoreForm'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../storesApiSlice', () => ({
    useCreateStoreMutation: vi.fn(),
    useUpdateStoreMutation: vi.fn(),
}))

describe('StoreForm', () => {
    const mockRef = { current: { focusInput: vi.fn() } as FormRef }

    const mockCreateStore = vi.fn(() => ({
        unwrap: () => Promise.resolve({}),
    }))

    const mockUpdateStore = vi.fn(() => ({
        unwrap: () => Promise.resolve({}),
    }))

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        vi.mocked(useCreateStoreMutation as Mock).mockReturnValue([
            mockCreateStore,
            { isLoading: false },
        ])

        vi.mocked(useUpdateStoreMutation as Mock).mockReturnValue([
            mockUpdateStore,
            { isLoading: false },
        ])
    })

    it('renders the form correctly', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Store',
        })

        renderWithProvider(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Магазин')
        const button = screen.getByRole('button')

        expect(input).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    it('focuses input when focusInput method is called', () => {
        render(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Магазин')
        vi.spyOn(input, 'focus')

        mockRef.current.focusInput()

        expect(input.focus).toHaveBeenCalled()
    })

    it('displays add button when no form data ID exists', () => {
        render(<StoreForm ref={mockRef} />)

        const addButton = screen.getByRole('button')

        expect(addButton).toHaveAttribute('type', 'submit')
        expect(addButton).toHaveClass('btn-success')
    })

    it('displays update button when form data ID exists', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Store',
        })

        render(<StoreForm ref={mockRef} />)

        const updateButton = screen.getByRole('button')

        expect(updateButton).toHaveAttribute('type', 'submit')
        expect(updateButton).toHaveClass('btn-warning')
    })

    it('calls createStore when add button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProvider(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Магазин')
        const addButton = screen.getByRole('button')

        await user.type(input, 'New Store')
        await user.click(addButton)

        await waitFor(() => {
            expect(mockCreateStore).toHaveBeenCalledWith({ name: 'New Store' })
            expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        })
    })

    it('calls updateStore when update button is clicked', async () => {
        const user = userEvent.setup()

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Store',
        })

        render(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Магазин')
        const updateButton = screen.getByRole('button')

        await user.clear(input)
        await user.type(input, 'Updated Store')
        await user.click(updateButton)

        await waitFor(() => {
            expect(mockUpdateStore).toHaveBeenCalledWith({
                _id: '123',
                name: 'Updated Store',
            })
            expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        })
    })

    it('handles createStore error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        const mockError = new Error('Network error')

        const mockCreateStore = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        vi.mocked(useCreateStoreMutation as Mock).mockReturnValue([
            mockCreateStore,
            { isLoading: false },
        ])

        render(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Магазин')
        const addButton = screen.getByRole('button')

        await user.type(input, 'New Store')
        await user.click(addButton)

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

        const mockError = new Error('Network error')

        const mockUpdateStore = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        vi.mocked(useUpdateStoreMutation as Mock).mockReturnValue([
            mockUpdateStore,
            { isLoading: false },
        ])

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Store',
        })

        render(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Магазин')
        const addButton = screen.getByRole('button')

        await user.type(input, 'New Store')
        await user.click(addButton)

        expect(mockUpdateStore).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
