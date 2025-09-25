import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { clearFormData } from '@/features/form/slice/formSlice'
import { mockError } from '@/tests/mocks'
import { renderWithProviders } from '@/tests/mocks/wrappers'
import { Gallery, type GalleryProps } from './Gallery'

vi.mock('@/app/hooks/hooks')
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/layout/header/Header')

describe('Gallery', () => {
    const mockMediaContent = (
        <div data-testid="mocked-media-content">Media Content</div>
    )

    const mockProps: GalleryProps = {
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
        renderWithProviders(<Gallery {...mockProps} />)
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('renders the component with all elements', () => {
        renderWithProviders(<Gallery {...mockProps} />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-media-content')).toBeInTheDocument()
    })

    it('renders without subtitle when not provided', () => {
        const { subtitle, ...withoutSubtitle } = mockProps

        renderWithProviders(<Gallery {...withoutSubtitle} />)

        expect(screen.getByText(mockProps.title)).toBeInTheDocument()
        expect(screen.queryByText(mockProps.subtitle!)).not.toBeInTheDocument()
    })

    it('shows loading state when isLoading is true', () => {
        renderWithProviders(<Gallery {...mockProps} isLoading />)

        expect(screen.getByText('loading')).toBeInTheDocument()
        expect(screen.queryByTestId('media-content')).not.toBeInTheDocument()
    })

    it('shows error message when error is present', () => {
        renderWithProviders(<Gallery {...mockProps} error={mockError} />)

        expect(screen.getByText('UNKNOWN_ERROR')).toBeInTheDocument()
        expect(screen.queryByTestId('media-content')).not.toBeInTheDocument()
    })
})
