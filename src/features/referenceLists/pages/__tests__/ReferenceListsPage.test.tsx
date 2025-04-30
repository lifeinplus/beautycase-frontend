import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { ReferenceListsPage } from '../ReferenceListsPage'

vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')
vi.mock('../../components/ReferenceListsMobileView')
vi.mock('../../components/ReferenceListsTable')

describe('ReferenceListsPage', () => {
    it('renders the component with correct structure', () => {
        render(<ReferenceListsPage />)

        const header = screen.getByTestId('mocked-header')
        const hero = screen.getByTestId('mocked-hero')
        const navBar = screen.getByTestId('mocked-nav-bar')

        expect(header).toBeInTheDocument()
        expect(hero).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<ReferenceListsPage />)

        const mobileView = screen.getByTestId(
            'mocked-reference-lists-mobile-view'
        )

        const table = screen.getByTestId('mocked-reference-lists-table')

        expect(mobileView).toBeInTheDocument()
        expect(table).toBeInTheDocument()
    })
})
