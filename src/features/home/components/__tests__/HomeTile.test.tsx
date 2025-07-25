import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import { HomeTile } from '../HomeTile'

describe('HomeTile', () => {
    const MockIcon = () => <svg data-testid="mocked-icon" />

    const mockProps = {
        to: '/test',
        label: 'Test Label',
    }

    it('renders with the label correctly', () => {
        renderWithRouter(<HomeTile icon={MockIcon} {...mockProps} />)

        expect(
            screen.getByRole('link', { name: mockProps.label })
        ).toHaveAttribute('href', mockProps.to)
    })
})
