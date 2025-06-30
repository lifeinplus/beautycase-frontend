import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '../../App'
import { renderWithRouter } from '../../tests/mocks/wrappers'

vi.mock('../../app/hooks')
vi.mock('../../components/ScrollToTop')
vi.mock('../../features/auth/components/PersistLogin')
vi.mock('../../features/auth/components/RequireAuth')
vi.mock('../../features/auth/components/RequireRole')
vi.mock('../../features/lessons/pages/LessonAddPage')
vi.mock('../../features/lessons/pages/LessonDetailsPage')
vi.mock('../../features/lessons/pages/LessonEditPage')
vi.mock('../../features/lessons/pages/LessonsGalleryPage')
vi.mock('../../features/products/pages/ProductSelectionPage')
vi.mock('../../features/users/pages/UserSelectionPage')

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

    it('renders the product selection page correctly', () => {
        renderWithRouter(<App />, ['/lessons/edit/1/products'])

        expect(
            screen.getByTestId('mocked-product-selection-page')
        ).toBeInTheDocument()
    })
})
