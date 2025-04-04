import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../../../app/hooks'
import { selectRole, selectUsername } from '../../../features/auth'
import { clearFormData } from '../../../features/form'
import { mockDispatch, mockNavigate, renderWithProvider } from '../../../tests'
import { getErrorMessage } from '../../../utils'
import { GalleryPage } from '../GalleryPage'

vi.mock('../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => String(error)),
}))

describe('GalleryPage', () => {
    const mockMediaContent = (
        <div data-testid="media-content">Media Content</div>
    )

    const mockProps = {
        redirectPath: '/gallery',
        title: 'Gallery',
        subtitle: 'Subtitle',
        isLoading: false,
        error: null,
        mediaContent: mockMediaContent,
    }

    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'mua'
            if (selector === selectUsername) return 'inna'
            return null
        })
    })

    it('dispatches clearFormData on mount', () => {
        renderWithProvider(<GalleryPage {...mockProps} />)

        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('renders the component with all elements', () => {
        renderWithProvider(<GalleryPage {...mockProps} />)

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
        expect(screen.getByText(mockProps.title)).toBeInTheDocument()
        expect(screen.getByText(mockProps.subtitle)).toBeInTheDocument()
        expect(screen.getByTestId('media-content')).toBeInTheDocument()
        expect(screen.getByRole('complementary')).toBeInTheDocument()
    })

    it('renders without subtitle when not provided', () => {
        const { subtitle, ...withoutSubtitle } = mockProps

        renderWithProvider(<GalleryPage {...withoutSubtitle} />)

        expect(screen.getByText(mockProps.title)).toBeInTheDocument()
        expect(screen.queryByText(mockProps.subtitle)).not.toBeInTheDocument()
    })

    it('shows loading state when isLoading is true', () => {
        renderWithProvider(<GalleryPage {...mockProps} isLoading={true} />)

        expect(screen.getByText('Loading...')).toBeInTheDocument()
        expect(screen.queryByTestId('media-content')).not.toBeInTheDocument()
    })

    it('shows error message when error is present', () => {
        const error = 'Something went wrong'

        renderWithProvider(<GalleryPage {...mockProps} error={error} />)

        expect(getErrorMessage).toHaveBeenCalledWith(error)
        expect(screen.getByText(error)).toBeInTheDocument()
        expect(screen.queryByTestId('media-content')).not.toBeInTheDocument()
    })

    it('renders navigation buttons for actions that user can access', () => {
        renderWithProvider(<GalleryPage {...mockProps} />)

        expect(
            screen.getByRole('button', { name: 'Добавить' })
        ).toBeInTheDocument()
    })

    it('navigates to correct path when add button is clicked', () => {
        renderWithProvider(<GalleryPage {...mockProps} />)

        fireEvent.click(screen.getByRole('button', { name: 'Добавить' }))

        expect(mockNavigate).toHaveBeenCalledWith('/gallery/add')
    })
})
