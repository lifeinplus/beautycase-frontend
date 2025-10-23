import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import { Tile } from './Tile'

describe('Tile', () => {
    const MockIcon = () => <svg data-testid="mocked-icon" />

    const mockProps = {
        to: '/test',
        label: 'Test Label',
    }

    it('renders with the label correctly', () => {
        renderWithRouter(<Tile icon={MockIcon} {...mockProps} />)

        expect(
            screen.getByRole('link', { name: mockProps.label })
        ).toHaveAttribute('href', mockProps.to)
    })
})
