import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockRegister } from '@/tests/mocks/form'
import { InputSection, type InputSectionProps } from './InputSection'

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
})
