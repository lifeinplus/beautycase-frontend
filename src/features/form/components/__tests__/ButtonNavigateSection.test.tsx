import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ButtonNavigateSection } from '../ButtonNavigateSection'

describe('ButtonNavigateSection', () => {
    const mockOnNavigate = vi.fn()

    const mockLabel = 'Test Label'
    const mockText = 'Test Text'

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
        const mockDescription = 'Test Description'

        render(
            <ButtonNavigateSection
                label={mockLabel}
                onNavigate={mockOnNavigate}
                text={mockText}
                description={mockDescription}
            />
        )

        const description = screen.getByText(mockDescription)
        expect(description).toBeInTheDocument()
        expect(description).toHaveClass('form-description')
    })

    it('renders error message and applies error class', () => {
        const mockError = {
            message: 'This field is required',
            type: 'required',
        }

        render(
            <ButtonNavigateSection
                label={mockLabel}
                onNavigate={mockOnNavigate}
                text={mockText}
                error={mockError}
            />
        )

        const error = screen.getByText(mockError.message)
        expect(error).toBeInTheDocument()

        const button = screen.getByRole('button')
        expect(button).toHaveClass('border-error')
    })

    it('calls onNavigate when button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <ButtonNavigateSection
                label={mockLabel}
                onNavigate={mockOnNavigate}
                text={mockText}
            />
        )

        const button = screen.getByRole('button')
        await user.click(button)

        expect(mockOnNavigate).toHaveBeenCalledTimes(1)
    })
})
