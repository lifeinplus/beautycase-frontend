import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Button } from '../Button'

describe('Button', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>)

        const button = screen.getByRole('button', { name: 'Click me' })

        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('type', 'button')
        expect(button).toHaveClass('form-button')
        expect(button).toHaveClass('text-success')
    })

    it('merges additional className prop correctly', () => {
        render(<Button className="custom-class">Custom Button</Button>)

        const button = screen.getByRole('button', { name: 'Custom Button' })

        expect(button).toHaveClass('form-button')
        expect(button).toHaveClass('text-success')
        expect(button).toHaveClass('custom-class')
    })

    it('applies the danger variant class correctly', () => {
        render(<Button variant="danger">Delete</Button>)

        const button = screen.getByRole('button', { name: 'Delete' })

        expect(button).toHaveClass('text-danger')
        expect(button).not.toHaveClass('text-success')
        expect(button).not.toHaveClass('text-warning')
    })

    it('applies the warning variant class correctly', () => {
        render(<Button variant="warning">Warning</Button>)

        const button = screen.getByRole('button', { name: 'Warning' })

        expect(button).toHaveClass('text-warning')
        expect(button).not.toHaveClass('text-success')
        expect(button).not.toHaveClass('text-danger')
    })

    it('renders with correct type when specified', () => {
        render(<Button type="submit">Submit</Button>)
        const button = screen.getByRole('button', { name: 'Submit' })
        expect(button).toHaveAttribute('type', 'submit')
    })

    it('handles click events correctly', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick}>Click Handler</Button>)
        await user.click(screen.getByRole('button', { name: 'Click Handler' }))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should be disabled when disabled prop is provided', () => {
        render(<Button disabled>Disabled Button</Button>)
        const button = screen.getByRole('button', { name: 'Disabled Button' })
        expect(button).toBeDisabled()
    })
})
