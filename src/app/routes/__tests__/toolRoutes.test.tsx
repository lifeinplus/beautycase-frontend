import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/pages/store/StoreLinksAdd')
vi.mock('@/pages/tool/ToolAddPage')
vi.mock('@/pages/tool/ToolDetailsPage')
vi.mock('@/pages/tool/ToolEditPage')
vi.mock('@/pages/tool/ToolsGalleryPage')
vi.mock('@/shared/components/ScrollToTop')

describe('toolRoutes', () => {
    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/tools/1'])

        expect(
            screen.getByTestId('mocked-tool-details-page')
        ).toBeInTheDocument()
    })

    it('renders the gallery page correctly', () => {
        renderWithRouter(<App />, ['/tools'])

        expect(
            screen.getByTestId('mocked-tools-gallery-page')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/tools/add'])

        expect(screen.getByTestId('mocked-tool-add-page')).toBeInTheDocument()
    })

    it('renders the add links page correctly', () => {
        renderWithRouter(<App />, ['/tools/add/links'])

        expect(
            screen.getByTestId('mocked-store-link-add-page')
        ).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/tools/edit/1'])

        expect(screen.getByTestId('mocked-tool-edit-page')).toBeInTheDocument()
    })

    it('renders the edit links page correctly', () => {
        renderWithRouter(<App />, ['/tools/edit/1/links'])

        expect(
            screen.getByTestId('mocked-store-link-add-page')
        ).toBeInTheDocument()
    })
})
