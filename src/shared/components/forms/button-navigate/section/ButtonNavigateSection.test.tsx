import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    ButtonNavigateSection,
    type ButtonNavigateSectionProps,
} from '@/shared/components/forms/button-navigate/section/ButtonNavigateSection'
import { mockFieldError } from '@/tests/mocks/form'

vi.mock('../Label')

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

        expect(screen.getByText(mockDescription)).toHaveClass(/description/)
    })

    it('renders error message and applies error class', () => {
        render(
            <ButtonNavigateSection
                {...mockProps}
                error={mockFieldError.message}
            />
        )

        expect(screen.getByText(mockFieldError.message!)).toBeInTheDocument()
        expect(screen.getByRole('button')).toHaveClass(/error/)
    })

    it('calls onNavigate when button is clicked', async () => {
        const user = userEvent.setup()

        render(<ButtonNavigateSection {...mockProps} />)
        await user.click(screen.getByRole('button'))

        expect(mockProps.onNavigate).toHaveBeenCalledTimes(1)
    })
})
