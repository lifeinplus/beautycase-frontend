import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { SelectOption } from '@/features/form/types'
import { mockFieldError, mockRegister } from '@/tests/mocks/form'
import { SelectSection, type SelectSectionProps } from './SelectSection'

vi.mock('../../label/Label')

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

        expect(screen.getByTestId('mocked-label')).toHaveTextContent(
            mockProps.label
        )
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

        expect(screen.getByText(mockDescription)).toHaveClass(/description/)
    })

    it('renders error message and applies error class', () => {
        render(<SelectSection {...mockProps} error={mockFieldError.message} />)

        expect(screen.getByText(mockFieldError.message!)).toBeInTheDocument()
        expect(screen.getByRole('combobox')).toHaveClass(/borderError/)
    })
})
