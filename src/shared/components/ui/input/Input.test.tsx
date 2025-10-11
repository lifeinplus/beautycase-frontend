import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input } from './Input'

describe('Input', () => {
    it('renders with custom className', () => {
        const customClass = 'custom-input'

        render(
            <Input data-testid="mocked-test-input" className={customClass} />
        )

        const input = screen.getByTestId('mocked-test-input')
        expect(input).toHaveClass(/input/)
        expect(input).toHaveClass(customClass)
    })

    it('accepts user input', async () => {
        const user = userEvent.setup()

        render(<Input data-testid="mocked-test-input" />)

        const input = screen.getByTestId('mocked-test-input')
        await user.type(input, 'Hello')

        expect(input).toHaveValue('Hello')
    })

    it('handles blur-sm events', () => {
        const handleBlur = vi.fn()

        render(<Input data-testid="mocked-test-input" onBlur={handleBlur} />)

        fireEvent.blur(screen.getByTestId('mocked-test-input'))

        expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('handles focus events', () => {
        const handleFocus = vi.fn()

        render(<Input data-testid="mocked-test-input" onFocus={handleFocus} />)

        fireEvent.focus(screen.getByTestId('mocked-test-input'))

        expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('handles placeholder text', () => {
        render(<Input placeholder="Enter text" />)

        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('supports different input types', () => {
        render(<Input data-testid="mocked-test-input" type="password" />)

        expect(screen.getByTestId('mocked-test-input')).toHaveAttribute(
            'type',
            'password'
        )
    })

    it('supports disabled state', () => {
        render(<Input data-testid="mocked-test-input" disabled />)

        expect(screen.getByTestId('mocked-test-input')).toBeDisabled()
    })

    it('triggers onChange event', async () => {
        const user = userEvent.setup()
        const handleChange = vi.fn()

        render(
            <Input data-testid="mocked-test-input" onChange={handleChange} />
        )

        await user.type(screen.getByTestId('mocked-test-input'), 'Test')

        expect(handleChange).toHaveBeenCalled()
    })
})
