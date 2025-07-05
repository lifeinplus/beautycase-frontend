import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { mockRegister } from '../../../../tests/mocks/form'
import {
    CheckboxItem,
    type CheckboxItemProps,
} from '../../../../shared/components/forms/CheckboxItem'

describe('CheckboxItem', () => {
    const mockProps: CheckboxItemProps = {
        id: 'test-id',
        label: 'Test Label',
        register: mockRegister,
    }

    it('renders correctly with provided props', () => {
        render(<CheckboxItem {...mockProps} />)

        const label = screen.getByText('Test Label')
        const checkbox = screen.getByRole('checkbox')

        expect(label).toBeInTheDocument()
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toHaveAttribute('id', 'test-id')
        expect(checkbox).toHaveAttribute('type', 'checkbox')
    })

    it('applies the register props to the checkbox input', () => {
        render(<CheckboxItem {...mockProps} />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toHaveAttribute('name', mockRegister.name)
    })

    it('triggers onChange when clicked', async () => {
        const user = userEvent.setup()

        render(<CheckboxItem {...mockProps} />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()

        await user.click(checkbox)
        expect(checkbox).toBeChecked()
        expect(mockRegister.onChange).toHaveBeenCalled()

        await user.click(checkbox)
        expect(checkbox).not.toBeChecked()
    })
})
