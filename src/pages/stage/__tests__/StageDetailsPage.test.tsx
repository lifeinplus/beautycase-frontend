import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockStage1 } from '@/features/stages/__mocks__/stagesApi'
import {
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '@/features/stages/stagesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { StageDetailsPage } from '../StageDetailsPage'

vi.mock('@/features/stages/stagesApi')
vi.mock('@/shared/components/ui/Image')
vi.mock('@/widgets/product/SelectProductsTile')
vi.mock('@/widgets/DetailsPage')

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

        expect(screen.getByText(mockStage1.title)).toBeInTheDocument()
        expect(screen.getByText(mockStage1.subtitle)).toBeInTheDocument()
        expect(screen.getByText(mockStage1.comment!)).toBeInTheDocument()
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

        const container = additionalContent.querySelector(
            "[class*='container'][class*='square']"
        )

        expect(container).not.toBeNull()

        await user.click(container as HTMLElement)

        expect(mockNavigate).toHaveBeenCalledWith('/products/product1', {
            state: { fromPathname: '/test-pathname' },
        })
    })
})
