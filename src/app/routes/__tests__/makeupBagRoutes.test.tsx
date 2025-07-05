import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('../../../components/ScrollToTop')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/features/makeupBags/pages/MakeupBagAddPage')
vi.mock('@/features/makeupBags/pages/MakeupBagEditPage')
vi.mock('@/features/makeupBags/pages/MakeupBagListPage')
vi.mock('@/features/makeupBags/pages/MakeupBagPage')
vi.mock('@/features/stages/pages/StageSelectionPage')
vi.mock('@/features/tools/pages/ToolSelectionPage')

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
