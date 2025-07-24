import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { clearFormData } from '@/features/form/formSlice'
import { mockNavigate } from '@/tests/mocks/router'
import userEvent from '@testing-library/user-event'
import { Details, type DetailsProps } from './Details'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/common/TitleSection')
vi.mock('@/shared/components/layout/TopPanel')

describe('Details', () => {
    const mockDescriptionContent = (
        <div data-testid="mocked-description-content" />
    )

    const mockMediaContent = <div data-testid="mocked-media-content" />

    const mockProps: DetailsProps = {
        redirectPath: '/products',
        topPanelTitle: 'Test Top Panel Title',
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        descriptionContent: mockDescriptionContent,
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

    it('renders the component with all elements', () => {
        render(<Details {...mockProps} />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-title-section')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-description-content')
        ).toBeInTheDocument()

        expect(screen.getByTestId('mocked-data-wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-media-content')).toBeInTheDocument()
    })

    it('renders the component without description content', () => {
        const { descriptionContent, ...restProps } = mockProps
        render(<Details {...restProps} />)
        expect(screen.getByText(mockProps.description!)).toBeInTheDocument()
    })

    it('dispatches clearFormData on mount', () => {
        render(<Details {...mockProps} />)
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<Details {...mockProps} />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith(mockProps.redirectPath, {
            replace: true,
            state: { scrollId: '123' },
        })
    })
})
