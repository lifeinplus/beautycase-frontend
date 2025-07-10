import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/features/products/wrappers/ProductSelectionPageForLesson')
vi.mock('@/pages/lesson/LessonAddPage')
vi.mock('@/pages/lesson/LessonDetailsPage')
vi.mock('@/pages/lesson/LessonEditPage')
vi.mock('@/pages/lesson/LessonsGalleryPage')
vi.mock('@/pages/user/UserSelectionPage')
vi.mock('@/shared/components/ScrollToTop')

describe('lessonRoutes', () => {
    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/lessons/1'])

        expect(
            screen.getByTestId('mocked-lesson-details-page')
        ).toBeInTheDocument()
    })

    it('renders the gallery page correctly', () => {
        renderWithRouter(<App />, ['/lessons'])

        expect(
            screen.getByTestId('mocked-lessons-gallery-page')
        ).toBeInTheDocument()
    })

    it('renders the product selection page correctly', () => {
        renderWithRouter(<App />, ['/lessons/1/products'])

        expect(
            screen.getByTestId('mocked-product-selection-page-for-lesson')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/lessons/add'])

        expect(screen.getByTestId('mocked-lesson-add-page')).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/lessons/edit/1'])

        expect(
            screen.getByTestId('mocked-lesson-edit-page')
        ).toBeInTheDocument()
    })

    it('renders the user selection page correctly', () => {
        renderWithRouter(<App />, ['/lessons/edit/1/clients'])

        expect(
            screen.getByTestId('mocked-user-selection-page')
        ).toBeInTheDocument()
    })
})
