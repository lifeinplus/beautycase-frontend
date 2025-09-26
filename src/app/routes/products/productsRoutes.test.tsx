import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/app/layout/AppLayout')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/features/auth/components/require-auth/RequireAuth')
vi.mock('@/features/auth/components/require-role/RequireRole')
vi.mock('@/features/stores/wrappers/links-add/product/StoreLinksAddForProduct')
vi.mock('@/pages/products/add/ProductAdd')
vi.mock('@/pages/products/details/ProductDetails')
vi.mock('@/pages/products/edit/ProductEdit')
vi.mock('@/pages/products/gallery/ProductGallery')

describe('productsRoutes', () => {
    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/products/123'])
        expect(screen.getByTestId('mocked-product-details')).toBeInTheDocument()
    })

    it('renders the gallery page correctly', () => {
        renderWithRouter(<App />, ['/products'])
        expect(screen.getByTestId('mocked-product-gallery')).toBeInTheDocument()
    })

    it('renders the add links page correctly', () => {
        renderWithRouter(<App />, ['/products/123/links'])

        expect(
            screen.getByTestId('mocked-store-links-add-for-product')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/products/add'])
        expect(screen.getByTestId('mocked-product-add')).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/products/123/edit'])
        expect(screen.getByTestId('mocked-product-edit')).toBeInTheDocument()
    })
})
