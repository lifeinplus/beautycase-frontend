import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockT } from '@/tests/mocks/translation'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { BackstageGallery } from './BackstageGallery'

vi.mock('@/app/hooks/hooks')
vi.mock('@/shared/components/layout/header/Header')

describe('BackstageGallery', () => {
    it('renders Header and Hero components', () => {
        renderWithRouter(<BackstageGallery />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByText(/title/)).toBeInTheDocument()
    })

    it('renders two tile components', () => {
        renderWithRouter(<BackstageGallery />)

        expect(
            screen.getByText('tiles.referenceLists.label')
        ).toBeInTheDocument()
        expect(screen.getByText('tiles.users.label')).toBeInTheDocument()
    })

    it('translates headline title', () => {
        renderWithRouter(<BackstageGallery />)
        expect(mockT).toHaveBeenCalledWith('title')
    })
})
