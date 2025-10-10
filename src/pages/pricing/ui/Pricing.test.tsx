import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import { Pricing } from './Pricing'

vi.mock('@/shared/components/layout/header/Header')
vi.mock('@/widgets/online-services/ui/OnlineServices')

describe('Pricing page', () => {
    it('renders all main components', () => {
        renderWithRouter(<Pricing />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByText('hero.headline')).toBeInTheDocument()
        expect(screen.getByText('hero.byline')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-online-services')).toBeInTheDocument()
    })

    it('has correct semantic structure', () => {
        renderWithRouter(<Pricing />)

        expect(screen.getAllByRole('article')).toHaveLength(2)
        expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('applies correct CSS classes for layout', () => {
        renderWithRouter(<Pricing />)
        expect(screen.getByRole('main')).toHaveClass(/_content_/)
    })
})
