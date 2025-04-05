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
    useCreateBrandMutation,
    useUpdateBrandMutation,
} from '../../brandsApiSlice'
import { BrandForm } from '../BrandForm'

vi.mock('../../brandsApiSlice', () => ({
    useCreateBrandMutation: vi.fn(),
    useUpdateBrandMutation: vi.fn(),
}))

describe('BrandForm', () => {
    const mockRef = { current: { focusInput: vi.fn() } as FormRef }

    const mockCreateBrand = vi.fn(() => ({
        unwrap: () => Promise.resolve({}),
    }))

    const mockUpdateBrand = vi.fn(() => ({
        unwrap: () => Promise.resolve({}),
    }))

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        vi.mocked(useCreateBrandMutation as Mock).mockReturnValue([
            mockCreateBrand,
            { isLoading: false },
        ])

        vi.mocked(useUpdateBrandMutation as Mock).mockReturnValue([
            mockUpdateBrand,
            { isLoading: false },
        ])
    })

    it('renders the form correctly', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Brand',
        })

        renderWithProvider(<BrandForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Бренд')
        const button = screen.getByRole('button')

        expect(input).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    it('focuses input when focusInput method is called', () => {
        render(<BrandForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Бренд')
        vi.spyOn(input, 'focus')

        mockRef.current.focusInput()

        expect(input.focus).toHaveBeenCalled()
    })

    it('displays add button when no form data ID exists', () => {
        render(<BrandForm ref={mockRef} />)

        const addButton = screen.getByRole('button')

        expect(addButton).toHaveAttribute('type', 'submit')
        expect(addButton).toHaveClass('btn-success')
    })

    it('displays update button when form data ID exists', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Brand',
        })

        render(<BrandForm ref={mockRef} />)

        const updateButton = screen.getByRole('button')

        expect(updateButton).toHaveAttribute('type', 'submit')
        expect(updateButton).toHaveClass('btn-warning')
    })

    it('calls createBrand when add button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProvider(<BrandForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Бренд')
        const addButton = screen.getByRole('button')

        await user.type(input, 'New Brand')
        await user.click(addButton)

        await waitFor(() => {
            expect(mockCreateBrand).toHaveBeenCalledWith({ name: 'New Brand' })
            expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        })
    })

    it('calls updateBrand when update button is clicked', async () => {
        const user = userEvent.setup()

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Brand',
        })

        render(<BrandForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Бренд')
        const updateButton = screen.getByRole('button')

        await user.clear(input)
        await user.type(input, 'Updated Brand')
        await user.click(updateButton)

        await waitFor(() => {
            expect(mockUpdateBrand).toHaveBeenCalledWith({
                _id: '123',
                name: 'Updated Brand',
            })
            expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        })
    })

    it('handles createBrand error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        const mockError = new Error('Network error')

        const mockCreateBrand = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        vi.mocked(useCreateBrandMutation as Mock).mockReturnValue([
            mockCreateBrand,
            { isLoading: false },
        ])

        render(<BrandForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Бренд')
        const addButton = screen.getByRole('button')

        await user.type(input, 'New Brand')
        await user.click(addButton)

        expect(mockCreateBrand).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })

    it('handles updateBrand error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        const mockError = new Error('Network error')

        const mockUpdateBrand = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        vi.mocked(useUpdateBrandMutation as Mock).mockReturnValue([
            mockUpdateBrand,
            { isLoading: false },
        ])

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Brand',
        })

        render(<BrandForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('Бренд')
        const addButton = screen.getByRole('button')

        await user.type(input, 'New Brand')
        await user.click(addButton)

        expect(mockUpdateBrand).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
