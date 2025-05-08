import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../app/hooks'
import {
    renderWithProviderAndRouter,
    renderWithRouter,
} from '../tests/mocks/wrappers'
import App from '../App'

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
vi.mock('../features/lessons/pages/LessonEditPage')
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

describe('App Component', () => {
    beforeEach(() => {
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

describe('App Routing', () => {
    describe('Account', () => {
        it('renders the account form correctly', () => {
            renderWithRouter(<App />, ['/account'])
            expect(
                screen.getByTestId('mocked-account-page')
            ).toBeInTheDocument()
        })
    })

    describe('Auth', () => {
        it('renders the login page correctly', () => {
            renderWithRouter(<App />, ['/login'])
            const page = screen.getByTestId('mocked-login-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the register page correctly', () => {
            renderWithRouter(<App />, ['/register'])
            const page = screen.getByTestId('mocked-register-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the unauthorized page correctly', () => {
            renderWithRouter(<App />, ['/unauthorized'])
            const page = screen.getByTestId('mocked-unauthorized-page')
            expect(page).toBeInTheDocument()
        })
    })

    describe('Lessons', () => {
        it('renders the gallery page correctly', () => {
            renderWithRouter(<App />, ['/lessons'])
            const page = screen.getByTestId('mocked-lessons-gallery-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the details page correctly', () => {
            renderWithRouter(<App />, ['/lessons/1'])
            const page = screen.getByTestId('mocked-lesson-details-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the add page correctly', () => {
            renderWithRouter(<App />, ['/lessons/add'])
            const page = screen.getByTestId('mocked-lesson-add-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the edit page correctly', () => {
            renderWithRouter(<App />, ['/lessons/edit/1'])
            const page = screen.getByTestId('mocked-lesson-edit-page')
            expect(page).toBeInTheDocument()
        })
    })

    describe('Makeup Bags', () => {
        it('renders the page correctly', () => {
            renderWithRouter(<App />, ['/makeup_bags/1'])
            const page = screen.getByTestId('mocked-makeup-bag-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the list page correctly', () => {
            renderWithRouter(<App />, ['/makeup_bags'])
            const page = screen.getByTestId('mocked-makeup-bag-list-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the add page correctly', () => {
            renderWithRouter(<App />, ['/makeup_bags/add'])
            const page = screen.getByTestId('mocked-makeup-bag-add-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the edit page correctly', () => {
            renderWithRouter(<App />, ['/makeup_bags/edit/1'])
            const page = screen.getByTestId('mocked-makeup-bag-edit-page')
            expect(page).toBeInTheDocument()
        })
    })

    describe('Products', () => {
        it('renders the details page correctly', () => {
            renderWithRouter(<App />, ['/products/1'])
            const page = screen.getByTestId('mocked-product-details-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the gallery page correctly', () => {
            renderWithRouter(<App />, ['/products'])
            const page = screen.getByTestId('mocked-product-gallery-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the add page correctly', () => {
            renderWithRouter(<App />, ['/products/add'])
            const page = screen.getByTestId('mocked-product-add-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the edit page correctly', () => {
            renderWithRouter(<App />, ['/products/edit/1'])
            const page = screen.getByTestId('mocked-product-edit-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the selection page correctly', () => {
            renderWithRouter(<App />, ['/products/selection'])
            const page = screen.getByTestId('mocked-product-selection-page')
            expect(page).toBeInTheDocument()
        })
    })

    describe('Questionnaires', () => {
        it('renders the result page correctly', () => {
            renderWithRouter(<App />, ['/questionnaires/1'])
            const page = screen.getByTestId('mocked-questionnaire-result-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the list page correctly', () => {
            renderWithRouter(<App />, ['/questionnaires'])
            const page = screen.getByTestId('mocked-questionnaire-list-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the questionnaire page correctly', () => {
            renderWithRouter(<App />, ['/questionnaire'])
            const page = screen.getByTestId('mocked-questionnaire-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the confirmation page correctly', () => {
            renderWithRouter(<App />, ['/confirmation'])
            const page = screen.getByTestId('mocked-confirmation-page')
            expect(page).toBeInTheDocument()
        })
    })

    describe('Reference Lists', () => {
        it('renders the result page correctly', () => {
            renderWithRouter(<App />, ['/reference_lists'])
            const page = screen.getByTestId('mocked-reference-lists-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the result page correctly', () => {
            renderWithRouter(<App />, ['/reference_lists/brands'])
            const page = screen.getByTestId('mocked-brands-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the result page correctly', () => {
            renderWithRouter(<App />, ['/reference_lists/stores'])
            const page = screen.getByTestId('mocked-stores-page')
            expect(page).toBeInTheDocument()
        })
    })

    describe('Stages', () => {
        it('renders the list page correctly', () => {
            renderWithRouter(<App />, ['/stages'])
            const page = screen.getByTestId('mocked-stage-list-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the details page correctly', () => {
            renderWithRouter(<App />, ['/stages/1'])
            const page = screen.getByTestId('mocked-stage-details-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the add page correctly', () => {
            renderWithRouter(<App />, ['/stages/add'])
            const page = screen.getByTestId('mocked-stage-add-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the edit page correctly', () => {
            renderWithRouter(<App />, ['/stages/edit/1'])
            const page = screen.getByTestId('mocked-stage-edit-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the selection page correctly', () => {
            renderWithRouter(<App />, ['/stages/selection'])
            const page = screen.getByTestId('mocked-stage-selection-page')
            expect(page).toBeInTheDocument()
        })
    })

    describe('Stores', () => {
        it('renders the link add page correctly', () => {
            renderWithRouter(<App />, ['/stores/links/add'])
            const page = screen.getByTestId('mocked-store-link-add-page')
            expect(page).toBeInTheDocument()
        })
    })

    describe('Tools', () => {
        it('renders the details page correctly', () => {
            renderWithRouter(<App />, ['/tools/1'])
            const page = screen.getByTestId('mocked-tool-details-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the gallery page correctly', () => {
            renderWithRouter(<App />, ['/tools'])
            const page = screen.getByTestId('mocked-tools-gallery-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the add page correctly', () => {
            renderWithRouter(<App />, ['/tools/add'])
            const page = screen.getByTestId('mocked-tool-add-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the edit page correctly', () => {
            renderWithRouter(<App />, ['/tools/edit/1'])
            const page = screen.getByTestId('mocked-tool-edit-page')
            expect(page).toBeInTheDocument()
        })

        it('renders the selection page correctly', () => {
            renderWithRouter(<App />, ['/tools/selection'])
            const page = screen.getByTestId('mocked-tool-selection-page')
            expect(page).toBeInTheDocument()
        })
    })
})
