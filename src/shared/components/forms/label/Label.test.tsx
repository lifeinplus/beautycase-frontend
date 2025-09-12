import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Label } from './Label'

describe('Label', () => {
    it('renders label text', () => {
        render(<Label text="Username" />)
        expect(screen.getByText('Username')).toBeInTheDocument()
    })

    it('renders with required prop showing asterisk', () => {
        render(<Label text="Password" required />)
        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByText('*')).toHaveClass(/textDanger/)
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
