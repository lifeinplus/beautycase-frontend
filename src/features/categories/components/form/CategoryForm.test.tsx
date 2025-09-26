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
import { mockCategory1 } from '../../api/__mocks__/categoriesApi'
import {
    useCreateCategoryMutation,
    useUpdateCategoryByIdMutation,
} from '../../api/categoriesApi'
import { CategoryForm } from './CategoryForm'

vi.mock('@/app/hooks/hooks')
vi.mock('@/shared/components/forms/button/Button')
vi.mock('../../api/categoriesApi')

describe('CategoryForm', () => {
    const mockRef = { current: { focusInput: vi.fn() } as FormRef }

    const mockCreateCategory = vi.fn()
    const mockCreateUnwrap = vi.fn()

    const mockUpdateCategoryById = vi.fn()
    const mockUpdateUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        vi.mocked(useCreateCategoryMutation as Mock).mockReturnValue([
            mockCreateCategory,
            { isLoading: false },
        ])

        mockCreateCategory.mockReturnValue({ unwrap: mockCreateUnwrap })
        mockCreateUnwrap.mockResolvedValue({})

        vi.mocked(useUpdateCategoryByIdMutation as Mock).mockReturnValue([
            mockUpdateCategoryById,
            { isLoading: false },
        ])

        mockUpdateCategoryById.mockReturnValue({ unwrap: mockUpdateUnwrap })
        mockUpdateUnwrap.mockResolvedValue({})
    })

    it('renders the form correctly', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Category',
        })

        renderWithProviders(<CategoryForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('fields.name.label')
        const button = screen.getByTestId('mocked-button')

        expect(input).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    it('focuses input when focusInput method is called', () => {
        render(<CategoryForm ref={mockRef} />)

        const input = screen.getByPlaceholderText('fields.name.label')
        vi.spyOn(input, 'focus')

        mockRef.current.focusInput()

        expect(input.focus).toHaveBeenCalled()
    })

    it('calls createCategory when add button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProviders(<CategoryForm ref={mockRef} />)

        await user.type(
            screen.getByPlaceholderText('fields.type.label'),
            'New Type'
        )

        await user.type(
            screen.getByPlaceholderText('fields.name.label'),
            'New Category'
        )

        await user.click(screen.getByTestId('mocked-button'))

        expect(mockCreateCategory).toHaveBeenCalledWith({
            name: 'New Category',
            type: 'New Type',
        })

        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('calls updateCategory when update button is clicked', async () => {
        const user = userEvent.setup()

        const { _id, ...category } = mockCategory1

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Category',
            type: 'Test Type',
        })

        render(<CategoryForm ref={mockRef} />)

        const inputType = screen.getByPlaceholderText('fields.type.label')
        await user.clear(inputType)
        await user.type(inputType, category.type)

        const inputName = screen.getByPlaceholderText('fields.name.label')
        await user.clear(inputName)
        await user.type(inputName, category.name)

        await user.click(screen.getByTestId('mocked-button'))

        expect(mockUpdateCategoryById).toHaveBeenCalledWith({
            id: '123',
            category,
        })

        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('handles createCategory error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockCreateUnwrap.mockRejectedValue(mockError)

        render(<CategoryForm ref={mockRef} />)

        await user.type(
            screen.getByPlaceholderText('fields.type.label'),
            'New Type'
        )

        await user.type(
            screen.getByPlaceholderText('fields.name.label'),
            'New Category'
        )

        await user.click(screen.getByTestId('mocked-button'))

        expect(mockCreateCategory).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        mockConsoleError.mockRestore()
    })

    it('handles updateCategory error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUpdateUnwrap.mockRejectedValue(mockError)

        vi.mocked(useAppSelector).mockReturnValue({
            _id: '123',
            name: 'Test Category',
        })

        render(<CategoryForm ref={mockRef} />)

        await user.type(
            screen.getByPlaceholderText('fields.type.label'),
            'New Type'
        )

        await user.type(
            screen.getByPlaceholderText('fields.name.label'),
            'New Category'
        )

        await user.click(screen.getByTestId('mocked-button'))

        expect(mockUpdateCategoryById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        mockConsoleError.mockRestore()
    })

    it('renders error message and applies error class', async () => {
        const user = userEvent.setup()

        render(<CategoryForm ref={mockRef} />)
        await user.click(screen.getByTestId('mocked-button'))

        expect(screen.getByText('fields.name.errors.required')).toHaveClass(
            /error/
        )
    })
})
