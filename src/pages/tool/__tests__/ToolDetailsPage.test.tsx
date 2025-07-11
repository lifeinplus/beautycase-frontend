import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockTool1 } from '@/features/tools/__mocks__/toolsApi'
import {
    useDeleteToolByIdMutation,
    useGetToolByIdQuery,
} from '@/features/tools/toolsApi'
import { ToolDetailsPage } from '../ToolDetailsPage'

vi.mock('@/features/tools/toolsApi')
vi.mock('@/shared/components/ui/Image')
vi.mock('@/widgets/DetailsPage')

describe('ToolDetailsPage', () => {
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
        render(<ToolDetailsPage />)

        const title = screen.getByText(mockTool1.name)
        const subtitle = screen.getByText(mockTool1.brand?.name!)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
    })
})
