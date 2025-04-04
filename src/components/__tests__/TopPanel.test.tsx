import { render, screen, fireEvent } from '@testing-library/react'
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

        const backButton = screen.getByRole('button')

        expect(backButton).toBeInTheDocument()
        expect(backButton).toHaveClass('panel-top__button')
        expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument()
    })

    it('navigates back when default back button is clicked', () => {
        render(<TopPanel title="Test Title" />)
        fireEvent.click(screen.getByRole('button'))
        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('calls custom onBack function when provided', () => {
        const mockOnBack = vi.fn()

        render(<TopPanel title="Test Title" onBack={mockOnBack} />)

        fireEvent.click(screen.getByRole('button'))

        expect(mockOnBack).toHaveBeenCalledTimes(1)
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
