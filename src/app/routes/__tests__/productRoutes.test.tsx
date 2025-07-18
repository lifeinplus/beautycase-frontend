import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/features/stores/wrappers/StoreLinksAddPageForProduct')
vi.mock('@/pages/product/ProductAddPage')
vi.mock('@/pages/product/ProductDetailsPage')
vi.mock('@/pages/product/ProductEditPage')
vi.mock('@/pages/product/ProductGalleryPage')
vi.mock('@/shared/components/ScrollToTop')

describe('productRoutes', () => {
    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/products/1'])

        expect(
            screen.getByTestId('mocked-product-details-page')
        ).toBeInTheDocument()
    })

    it('renders the gallery page correctly', () => {
        renderWithRouter(<App />, ['/products'])

        expect(
            screen.getByTestId('mocked-product-gallery-page')
        ).toBeInTheDocument()
    })

    it('renders the add links page correctly', () => {
        renderWithRouter(<App />, ['/products/1/links'])

        expect(
            screen.getByTestId('mocked-store-links-add-page-for-product')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/products/add'])

        expect(
            screen.getByTestId('mocked-product-add-page')
        ).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/products/edit/1'])

        expect(
            screen.getByTestId('mocked-product-edit-page')
        ).toBeInTheDocument()
    })
})
