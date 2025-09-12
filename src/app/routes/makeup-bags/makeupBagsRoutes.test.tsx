import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/features/auth/components/require-auth/RequireAuth')
vi.mock('@/features/auth/components/require-role/RequireRole')
vi.mock('@/pages/makeup-bags/add/MakeupBagAdd')
vi.mock('@/pages/makeup-bags/details/MakeupBagDetails')
vi.mock('@/pages/makeup-bags/edit/MakeupBagEdit')
vi.mock('@/pages/makeup-bags/list/MakeupBagList')
vi.mock('@/app/layout/AppLayout')
vi.mock('@/shared/components/scroll-to-top/ScrollToTop')
vi.mock('@/widgets/stage/stage-selection/StageSelection')
vi.mock('@/widgets/tool/tool-selection/ToolSelection')

describe('makeupBagsRoutes', () => {
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
