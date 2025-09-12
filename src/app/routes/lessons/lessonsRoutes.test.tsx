import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/app/layout/AppLayout')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/features/auth/components/require-auth/RequireAuth')
vi.mock('@/features/auth/components/require-role/RequireRole')
vi.mock(
    '@/features/products/wrappers/selection/lesson/ProductSelectionForLesson'
)
vi.mock('@/pages/lessons/add/LessonAdd')
vi.mock('@/pages/lessons/details/LessonDetails')
vi.mock('@/pages/lessons/edit/LessonEdit')
vi.mock('@/pages/lessons/gallery/LessonGallery')
vi.mock('@/pages/users/UserSelection')
vi.mock('@/shared/components/scroll-to-top/ScrollToTop')

describe('lessonsRoutes', () => {
    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/lessons/123'])
        expect(screen.getByTestId('mocked-lesson-details')).toBeInTheDocument()
    })

    it('renders the gallery page correctly', () => {
        renderWithRouter(<App />, ['/lessons'])
        expect(screen.getByTestId('mocked-lesson-gallery')).toBeInTheDocument()
    })

    it('renders the product selection page correctly', () => {
        renderWithRouter(<App />, ['/lessons/123/products'])

        expect(
            screen.getByTestId('mocked-product-selection-for-lesson')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/lessons/add'])
        expect(screen.getByTestId('mocked-lesson-add')).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/lessons/123/edit'])
        expect(screen.getByTestId('mocked-lesson-edit')).toBeInTheDocument()
    })

    it('renders the user selection page correctly', () => {
        renderWithRouter(<App />, ['/lessons/123/edit/clients'])
        expect(screen.getByTestId('mocked-user-selection')).toBeInTheDocument()
    })
})
