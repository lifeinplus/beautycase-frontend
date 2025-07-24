import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/features/products/wrappers/ProductSelectionPageForLesson')
vi.mock('@/pages/lessons/add/LessonAdd')
vi.mock('@/pages/lessons/details/LessonDetails')
vi.mock('@/pages/lessons/edit/LessonEdit')
vi.mock('@/pages/lessons/gallery/LessonGallery')
vi.mock('@/pages/user/UserSelectionPage')
vi.mock('@/shared/components/layout/Layout')
vi.mock('@/shared/components/ScrollToTop')

describe('lessonRoutes', () => {
    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/lessons/1'])
        expect(screen.getByTestId('mocked-lesson-details')).toBeInTheDocument()
    })

    it('renders the gallery page correctly', () => {
        renderWithRouter(<App />, ['/lessons'])
        expect(screen.getByTestId('mocked-lesson-gallery')).toBeInTheDocument()
    })

    it('renders the product selection page correctly', () => {
        renderWithRouter(<App />, ['/lessons/1/products'])

        expect(
            screen.getByTestId('mocked-product-selection-page-for-lesson')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/lessons/add'])
        expect(screen.getByTestId('mocked-lesson-add')).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/lessons/edit/1'])
        expect(screen.getByTestId('mocked-lesson-edit')).toBeInTheDocument()
    })

    it('renders the user selection page correctly', () => {
        renderWithRouter(<App />, ['/lessons/edit/1/clients'])

        expect(
            screen.getByTestId('mocked-user-selection-page')
        ).toBeInTheDocument()
    })
})
