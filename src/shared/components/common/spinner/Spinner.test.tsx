import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from './Spinner'

describe('Spinner', () => {
    it('renders the spinner container', () => {
        render(<Spinner />)
        const container = screen.getByRole('presentation')
        expect(container).toBeInTheDocument()
        expect(container).toHaveClass(/container/)
    })

    it('has proper styling for the spinner animation', () => {
        render(<Spinner />)
        const { firstChild: spinner } = screen.getByRole('presentation')
        expect(spinner).toHaveClass(/content/)
    })
})
