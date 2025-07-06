import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockNavigate } from '@/tests/mocks/router'
import { mockStage1 } from '../../../features/stages/__mocks__/stagesApi'
import {
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '../../../features/stages/stagesApi'
import { StageDetailsPage } from '../StageDetailsPage'

vi.mock('@/app/routes/DetailsPage')
vi.mock('@/features/stages/stagesApi')
vi.mock('@/shared/components/ui/Image')

describe('StageDetailsPage', () => {
    const mockDeleteStageById = vi.fn()
    const mockDuplicateStageById = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetStageByIdQuery as Mock).mockReturnValue({
            data: mockStage1,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDuplicateStageByIdMutation as Mock).mockReturnValue([
            mockDuplicateStageById,
        ])

        vi.mocked(useDeleteStageByIdMutation as Mock).mockReturnValue([
            mockDeleteStageById,
        ])
    })

    it('renders stage details', async () => {
        render(<StageDetailsPage />)

        const title = screen.getByText(mockStage1.title)
        const subtitle = screen.getByText(mockStage1.subtitle)
        const descriptionContent = screen.getByText(mockStage1.comment!)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
        expect(descriptionContent).toBeInTheDocument()
    })

    it('does not render steps section when steps do not exist', () => {
        vi.mocked(useGetStageByIdQuery as Mock).mockReturnValue({
            data: { ...mockStage1, steps: [] },
            isLoading: false,
            error: null,
        })

        render(<StageDetailsPage />)

        const descriptionContent = screen.getByTestId(
            'mocked-description-content'
        )

        expect(descriptionContent).toBeInTheDocument()
        expect(descriptionContent.textContent).not.toContain('steps')
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
