import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    ButtonNavigateSection,
    type ButtonNavigateSectionProps,
} from '@/shared/components/forms/button-navigate/section/ButtonNavigateSection'
import { mockFieldError } from '@/tests/mocks/form'

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

    it('renders error message and applies error class', () => {
        render(
            <ButtonNavigateSection
                {...mockProps}
                error={mockFieldError.message}
            />
        )

        expect(screen.getByText(mockFieldError.message!)).toBeInTheDocument()
    })

    it('calls onNavigate when button is clicked', async () => {
        const user = userEvent.setup()

        render(<ButtonNavigateSection {...mockProps} />)
        await user.click(screen.getByRole('button'))

        expect(mockProps.onNavigate).toHaveBeenCalledTimes(1)
    })
})
