import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from '../Spinner'

describe('Spinner Component', () => {
    it('renders the spinner container', () => {
        render(<Spinner />)
        const container = screen.getByRole('presentation')
        expect(container).toBeInTheDocument()
        expect(container).toHaveClass(
            'flex min-h-screen items-center justify-center'
        )
    })

    it('has proper styling for full screen centering', () => {
        render(<Spinner />)
        const container = screen.getByTestId('spinner').parentElement

        expect(container).toHaveClass('min-h-screen')
        expect(container).toHaveClass('items-center')
        expect(container).toHaveClass('justify-center')
    })

    it('has proper styling for the spinner animation', () => {
        render(<Spinner />)
        const spinner = screen.getByTestId('spinner')

        expect(spinner).toHaveClass('h-10')
        expect(spinner).toHaveClass('w-10')
        expect(spinner).toHaveClass('animate-spin')
        expect(spinner).toHaveClass('rounded-full')
        expect(spinner).toHaveClass('border-b-2')
        expect(spinner).toHaveClass('border-t-2')
        expect(spinner).toHaveClass('border-rose-500')
    })
})
