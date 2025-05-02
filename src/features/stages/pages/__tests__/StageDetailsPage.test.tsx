import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockNavigate } from '../../../../tests/mocks/router'
import { mockStage } from '../../__mocks__/stagesApiSlice'
import {
    useDeleteStageMutation,
    useDuplicateStageMutation,
    useReadStageByIdQuery,
} from '../../stagesApiSlice'
import { StageDetailsPage } from '../StageDetailsPage'

vi.mock('../../../../components/pages/DetailsPage')
vi.mock('../../../../components/ui/Image')
vi.mock('../../stagesApiSlice')

describe('StageDetailsPage', () => {
    const mockDeleteStage = vi.fn()
    const mockDuplicateStage = vi.fn()

    beforeEach(() => {
        vi.mocked(useReadStageByIdQuery as Mock).mockReturnValue({
            data: mockStage,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteStageMutation as Mock).mockReturnValue([
            mockDeleteStage,
        ])

        vi.mocked(useDuplicateStageMutation as Mock).mockReturnValue([
            mockDuplicateStage,
        ])
    })

    it('renders stage details', async () => {
        render(<StageDetailsPage />)

        const title = screen.getByText(mockStage.title)
        const subtitle = screen.getByText(mockStage.subtitle)
        const descriptionContent = screen.getByText(mockStage.comment!)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
        expect(descriptionContent).toBeInTheDocument()
    })

    it('does not render steps section when steps do not exist', () => {
        vi.mocked(useReadStageByIdQuery as Mock).mockReturnValue({
            data: { ...mockStage, steps: [] },
            isLoading: false,
            error: null,
        })

        render(<StageDetailsPage />)

        const descriptionContent = screen.getByTestId(
            'mocked-description-content'
        )

        expect(descriptionContent).toBeInTheDocument()
        expect(descriptionContent.textContent).not.toContain('Шаги')
    })

    it('navigates to product details when product is clicked', async () => {
        const user = userEvent.setup()

        render(<StageDetailsPage />)

        const additionalContent = screen.getByTestId(
            'mocked-additional-content'
        )

        const imgContainer = additionalContent.querySelector('.img-container')

        expect(imgContainer).not.toBeNull()

        await user.click(imgContainer as HTMLElement)

        expect(mockNavigate).toHaveBeenCalledWith('/products/product1', {
            state: { fromPathname: '/test-pathname' },
        })
    })
})
