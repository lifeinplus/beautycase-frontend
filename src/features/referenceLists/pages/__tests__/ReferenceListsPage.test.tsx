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

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<ReferenceListsPage />)

        expect(
            screen.getByTestId('mocked-reference-lists-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-reference-lists-table')
        ).toBeInTheDocument()
    })
})
