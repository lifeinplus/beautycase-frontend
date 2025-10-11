import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '@/tests/mocks/wrappers'
import { Unauthorized } from './Unauthorized'

vi.mock('@/shared/components/navigation/nav-bar/NavBar')
vi.mock('@/shared/components/layout/header/Header')

describe('Unauthorized', () => {
    it('renders required components', () => {
        renderWithProviders(<Unauthorized />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByText(/hero.headline/)).toBeInTheDocument()
        expect(screen.getByText(/hero.byline/)).toBeInTheDocument()
    })
})
