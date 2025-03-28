import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithProvider } from '../../../../tests'
import { UnauthorizedPage } from '../UnauthorizedPage'

describe('UnauthorizedPage', () => {
    it('renders the page with correct text', () => {
        renderWithProvider(<UnauthorizedPage />)

        const headline = screen.getByRole('heading', {
            name: /Доступ запрещен/i,
        })

        const byline = screen.getByText(
            /У вас нет разрешения на просмотр этой страницы/i
        )

        expect(headline).toBeInTheDocument()
        expect(byline).toBeInTheDocument()
    })

    it('renders required components', () => {
        const { container } = renderWithProvider(<UnauthorizedPage />)

        const header = container.querySelector('header')
        const navBar = container.querySelector('nav')

        expect(header).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()
    })

    it('has correct page structure', () => {
        const { container } = renderWithProvider(<UnauthorizedPage />)

        const mainContent = container.querySelector('main.page-content')
        const contentArticle = container.querySelector(
            'article.content-container'
        )

        expect(mainContent).toBeInTheDocument()
        expect(contentArticle).toBeInTheDocument()
    })
})
