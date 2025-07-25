import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/features/stores/wrappers/StoreLinksAddForProduct')
vi.mock('@/pages/product/add/ProductAdd')
vi.mock('@/pages/product/details/ProductDetails')
vi.mock('@/pages/product/edit/ProductEdit')
vi.mock('@/pages/product/gallery/ProductGallery')
vi.mock('@/shared/components/layout/Layout')

describe('productRoutes', () => {
    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/products/1'])
        expect(screen.getByTestId('mocked-product-details')).toBeInTheDocument()
    })

    it('renders the gallery page correctly', () => {
        renderWithRouter(<App />, ['/products'])
        expect(screen.getByTestId('mocked-product-gallery')).toBeInTheDocument()
    })

    it('renders the add links page correctly', () => {
        renderWithRouter(<App />, ['/products/1/links'])

        expect(
            screen.getByTestId('mocked-store-links-add-for-product')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/products/add'])
        expect(screen.getByTestId('mocked-product-add')).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/products/edit/1'])
        expect(screen.getByTestId('mocked-product-edit')).toBeInTheDocument()
    })
})
