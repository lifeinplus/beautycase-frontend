import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { ConfirmationPage } from '../ConfirmationPage'

vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')

describe('ConfirmationPage', () => {
    it('renders components correctly', () => {
        render(<ConfirmationPage />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()
    })
})
