import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { CheckboxItem } from '../CheckboxItem'

describe('CheckboxItem', () => {
    const mockRegister = {
        name: 'testName',
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
    }

    const defaultProps = {
        id: 'test-id',
        label: 'Test Label',
        register: mockRegister,
    }

    it('renders correctly with provided props', () => {
        render(<CheckboxItem {...defaultProps} />)

        const label = screen.getByText('Test Label')
        const checkbox = screen.getByRole('checkbox')

        expect(label).toBeInTheDocument()
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toHaveAttribute('id', 'test-id')
        expect(checkbox).toHaveAttribute('type', 'checkbox')
    })

    it('applies the register props to the checkbox input', () => {
        render(<CheckboxItem {...defaultProps} />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toHaveAttribute('name', 'testName')
    })

    it('triggers onChange when clicked', async () => {
        const user = userEvent.setup()

        render(<CheckboxItem {...defaultProps} />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()

        await user.click(checkbox)
        expect(checkbox).toBeChecked()
        expect(mockRegister.onChange).toHaveBeenCalled()

        await user.click(checkbox)
        expect(checkbox).not.toBeChecked()
    })
})
