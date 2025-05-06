import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { useAppSelector } from '../app/hooks'
import {
    renderWithProviderAndRouter,
    renderWithProviders,
    renderWithRouter,
} from '../tests/mocks/wrappers'
import App from '../App'
import { setupStore } from '../app/store'
import themeReducer from '../features/theme/themeSlice'

vi.mock('../app/hooks')
vi.mock('../components/ScrollToTop')
vi.mock('../features/account/pages/AccountPage')
vi.mock('../features/auth/components/PersistLogin')
vi.mock('../features/auth/components/RequireAuth')
vi.mock('../features/auth/components/RequireRole')
vi.mock('../features/auth/pages/LoginPage')
vi.mock('../features/auth/pages/RegisterPage')
vi.mock('../features/auth/pages/UnauthorizedPage')
vi.mock('../features/brands/pages/BrandsPage')
vi.mock('../features/home/pages/HomePage')
vi.mock('../features/lessons/pages/LessonAddPage')
vi.mock('../features/lessons/pages/LessonDetailsPage')
vi.mock('../features/lessons/pages/LessonsEditPage')
vi.mock('../features/lessons/pages/LessonsGalleryPage')
vi.mock('../features/makeupBags/pages/MakeupBagAddPage')
vi.mock('../features/makeupBags/pages/MakeupBagEditPage')
vi.mock('../features/makeupBags/pages/MakeupBagListPage')
vi.mock('../features/makeupBags/pages/MakeupBagPage')
vi.mock('../features/products/pages/ProductAddPage')
vi.mock('../features/products/pages/ProductDetailsPage')
vi.mock('../features/products/pages/ProductEditPage')
vi.mock('../features/products/pages/ProductGalleryPage')
vi.mock('../features/products/pages/ProductSelectionPage')
vi.mock('../features/questionnaires/pages/ConfirmationPage')
vi.mock('../features/questionnaires/pages/QuestionnairePage')
vi.mock('../features/questionnaires/pages/QuestionnaireListPage')
vi.mock('../features/questionnaires/pages/QuestionnaireResultPage')
vi.mock('../features/referenceLists/pages/ReferenceListsPage')
vi.mock('../features/stages/pages/StageAddPage')
vi.mock('../features/stages/pages/StageDetailsPage')
vi.mock('../features/stages/pages/StageEditPage')
vi.mock('../features/stages/pages/StageListPage')
vi.mock('../features/stages/pages/StageSelectionPage')
vi.mock('../features/stores/pages/StoreLinkAddPage')
vi.mock('../features/stores/pages/StoresPage')
vi.mock('../features/tools/pages/ToolAddPage')
vi.mock('../features/tools/pages/ToolDetailsPage')
vi.mock('../features/tools/pages/ToolEditPage')
vi.mock('../features/tools/pages/ToolsGalleryPage')
vi.mock('../features/tools/pages/ToolSelectionPage')

describe('App', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        document.documentElement.classList.remove('dark')
    })

    it('renders without crashing', () => {
        renderWithRouter(<App />)

        expect(screen.getByTestId('mocked-toaster')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-scroll-to-top')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-persist-login')).toBeInTheDocument()
    })

    it('adds dark class to html element when darkMode is true', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        renderWithProviderAndRouter(<App />)

        const darkMode = document.documentElement.classList.contains('dark')
        expect(darkMode).toBe(true)
    })

    it('does not add dark class to html element when darkMode is false', () => {
        vi.mocked(useAppSelector).mockReturnValue(false)

        renderWithProviderAndRouter(<App />)

        const darkMode = document.documentElement.classList.contains('dark')
        expect(darkMode).toBe(false)
    })
})
