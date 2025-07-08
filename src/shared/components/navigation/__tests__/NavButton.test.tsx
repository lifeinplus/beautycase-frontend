import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { NavButton, type NavButtonProps } from '../NavButton'

describe('NavButton', () => {
    const MockIcon = () => <svg data-testid="mocked-icon" />

    const mockOnClick = vi.fn()

    const mockProps: NavButtonProps = {
        icon: MockIcon,
        onClick: mockOnClick,
        label: 'Test Text',
    }

    it('renders the button with text and icon', () => {
        render(<NavButton {...mockProps} />)

        expect(screen.getByText(mockProps.label)).toBeInTheDocument()
        expect(screen.getByTestId('mocked-icon')).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<NavButton {...mockProps} className="custom-class" />)

        const button = screen.getByRole('button')

        expect(button).toHaveClass(/navBtn/)
        expect(button).toHaveClass('custom-class')
    })

    it('renders with default className', () => {
        render(<NavButton {...mockProps} />)

        const button = screen.getByRole('button')

        expect(button).toHaveClass(/navBtn/)
        expect(button).not.toHaveClass('custom-class')
    })

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup()

        render(<NavButton {...mockProps} />)
        await user.click(screen.getByRole('button'))

        expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('renders the text with proper responsive classes', () => {
        render(<NavButton {...mockProps} />)

        const text = screen.getByText(mockProps.label)

        expect(text).toBeInTheDocument()
        expect(text).toHaveClass('hidden')
        expect(text).toHaveClass('lg:inline')
    })
})
