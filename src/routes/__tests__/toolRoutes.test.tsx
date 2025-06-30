import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '../../App'
import { renderWithRouter } from '../../tests/mocks/wrappers'

vi.mock('../../app/hooks')
vi.mock('../../components/ScrollToTop')
vi.mock('../../features/auth/components/PersistLogin')
vi.mock('../../features/auth/components/RequireAuth')
vi.mock('../../features/auth/components/RequireRole')
vi.mock('../../features/stores/pages/StoreLinkAddPage')
vi.mock('../../features/tools/pages/ToolAddPage')
vi.mock('../../features/tools/pages/ToolDetailsPage')
vi.mock('../../features/tools/pages/ToolEditPage')
vi.mock('../../features/tools/pages/ToolsGalleryPage')

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
