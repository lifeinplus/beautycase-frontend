import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { ConfirmationPage } from '../ConfirmationPage'

vi.mock('../../../../shared/components/navigation/NavBar')
vi.mock('../../../../shared/components/layout/Header')
vi.mock('../../../../shared/components/layout/Hero')

describe('ConfirmationPage', () => {
    it('renders components correctly', () => {
        render(<ConfirmationPage />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()
    })
})
