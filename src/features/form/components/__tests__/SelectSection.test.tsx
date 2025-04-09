import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import type { SelectOption } from '../../types'
import { type LabelProps } from '../Label'
import { SelectSection, SelectSectionProps } from '../SelectSection'

vi.mock('../Label', () => ({
    Label: ({ children, text }: LabelProps) => (
        <label data-testid="label">
            <span>{text}</span>
            {children}
        </label>
    ),
}))

describe('SelectSection', () => {
    const mockRegister = {
        name: 'brand',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
    }

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

    it('renders with label', () => {
        render(<SelectSection {...mockProps} />)

        const label = screen.getByTestId('label')
        expect(label).toHaveTextContent('Test Label')
    })

    it('renders with options', () => {
        render(<SelectSection {...mockProps} />)

        expect(screen.getByRole('combobox')).toBeInTheDocument()
        expect(screen.getByText('Выбрать')).toBeInTheDocument()
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
        const mockError = {
            message: 'This field is required',
            type: 'required',
        }

        render(<SelectSection {...mockProps} error={mockError} />)

        const error = screen.getByText(mockError.message)
        expect(error).toBeInTheDocument()

        const select = screen.getByRole('combobox')
        expect(select).toHaveClass('border-error')
    })
})
