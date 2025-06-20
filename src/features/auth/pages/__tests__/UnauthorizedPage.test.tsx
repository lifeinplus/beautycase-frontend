import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '../../../../tests/mocks/wrappers'
import { UnauthorizedPage } from '../UnauthorizedPage'

vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')

describe('UnauthorizedPage', () => {
    it('renders required components', () => {
        renderWithProviders(<UnauthorizedPage />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()
    })

    it('has correct page structure', () => {
        const { container } = renderWithProviders(<UnauthorizedPage />)

        const mainContent = container.querySelector('main.page-content')
        const contentArticle = container.querySelector(
            'article.content-container'
        )

        expect(mainContent).toBeInTheDocument()
        expect(contentArticle).toBeInTheDocument()
    })
})
