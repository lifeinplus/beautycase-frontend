import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ReferenceLists } from './ReferenceLists'

vi.mock(
    '@/features/reference-lists/components/mobile-view/ReferenceListsMobileView'
)
vi.mock('@/features/reference-lists/components/table/ReferenceListsTable')
vi.mock('@/shared/components/layout/header/Header')

describe('ReferenceLists', () => {
    it('renders the component with correct structure', () => {
        render(<ReferenceLists />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByText(/hero.headline/)).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<ReferenceLists />)

        expect(
            screen.getByTestId('mocked-reference-lists-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-reference-lists-table')
        ).toBeInTheDocument()
    })
})
