import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, vi, expect, beforeEach, it, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { renderWithProvider } from '../../../../tests/mocks/wrappers'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import type { FormRef } from '../../../form/types'
import {
    useCreateStoreMutation,
    useUpdateStoreMutation,
} from '../../storesApiSlice'
import { StoreForm } from '../StoreForm'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/ui/Button')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../storesApiSlice')

describe('StoreForm', () => {
    const mockRef = { current: { focusInput: vi.fn() } as FormRef }

    const mockCreateStore = vi.fn()
    const mockCreateUnwrap = vi.fn()

    const mockUpdateStore = vi.fn()
    const mockUpdateUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        vi.mocked(useCreateStoreMutation as Mock).mockReturnValue([
            mockCreateStore,
            { isLoading: false },
        ])

        mockCreateStore.mockReturnValue({ unwrap: mockCreateUnwrap })
        mockCreateUnwrap.mockResolvedValue({})

        vi.mocked(useUpdateStoreMutation as Mock).mockReturnValue([
            mockUpdateStore,
            { isLoading: false },
        ])

        mockUpdateStore.mockReturnValue({ unwrap: mockUpdateUnwrap })
        mockUpdateUnwrap.mockResolvedValue({})
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

    it('calls createStore when add button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProvider(<StoreForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Магазин')
        const addButton = screen.getByRole('button')

        await user.type(input, 'New Store')
        await user.click(addButton)

        expect(mockCreateStore).toHaveBeenCalledWith({ name: 'New Store' })
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
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

        expect(mockUpdateStore).toHaveBeenCalledWith({
            _id: '123',
            name: 'Updated Store',
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

        mockUpdateUnwrap.mockRejectedValue(mockError)

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

    it('renders error message and applies error class', async () => {
        const user = userEvent.setup()

        render(<StoreForm ref={mockRef} />)

        const button = screen.getByTestId('mocked-button')
        await user.click(button)

        const error = screen.getByText('Укажите название магазина')
        expect(error).toBeInTheDocument()
        expect(error).toHaveClass('form-error')
    })
})
