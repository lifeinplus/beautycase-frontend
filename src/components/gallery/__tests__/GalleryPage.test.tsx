import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mockDispatch } from '../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../app/hooks'
import { selectRole, selectUsername } from '../../../features/auth/authSlice'
import { clearFormData } from '../../../features/form/formSlice'
import { mockNavigate } from '../../../tests/mocks/router'
import { renderWithProviders } from '../../../tests/mocks/wrappers'
import { mockError } from '../../../utils/__mocks__/errorUtils'
import { getErrorMessage } from '../../../utils/errorUtils'
import { GalleryPage, type GalleryPageProps } from '../GalleryPage'

vi.mock('../../../app/hooks')
vi.mock('../../../utils/errorUtils')
vi.mock('../../navigation/AdaptiveNavBar')
vi.mock('../../navigation/NavigationButton')
vi.mock('../../Header')
vi.mock('../../Hero')

describe('GalleryPage', () => {
    const mockMediaContent = (
        <div data-testid="mocked-media-content">Media Content</div>
    )

    const mockProps: GalleryPageProps = {
        redirectPath: '/gallery',
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        isLoading: false,
        error: null,
        mediaContent: mockMediaContent,
    }

    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })
    })

    it('dispatches clearFormData on mount', () => {
        renderWithProviders(<GalleryPage {...mockProps} />)
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('renders the component with all elements', () => {
        renderWithProviders(<GalleryPage {...mockProps} />)

        const header = screen.getByTestId('mocked-header')
        const hero = screen.getByTestId('mocked-hero')
        const mediaContent = screen.getByTestId('mocked-media-content')
        const navBar = screen.getByTestId('mocked-nav-bar')
        const navButton = screen.getByTestId('mocked-nav-button-actions.add')

        expect(header).toBeInTheDocument()
        expect(hero).toBeInTheDocument()
        expect(mediaContent).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()
        expect(navButton).toBeInTheDocument()
    })

    it('renders without subtitle when not provided', () => {
        const { subtitle, ...withoutSubtitle } = mockProps

        renderWithProviders(<GalleryPage {...withoutSubtitle} />)

        expect(screen.getByText(mockProps.title)).toBeInTheDocument()
        expect(screen.queryByText(mockProps.subtitle!)).not.toBeInTheDocument()
    })

    it('shows loading state when isLoading is true', () => {
        renderWithProviders(<GalleryPage {...mockProps} isLoading />)

        expect(screen.getByText('Loading...')).toBeInTheDocument()
        expect(screen.queryByTestId('media-content')).not.toBeInTheDocument()
    })

    it('shows error message when error is present', () => {
        renderWithProviders(<GalleryPage {...mockProps} error={mockError} />)

        expect(getErrorMessage).toHaveBeenCalledWith(mockError)
        expect(screen.getByText(mockError.message)).toBeInTheDocument()
        expect(screen.queryByTestId('media-content')).not.toBeInTheDocument()
    })

    it('renders navigation buttons for actions that user can access', () => {
        renderWithProviders(<GalleryPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'actions.add' })
        expect(button).toBeInTheDocument()
    })

    it('navigates to correct path when add button is clicked', async () => {
        const user = userEvent.setup()

        renderWithProviders(<GalleryPage {...mockProps} />)

        const button = screen.getByRole('button', { name: 'actions.add' })
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith('/gallery/add')
    })
})
