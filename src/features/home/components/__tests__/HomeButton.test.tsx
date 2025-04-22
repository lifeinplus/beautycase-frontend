import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { renderWithRouter } from '../../../../tests/mocks/wrappers'
import { HomeButton } from '../HomeButton'

describe('HomeButton', () => {
    const mockProps = {
        to: '/test',
        label: 'Test Label',
    }

    it('renders with the label correctly', () => {
        renderWithRouter(<HomeButton {...mockProps} />)

        const link = screen.getByRole('link', { name: mockProps.label })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', mockProps.to)
        expect(link).toHaveClass('home-button')
    })
})
