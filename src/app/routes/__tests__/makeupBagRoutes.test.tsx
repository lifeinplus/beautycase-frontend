import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/pages/makeup-bag/MakeupBagAddPage')
vi.mock('@/pages/makeup-bag/MakeupBagEditPage')
vi.mock('@/pages/makeup-bag/MakeupBagListPage')
vi.mock('@/pages/makeup-bag/MakeupBagPage')
vi.mock('@/pages/stage/StageSelectionPage')
vi.mock('@/pages/tool/ToolSelectionPage')
vi.mock('@/shared/components/ScrollToTop')

describe('makeupBagRoutes', () => {
    it('renders the page correctly', () => {
        renderWithRouter(<App />, ['/makeup_bags/1'])

        expect(screen.getByTestId('mocked-makeup-bag-page')).toBeInTheDocument()
    })

    it('renders the list page correctly', () => {
        renderWithRouter(<App />, ['/makeup_bags'])

        expect(
            screen.getByTestId('mocked-makeup-bag-list-page')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/makeup_bags/add'])

        expect(
            screen.getByTestId('mocked-makeup-bag-add-page')
        ).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/makeup_bags/edit/1'])

        expect(
            screen.getByTestId('mocked-makeup-bag-edit-page')
        ).toBeInTheDocument()
    })

    it('renders the stage selection page correctly', () => {
        renderWithRouter(<App />, ['/makeup_bags/edit/1/stages'])

        expect(
            screen.getByTestId('mocked-stage-selection-page')
        ).toBeInTheDocument()
    })

    it('renders the tool selection page correctly', () => {
        renderWithRouter(<App />, ['/makeup_bags/edit/1/tools'])

        expect(
            screen.getByTestId('mocked-tool-selection-page')
        ).toBeInTheDocument()
    })
})
