import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ReferenceLists } from './ReferenceLists'

vi.mock('@/features/referenceLists/components/ReferenceListsMobileView')
vi.mock('@/features/referenceLists/components/ReferenceListsTable')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/layout/Header')

describe('ReferenceLists', () => {
    it('renders the component with correct structure', () => {
        render(<ReferenceLists />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
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
