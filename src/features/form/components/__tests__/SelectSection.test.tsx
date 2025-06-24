import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockFieldError, mockRegister } from '../../../../tests/mocks/form'
import type { SelectOption } from '../../types'
import { SelectSection, type SelectSectionProps } from '../SelectSection'

vi.mock('../Label')

describe('SelectSection', () => {
    const mockOptions: SelectOption[] = [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' },
    ]

    const mockProps: SelectSectionProps = {
        label: 'Test Label',
        register: mockRegister,
        options: mockOptions,
    }

    it('renders with the label correctly', () => {
        render(<SelectSection {...mockProps} />)

        const label = screen.getByTestId('mocked-label')
        expect(label).toBeInTheDocument()
        expect(label).toHaveTextContent(mockProps.label)
    })

    it('renders with options', () => {
        render(<SelectSection {...mockProps} />)

        expect(screen.getByRole('combobox')).toBeInTheDocument()
        expect(screen.getByText('select')).toBeInTheDocument()
        expect(screen.getByText('Option 1')).toBeInTheDocument()
        expect(screen.getByText('Option 2')).toBeInTheDocument()
        expect(screen.getByText('Option 3')).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(<SelectSection {...mockProps} description={mockDescription} />)

        const description = screen.getByText(mockDescription)
        expect(description).toBeInTheDocument()
        expect(description).toHaveClass('form-description')
    })

    it('renders error message and applies error class', () => {
        render(<SelectSection {...mockProps} error={mockFieldError.message} />)

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()

        const select = screen.getByRole('combobox')
        expect(select).toHaveClass('border-error')
    })
})
