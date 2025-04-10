import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import {
    ButtonNavigateSection,
    type ButtonNavigateSectionProps,
} from '../ButtonNavigateSection'

describe('ButtonNavigateSection', () => {
    const mockProps: ButtonNavigateSectionProps = {
        label: 'Test Label',
        onNavigate: vi.fn(),
        text: 'Test Text',
    }

    it('renders with required props', () => {
        render(<ButtonNavigateSection {...mockProps} />)

        expect(screen.getByText(mockProps.label)).toBeInTheDocument()
        expect(screen.getByText(mockProps.text)).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders description if provided', () => {
        const mockDescription = 'Test Description'

        render(
            <ButtonNavigateSection
                {...mockProps}
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

        render(<ButtonNavigateSection {...mockProps} error={mockError} />)

        const error = screen.getByText(mockError.message)
        expect(error).toBeInTheDocument()

        const button = screen.getByRole('button')
        expect(button).toHaveClass('border-error')
    })

    it('calls onNavigate when button is clicked', async () => {
        const user = userEvent.setup()

        render(<ButtonNavigateSection {...mockProps} />)

        const button = screen.getByRole('button')
        await user.click(button)

        expect(mockProps.onNavigate).toHaveBeenCalledTimes(1)
    })
})
