import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { mockNavigate } from '@/tests/mocks/router'
import { TopPanel } from './TopPanel'

describe('TopPanel', () => {
    const mockTitle = 'Test Title'

    it('renders back button with chevron icon', () => {
        render(<TopPanel title={mockTitle} />)
        expect(screen.getByTestId('mocked-icon')).toBeInTheDocument()
    })

    it('navigates back when default back button is clicked', async () => {
        const user = userEvent.setup()

        render(<TopPanel title={mockTitle} />)
        await user.click(screen.getByRole('button'))

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('calls custom onBack function when provided', async () => {
        const user = userEvent.setup()
        const mockOnBack = vi.fn()

        render(<TopPanel title={mockTitle} onBack={mockOnBack} />)
        await user.click(screen.getByRole('button'))

        expect(mockOnBack).toHaveBeenCalledTimes(1)
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
