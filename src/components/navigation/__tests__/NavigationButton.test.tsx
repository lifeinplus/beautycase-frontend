import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { NavigationButton } from '../NavigationButton'

describe('NavigationButton', () => {
    const MockIcon = () => <svg data-testid="mocked-icon" />
    const mockOnClick = vi.fn()

    const mockProps = {
        icon: <MockIcon />,
        onClick: mockOnClick,
        text: 'Click Me',
    }

    it('renders the button with text and icon', () => {
        render(<NavigationButton {...mockProps} />)
        expect(screen.getByText('Click Me')).toBeInTheDocument()
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

    it('calls onClick when clicked', () => {
        render(<NavigationButton {...mockProps} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('renders the text with proper responsive classes', () => {
        render(<NavigationButton {...mockProps} />)
        const text = screen.getByText('Click Me')
        expect(text).toBeInTheDocument()
        expect(text).toHaveClass('hidden')
        expect(text).toHaveClass('lg:inline')
    })
})
