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
vi.mock('@/widgets/view/details/Details')

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

        const title = screen.getByText(mockTool1.name)
        const subtitle = screen.getByText(mockTool1.brand?.name!)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
    })
})
