import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../../../app/hooks'
import { selectRole, selectUsername } from '../../../features/auth/authSlice'
import { clearFormData } from '../../../features/form/formSlice'
import { mockDispatch } from '../../../tests/mocks/app'
import { mockNavigate } from '../../../tests/mocks/router'
import { renderWithProvider } from '../../../tests/mocks/wrappers'
import { getErrorMessage } from '../../../utils/errorUtils'

import { GalleryPage, type GalleryPageProps } from '../GalleryPage'

vi.mock('../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => String(error)),
}))

describe('GalleryPage', () => {
    const mockMediaContent = (
        <div data-testid="media-content">Media Content</div>
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
        expect(screen.getByText(mockProps.subtitle!)).toBeInTheDocument()
        expect(screen.getByTestId('media-content')).toBeInTheDocument()
        expect(screen.getByRole('complementary')).toBeInTheDocument()
    })

    it('renders without subtitle when not provided', () => {
        const { subtitle, ...withoutSubtitle } = mockProps

        renderWithProvider(<GalleryPage {...withoutSubtitle} />)

        expect(screen.getByText(mockProps.title)).toBeInTheDocument()
        expect(screen.queryByText(mockProps.subtitle!)).not.toBeInTheDocument()
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
