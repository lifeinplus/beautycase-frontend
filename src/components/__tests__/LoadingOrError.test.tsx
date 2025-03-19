import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LoadingOrError } from '../LoadingOrError'

describe('LoadingOrError', () => {
    it('renders the message correctly', () => {
        const testMessage = 'Loading data...'
        render(<LoadingOrError message={testMessage} />)

        const messageElement = screen.getByText(testMessage)

        expect(messageElement).toBeInTheDocument()
        expect(messageElement).toHaveClass('text-center text-gray-500')
    })

    it('renders the component with different messages', () => {
        const testMessage1 = 'Loading...'
        const testMessage2 = 'Error occurred!'

        const { rerender } = render(<LoadingOrError message={testMessage1} />)
        expect(screen.getByText(testMessage1)).toBeInTheDocument()

        rerender(<LoadingOrError message={testMessage2} />)
        expect(screen.getByText(testMessage2)).toBeInTheDocument()
    })

    it('applies the correct styling to the container', () => {
        render(<LoadingOrError message="Test message" />)

        const container = screen.getByText('Test message').parentElement

        expect(container).toHaveClass('flex')
        expect(container).toHaveClass('h-[50vh]')
        expect(container).toHaveClass('items-center')
        expect(container).toHaveClass('justify-center')
    })

    it('applies the correct styling to the text', () => {
        render(<LoadingOrError message="Test message" />)

        const textElement = screen.getByText('Test message')

        expect(textElement).toHaveClass('text-center')
        expect(textElement).toHaveClass('text-gray-500')
    })
})
