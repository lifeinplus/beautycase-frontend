import { render, screen, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mockedNavigate } from '../../tests/mocks/router'
import { TopPanel } from '../TopPanel'

describe('TopPanel component', () => {
    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockedNavigate)
    })

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
        expect(mockedNavigate).toHaveBeenCalledWith(-1)
    })

    it('calls custom onBack function when provided', () => {
        const mockedOnBack = vi.fn()
        render(<TopPanel title="Test Title" onBack={mockedOnBack} />)

        fireEvent.click(screen.getByRole('button'))
        expect(mockedOnBack).toHaveBeenCalledTimes(1)
        expect(mockedNavigate).not.toHaveBeenCalled()
    })
})
