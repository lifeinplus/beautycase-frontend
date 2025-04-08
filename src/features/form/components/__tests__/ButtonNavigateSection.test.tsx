import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ButtonNavigateSection } from '../ButtonNavigateSection'

describe('ButtonNavigateSection', () => {
    const mockOnNavigate = vi.fn()

    const mockLabel = 'Test Label'
    const mockText = 'Test Text'
    const mockDescription = 'Test Description'
    const mockError = { message: 'This is an error', type: 'required' }

    it('renders with required props', () => {
        render(
            <ButtonNavigateSection
                label={mockLabel}
                onNavigate={mockOnNavigate}
                text={mockText}
            />
        )

        expect(screen.getByText(mockLabel)).toBeInTheDocument()
        expect(screen.getByText(mockText)).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        render(
            <ButtonNavigateSection
                label={mockLabel}
                onNavigate={mockOnNavigate}
                text={mockText}
                description={mockDescription}
            />
        )

        expect(screen.getByText(mockDescription)).toBeInTheDocument()
    })

    it('renders error message if error provided', () => {
        render(
            <ButtonNavigateSection
                label={mockLabel}
                onNavigate={mockOnNavigate}
                text={mockText}
                error={mockError}
            />
        )

        expect(screen.getByText(mockError.message)).toBeInTheDocument()
    })

    it('calls onNavigate when button is clicked', async () => {
        render(
            <ButtonNavigateSection
                label={mockLabel}
                onNavigate={mockOnNavigate}
                text={mockText}
            />
        )

        const button = screen.getByRole('button')
        await userEvent.click(button)

        expect(mockOnNavigate).toHaveBeenCalledTimes(1)
    })

    it('applies border-error class when error is present', () => {
        render(
            <ButtonNavigateSection
                label={mockLabel}
                onNavigate={mockOnNavigate}
                text={mockText}
                error={mockError}
            />
        )

        const button = screen.getByRole('button')

        expect(button.className).toContain('border-error')
    })
})
