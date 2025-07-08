import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '@/tests/mocks/wrappers'
import { UnauthorizedPage } from '../UnauthorizedPage'

vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/layout/Header')

describe('UnauthorizedPage', () => {
    it('renders required components', () => {
        renderWithProviders(<UnauthorizedPage />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()
    })

    it('has correct page structure', () => {
        const { container } = renderWithProviders(<UnauthorizedPage />)

        expect(
            container.querySelector("[class*='content']")
        ).toBeInTheDocument()

        expect(
            container.querySelector("[class*='contentContainer']")
        ).toBeInTheDocument()
    })
})
