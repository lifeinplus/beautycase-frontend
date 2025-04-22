import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import {
    NavigationButton,
    type NavigationButtonProps,
} from '../NavigationButton'

describe('NavigationButton', () => {
    const MockIcon = () => <svg data-testid="mocked-icon" />

    const mockOnClick = vi.fn()

    const mockProps: NavigationButtonProps = {
        icon: <MockIcon />,
        onClick: mockOnClick,
        text: 'Test Text',
    }

    it('renders the button with text and icon', () => {
        render(<NavigationButton {...mockProps} />)

        expect(screen.getByText(mockProps.text)).toBeInTheDocument()
        expect(screen.getByTestId('mocked-icon')).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<NavigationButton {...mockProps} className="custom-class" />)

        const button = screen.getByRole('button')

        expect(button).toHaveClass('nav-btn')
        expect(button).toHaveClass('custom-class')
    })

    it('renders with default className', () => {
        render(<NavigationButton {...mockProps} />)

        const button = screen.getByRole('button')

        expect(button).toHaveClass('nav-btn')
        expect(button).not.toHaveClass('custom-class')
    })

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup()

        render(<NavigationButton {...mockProps} />)

        const button = screen.getByRole('button')
        await user.click(button)

        expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('renders the text with proper responsive classes', () => {
        render(<NavigationButton {...mockProps} />)

        const text = screen.getByText(mockProps.text)

        expect(text).toBeInTheDocument()
        expect(text).toHaveClass('hidden')
        expect(text).toHaveClass('lg:inline')
    })
})
