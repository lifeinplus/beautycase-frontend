import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Input } from '../Input'

describe('Input', () => {
    it('renders with default className', () => {
        render(<Input data-testid="test-input" />)
        const inputElement = screen.getByTestId('test-input')
        expect(inputElement).toBeInTheDocument()
        expect(inputElement).toHaveClass('form-input')
    })

    it('renders with custom className', () => {
        const customClass = 'custom-input'
        render(<Input data-testid="test-input" className={customClass} />)
        const inputElement = screen.getByTestId('test-input')
        expect(inputElement).toHaveClass('form-input')
        expect(inputElement).toHaveClass(customClass)
    })

    it('accepts user input', async () => {
        const user = userEvent.setup()

        render(<Input data-testid="test-input" />)

        const inputElement = screen.getByTestId('test-input')
        await user.type(inputElement, 'Hello')

        expect(inputElement).toHaveValue('Hello')
    })

    it('handles blur events', () => {
        const handleBlur = vi.fn()
        render(<Input data-testid="test-input" onBlur={handleBlur} />)

        const inputElement = screen.getByTestId('test-input')
        fireEvent.blur(inputElement)

        expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('handles focus events', () => {
        const handleFocus = vi.fn()
        render(<Input data-testid="test-input" onFocus={handleFocus} />)

        const inputElement = screen.getByTestId('test-input')
        fireEvent.focus(inputElement)

        expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('handles placeholder text', () => {
        render(<Input placeholder="Enter text" />)
        const inputElement = screen.getByPlaceholderText('Enter text')
        expect(inputElement).toBeInTheDocument()
    })

    it('supports different input types', () => {
        render(<Input data-testid="test-input" type="password" />)
        const inputElement = screen.getByTestId('test-input')
        expect(inputElement).toHaveAttribute('type', 'password')
    })

    it('supports disabled state', () => {
        render(<Input data-testid="test-input" disabled />)
        const inputElement = screen.getByTestId('test-input')
        expect(inputElement).toBeDisabled()
    })

    it('triggers onChange event', async () => {
        const user = userEvent.setup()
        const handleChange = vi.fn()

        render(<Input data-testid="test-input" onChange={handleChange} />)

        const inputElement = screen.getByTestId('test-input')
        await user.type(inputElement, 'Test')

        expect(handleChange).toHaveBeenCalled()
    })
})
