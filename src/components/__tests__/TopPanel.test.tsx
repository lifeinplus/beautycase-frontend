import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { mockNavigate } from '../../tests/mocks/router'
import { TopPanel } from '../TopPanel'

describe('TopPanel', () => {
    it('renders with the correct title', () => {
        const title = 'Test Title'

        render(<TopPanel title={title} />)

        expect(screen.getByText(title)).toBeInTheDocument()
        expect(screen.getByText(title)).toHaveClass('panel-top__title')
    })

    it('renders back button with chevron icon', () => {
        render(<TopPanel title="Test Title" />)

        const icon = screen.getByTestId('mocked-chevron-left-icon')
        expect(icon).toBeInTheDocument()

        const backButton = screen.getByRole('button')
        expect(backButton).toBeInTheDocument()
        expect(backButton).toHaveClass('panel-top__button')
    })

    it('navigates back when default back button is clicked', async () => {
        const user = userEvent.setup()

        render(<TopPanel title="Test Title" />)

        const button = screen.getByRole('button')
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('calls custom onBack function when provided', async () => {
        const user = userEvent.setup()
        const mockOnBack = vi.fn()

        render(<TopPanel title="Test Title" onBack={mockOnBack} />)

        const button = screen.getByRole('button')
        await user.click(button)

        expect(mockOnBack).toHaveBeenCalledTimes(1)
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
