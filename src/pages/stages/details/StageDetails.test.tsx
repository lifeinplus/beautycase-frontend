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
vi.mock('@/widgets/product/images/ProductImages')
vi.mock('./hooks/useStageDetailsActions')

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

        expect(screen.getAllByText(mockStage1.title)).toHaveLength(2)
        expect(screen.getAllByText(mockStage1.subtitle)).toHaveLength(2)
        expect(screen.getByText(mockStage1.comment!)).toBeInTheDocument()
        expect(screen.getByText('steps')).toBeInTheDocument()
    })

    it('does not render steps section when steps do not exist', () => {
        vi.mocked(useGetStageByIdQuery as Mock).mockReturnValue({
            data: { ...mockStage1, steps: [] },
            isLoading: false,
            error: null,
        })

        render(<StageDetails />)

        expect(screen.queryByText('steps')).not.toBeInTheDocument()
    })

    it('renders product images', async () => {
        render(<StageDetails />)
        expect(screen.getByTestId('mocked-product-images')).toBeInTheDocument()
    })
})
