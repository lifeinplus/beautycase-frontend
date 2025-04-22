import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Input } from '../Input'

describe('Input', () => {
    it('renders with default className', () => {
        render(<Input data-testid="mocked-test-input" />)

        const input = screen.getByTestId('mocked-test-input')
        expect(input).toBeInTheDocument()
        expect(input).toHaveClass('form-input')
    })

    it('renders with custom className', () => {
        const customClass = 'custom-input'

        render(
            <Input data-testid="mocked-test-input" className={customClass} />
        )

        const input = screen.getByTestId('mocked-test-input')
        expect(input).toHaveClass('form-input')
        expect(input).toHaveClass(customClass)
    })

    it('accepts user input', async () => {
        const user = userEvent.setup()

        render(<Input data-testid="mocked-test-input" />)

        const input = screen.getByTestId('mocked-test-input')
        await user.type(input, 'Hello')

        expect(input).toHaveValue('Hello')
    })

    it('handles blur events', () => {
        const handleBlur = vi.fn()

        render(<Input data-testid="mocked-test-input" onBlur={handleBlur} />)

        const input = screen.getByTestId('mocked-test-input')
        fireEvent.blur(input)

        expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('handles focus events', () => {
        const handleFocus = vi.fn()

        render(<Input data-testid="mocked-test-input" onFocus={handleFocus} />)

        const input = screen.getByTestId('mocked-test-input')
        fireEvent.focus(input)

        expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('handles placeholder text', () => {
        render(<Input placeholder="Enter text" />)

        const input = screen.getByPlaceholderText('Enter text')
        expect(input).toBeInTheDocument()
    })

    it('supports different input types', () => {
        render(<Input data-testid="mocked-test-input" type="password" />)

        const input = screen.getByTestId('mocked-test-input')
        expect(input).toHaveAttribute('type', 'password')
    })

    it('supports disabled state', () => {
        render(<Input data-testid="mocked-test-input" disabled />)

        const input = screen.getByTestId('mocked-test-input')
        expect(input).toBeDisabled()
    })

    it('triggers onChange event', async () => {
        const user = userEvent.setup()
        const handleChange = vi.fn()

        render(
            <Input data-testid="mocked-test-input" onChange={handleChange} />
        )

        const input = screen.getByTestId('mocked-test-input')
        await user.type(input, 'Test')

        expect(handleChange).toHaveBeenCalled()
    })
})
