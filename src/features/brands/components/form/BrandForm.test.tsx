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
import { mockBrand1 } from '../../api/__mocks__/brandsApi'
import {
    useCreateBrandMutation,
    useUpdateBrandByIdMutation,
} from '../../api/brandsApi'
import { BrandForm } from './BrandForm'

vi.mock('@/app/hooks/hooks')
vi.mock('../../api/brandsApi')

describe('BrandForm', () => {
    const mockRef = { current: { focusInput: vi.fn() } as FormRef }

    const mockCreateBrand = vi.fn()
    const mockCreateUnwrap = vi.fn()

    const mockUpdateBrandById = vi.fn()
    const mockUpdateUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        vi.mocked(useCreateBrandMutation as Mock).mockReturnValue([
            mockCreateBrand,
            { isLoading: false },
        ])

        mockCreateBrand.mockReturnValue({ unwrap: mockCreateUnwrap })
        mockCreateUnwrap.mockResolvedValue({})

        vi.mocked(useUpdateBrandByIdMutation as Mock).mockReturnValue([
            mockUpdateBrandById,
            { isLoading: false },
        ])

        mockUpdateBrandById.mockReturnValue({ unwrap: mockUpdateUnwrap })
        mockUpdateUnwrap.mockResolvedValue({})
    })

    it('renders the form correctly', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Brand',
        })

        renderWithProviders(<BrandForm ref={mockRef} />)

        expect(
            screen.getByPlaceholderText('fields.name.label')
        ).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('focuses input when focusInput method is called', () => {
        render(<BrandForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('fields.name.label')
        vi.spyOn(input, 'focus')

        mockRef.current.focusInput()

        expect(input.focus).toHaveBeenCalled()
    })

    it('calls createBrand when add button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProviders(<BrandForm ref={mockRef} />)

        await user.type(
            screen.getByPlaceholderText('fields.name.label'),
            'New Brand'
        )

        await user.click(screen.getByRole('button'))

        expect(mockCreateBrand).toHaveBeenCalledWith({ name: 'New Brand' })
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('calls updateBrand when update button is clicked', async () => {
        const user = userEvent.setup()

        const { _id, ...brand } = mockBrand1

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Brand',
        })

        render(<BrandForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('fields.name.label')
        await user.clear(input)
        await user.type(input, brand.name)

        await user.click(screen.getByRole('button'))

        expect(mockUpdateBrandById).toHaveBeenCalledWith({
            id: '123',
            brand,
        })

        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('handles createBrand error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockCreateUnwrap.mockRejectedValue(mockError)

        render(<BrandForm ref={mockRef} />)

        await user.type(
            screen.getByPlaceholderText('fields.name.label'),
            'New Brand'
        )

        await user.click(screen.getByRole('button'))

        expect(mockCreateBrand).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        mockConsoleError.mockRestore()
    })

    it('handles updateBrand error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUpdateUnwrap.mockRejectedValue(mockError)

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Brand',
        })

        render(<BrandForm ref={mockRef} />)

        await user.type(
            screen.getByPlaceholderText('fields.name.label'),
            'New Brand'
        )

        await user.click(screen.getByRole('button'))

        expect(mockUpdateBrandById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        mockConsoleError.mockRestore()
    })

    it('renders error message', async () => {
        const user = userEvent.setup()

        render(<BrandForm ref={mockRef} />)
        await user.click(screen.getByRole('button'))

        expect(
            screen.getByText('fields.name.errors.required')
        ).toBeInTheDocument()
    })
})
