import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { InputSection, type InputSectionProps } from '../InputSection'

describe('InputSection', () => {
    const mockRegister = vi.fn()

    const mockProps: InputSectionProps = {
        label: 'Test Label',
        register: mockRegister('testName'),
        type: 'text',
    }

    it('renders with required label and input', () => {
        render(<InputSection {...mockProps} />)

        const label = screen.getByLabelText(mockProps.label)
        expect(label).toBeInTheDocument()

        const input = screen.getByPlaceholderText(mockProps.label)
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('type', 'text')
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(<InputSection {...mockProps} description={mockDescription} />)

        const description = screen.getByText(mockDescription)
        expect(description).toBeInTheDocument()
        expect(description).toHaveClass('form-description')
    })

    it('renders error message and applies error class', () => {
        const mockError = {
            message: 'This field is required',
            type: 'required',
        }

        render(<InputSection {...mockProps} error={mockError} />)

        const error = screen.getByText(mockError.message)
        expect(error).toBeInTheDocument()
        expect(error).toHaveClass('form-error')

        const input = screen.getByRole('textbox')
        expect(input).toHaveClass('border-error')
    })
})
