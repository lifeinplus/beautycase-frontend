import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Label } from '../Label'

describe('Label', () => {
    it('renders label text', () => {
        render(<Label text="Username" />)
        const label = screen.getByText('Username')
        expect(label).toBeInTheDocument()
    })

    it('renders with required prop showing asterisk', () => {
        render(<Label text="Password" required />)
        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByText('*')).toHaveClass('text-danger')
    })

    it('renders children inside the label', () => {
        render(
            <Label text="Username">
                <input data-testid="mocked-input-username" />
            </Label>
        )
        expect(screen.getByText('Username')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-input-username')).toBeInTheDocument()
    })
})
