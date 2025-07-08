import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Button } from '@/shared/components/forms/Button'

describe('Button', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>)

        expect(
            screen.getByRole('button', { name: 'Click me' })
        ).toHaveAttribute('type', 'button')
    })

    it('renders with correct type when specified', () => {
        render(<Button type="submit">Submit</Button>)

        expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute(
            'type',
            'submit'
        )
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

        expect(
            screen.getByRole('button', { name: 'Disabled Button' })
        ).toBeDisabled()
    })
})
