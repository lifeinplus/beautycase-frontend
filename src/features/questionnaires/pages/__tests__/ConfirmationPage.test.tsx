import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { ConfirmationPage } from '../ConfirmationPage'

vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')

describe('ConfirmationPage', () => {
    it('renders components correctly', () => {
        render(<ConfirmationPage />)

        const header = screen.getByTestId('mocked-header')
        const hero = screen.getByTestId('mocked-header')
        const navBar = screen.getByTestId('mocked-nav-bar')

        expect(header).toBeInTheDocument()
        expect(hero).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()
    })
})
