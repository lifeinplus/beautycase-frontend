import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockFieldError, mockRegister } from '../../../../tests/mocks/form'
import { InputSection, type InputSectionProps } from '../InputSection'

vi.mock('../Label')

describe('InputSection', () => {
    const mockProps: InputSectionProps = {
        label: 'Test Label',
        register: mockRegister,
        type: 'text',
    }

    it('renders with the label and input correctly', () => {
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
        render(<InputSection {...mockProps} error={mockFieldError} />)

        const error = screen.getByText(mockFieldError.message!)
        expect(error).toBeInTheDocument()
        expect(error).toHaveClass('form-error')

        const input = screen.getByRole('textbox')
        expect(input).toHaveClass('border-error')
    })
})
