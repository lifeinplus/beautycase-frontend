import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { RadioButtonItem, type RadioButtonItemProps } from '../RadioButtonItem'

describe('RadioButtonItem', () => {
    const mockRegister = {
        name: 'test-option',
        onBlur: vi.fn(),
        onChange: vi.fn(),
        ref: vi.fn(),
    }

    const mockProps: RadioButtonItemProps = {
        id: 'option-1',
        label: 'Option 1',
        register: mockRegister,
    }

    it('renders with the correct label', () => {
        render(<RadioButtonItem {...mockProps} />)

        const label = screen.getByText(mockProps.label)
        expect(label).toBeInTheDocument()

        const radio = screen.getByRole('radio')
        expect(radio).toBeInTheDocument()
        expect(radio).toHaveAttribute('id', mockProps.id)
    })

    it('sets the value attribute when provided', () => {
        const mockValue = 'test-value'

        render(<RadioButtonItem {...mockProps} value={mockValue} />)

        const input = screen.getByRole('radio')
        expect(input).toHaveAttribute('value', mockValue)
    })

    it('passes the register props to the input element', () => {
        render(<RadioButtonItem {...mockProps} />)

        const input = screen.getByRole('radio')
        expect(input).toHaveAttribute('name', mockRegister.name)
    })

    it('triggers onChange when clicked', async () => {
        const user = userEvent.setup()

        render(<RadioButtonItem {...mockProps} value="opt2" />)

        const radio = screen.getByRole('radio')
        await user.click(radio)

        expect(mockRegister.onChange).toHaveBeenCalled()
    })
})
