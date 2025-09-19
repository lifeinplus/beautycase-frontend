import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockTool1 } from '@/features/tools/api/__mocks__/toolsApi'
import {
    useDeleteToolByIdMutation,
    useGetToolByIdQuery,
} from '@/features/tools/api/toolsApi'
import { ToolDetails } from './ToolDetails'

vi.mock('@/features/tools/api/toolsApi')
vi.mock('@/shared/components/common/image-section/ImageSection')
vi.mock('@/widgets/store/store-links/StoreLinks')
vi.mock('./hooks/useToolDetailsActions')

describe('ToolDetails', () => {
    const mockDeleteTool = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetToolByIdQuery as Mock).mockReturnValue({
            data: mockTool1,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteToolByIdMutation as Mock).mockReturnValue([
            mockDeleteTool,
        ])
    })

    it('renders tool details', async () => {
        render(<ToolDetails />)

        expect(screen.getAllByText(mockTool1.name)).toHaveLength(2)
        expect(screen.getAllByText(mockTool1.brand?.name!)).toHaveLength(2)
    })
})
