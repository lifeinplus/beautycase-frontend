import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { mockT } from '@/tests/mocks/translation'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { QuestionnaireGallery } from './QuestionnaireGallery'

vi.mock('@/app/hooks/hooks')
vi.mock('@/shared/components/layout/header/Header')

describe('QuestionnaireGallery', () => {
    it('renders Header and Hero components', () => {
        renderWithRouter(<QuestionnaireGallery />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByText(/headlineList/)).toBeInTheDocument()
    })

    it('renders two QuestionnaireCard components', () => {
        renderWithRouter(<QuestionnaireGallery />)

        expect(screen.getByText('makeupBag.hero.byline')).toBeInTheDocument()
        expect(screen.getByText('training.hero.byline')).toBeInTheDocument()
    })

    it('translates headline title', () => {
        renderWithRouter(<QuestionnaireGallery />)
        expect(mockT).toHaveBeenCalledWith('headlineList')
    })

    it('renders results link when user can access', () => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'mua'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        renderWithRouter(<QuestionnaireGallery />)

        expect(screen.getAllByRole('link', { name: /results/i })).toHaveLength(
            2
        )
    })
})
