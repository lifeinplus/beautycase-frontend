import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/pages/makeup-bags/add/MakeupBagAdd')
vi.mock('@/pages/makeup-bags/details/MakeupBagDetails')
vi.mock('@/pages/makeup-bags/edit/MakeupBagEdit')
vi.mock('@/pages/makeup-bags/list/MakeupBagList')
vi.mock('@/shared/components/layout/Layout')
vi.mock('@/shared/components/ScrollToTop')
vi.mock('@/widgets/stage/stage-selection/StageSelection')
vi.mock('@/widgets/tool/tool-selection/ToolSelection')

describe('makeupBagRoutes', () => {
    it('renders the list page correctly', () => {
        renderWithRouter(<App />, ['/makeup-bags'])
        expect(screen.getByTestId('mocked-makeup-bag-list')).toBeInTheDocument()
    })

    it('renders the page correctly', () => {
        renderWithRouter(<App />, ['/makeup-bags/123'])

        expect(
            screen.getByTestId('mocked-makeup-bag-details')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/makeup-bags/add'])
        expect(screen.getByTestId('mocked-makeup-bag-add')).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/makeup-bags/123/edit'])
        expect(screen.getByTestId('mocked-makeup-bag-edit')).toBeInTheDocument()
    })

    it('renders the stage selection page correctly', () => {
        renderWithRouter(<App />, ['/makeup-bags/123/edit/stages'])
        expect(screen.getByTestId('mocked-stage-selection')).toBeInTheDocument()
    })

    it('renders the tool selection page correctly', () => {
        renderWithRouter(<App />, ['/makeup-bags/123/edit/tools'])
        expect(screen.getByTestId('mocked-tool-selection')).toBeInTheDocument()
    })
})
