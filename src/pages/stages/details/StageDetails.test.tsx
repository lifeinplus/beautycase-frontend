import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockStage1 } from '@/features/stages/api/__mocks__/stagesApi'
import {
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '@/features/stages/api/stagesApi'
import { StageDetails } from './StageDetails'

vi.mock('@/features/stages/api/stagesApi')
vi.mock('@/shared/components/common/image-section/ImageSection')
vi.mock('@/widgets/product/product-images/ProductImages')
vi.mock('@/widgets/view/details/Details')

describe('StageDetails', () => {
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
        render(<StageDetails />)

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

        render(<StageDetails />)

        const descriptionContent = screen.getByTestId(
            'mocked-description-content'
        )

        expect(descriptionContent).toBeInTheDocument()
        expect(descriptionContent.textContent).not.toContain('steps')
    })

    it('renders product images', async () => {
        render(<StageDetails />)
        expect(screen.getByTestId('mocked-product-images')).toBeInTheDocument()
    })
})
