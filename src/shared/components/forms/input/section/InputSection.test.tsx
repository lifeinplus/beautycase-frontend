import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockFieldError, mockRegister } from '@/tests/mocks/form'
import { InputSection, type InputSectionProps } from './InputSection'

vi.mock('../Label')

describe('InputSection', () => {
    const mockProps: InputSectionProps = {
        label: 'Test Label',
        register: mockRegister,
        type: 'text',
    }

    it('renders with the label and input correctly', () => {
        render(<InputSection {...mockProps} />)

        expect(screen.getByLabelText(mockProps.label)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(mockProps.label)).toHaveAttribute(
            'type',
            'text'
        )
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(<InputSection {...mockProps} description={mockDescription} />)

        expect(screen.getByText(mockDescription)).toHaveClass(/description/)
    })

    it('renders error message and applies error class', () => {
        render(<InputSection {...mockProps} error={mockFieldError.message} />)

        expect(screen.getByText(mockFieldError.message!)).toHaveClass(/error/)
        expect(screen.getByRole('textbox')).toHaveClass(/borderError/)
    })
})
