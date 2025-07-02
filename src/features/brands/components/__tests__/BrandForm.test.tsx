import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, vi, expect, beforeEach, it, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { renderWithProviders } from '../../../../tests/mocks/wrappers'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import type { FormRef } from '../../../form/types'
import {
    useCreateBrandMutation,
    useUpdateBrandByIdMutation,
} from '../../brandsApi'
import { BrandForm } from '../BrandForm'
import { mockBrand1 } from '../../__mocks__/brandsApi'

vi.mock('../../../../app/hooks')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/components/Button')
vi.mock('../../brandsApi')

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

        const input = screen.getByPlaceholderText('fields.name.label')
        const button = screen.getByTestId('mocked-button')

        expect(input).toBeInTheDocument()
        expect(button).toBeInTheDocument()
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

        await user.click(screen.getByTestId('mocked-button'))

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

        await user.click(screen.getByTestId('mocked-button'))

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

        await user.click(screen.getByTestId('mocked-button'))

        expect(mockCreateBrand).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

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

        await user.click(screen.getByTestId('mocked-button'))

        expect(mockUpdateBrandById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('renders error message and applies error class', async () => {
        const user = userEvent.setup()

        render(<BrandForm ref={mockRef} />)
        await user.click(screen.getByTestId('mocked-button'))

        const error = screen.getByText('fields.name.errors.required')
        expect(error).toBeInTheDocument()
        expect(error).toHaveClass('form-error')
    })
})
