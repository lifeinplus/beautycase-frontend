import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/features/auth/components/require-auth/RequireAuth')
vi.mock('@/features/auth/components/require-role/RequireRole')
vi.mock('@/features/stores/wrappers/links-add/tool/StoreLinksAddForTool')
vi.mock('@/pages/tools/add/ToolAdd')
vi.mock('@/pages/tools/details/ToolDetails')
vi.mock('@/pages/tools/edit/ToolEdit')
vi.mock('@/pages/tools/gallery/ToolsGallery')
vi.mock('@/app/layout/AppLayout')

describe('toolsRoutes', () => {
    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/tools/1'])
        expect(screen.getByTestId('mocked-tool-details')).toBeInTheDocument()
    })

    it('renders the gallery page correctly', () => {
        renderWithRouter(<App />, ['/tools'])
        expect(screen.getByTestId('mocked-tools-gallery')).toBeInTheDocument()
    })

    it('renders the add links page correctly', () => {
        renderWithRouter(<App />, ['/tools/1/links'])

        expect(
            screen.getByTestId('mocked-store-links-add-for-tool')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/tools/add'])
        expect(screen.getByTestId('mocked-tool-add')).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/tools/123/edit'])
        expect(screen.getByTestId('mocked-tool-edit')).toBeInTheDocument()
    })
})
