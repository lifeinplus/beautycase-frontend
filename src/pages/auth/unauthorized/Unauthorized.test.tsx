import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '@/tests/mocks/wrappers'
import { Unauthorized } from './Unauthorized'

vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/layout/Header')

describe('Unauthorized', () => {
    it('renders required components', () => {
        renderWithProviders(<Unauthorized />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
    })

    it('has correct page structure', () => {
        const { container } = renderWithProviders(<Unauthorized />)

        expect(
            container.querySelector("[class*='content']")
        ).toBeInTheDocument()

        expect(
            container.querySelector("[class*='container']")
        ).toBeInTheDocument()
    })
})
