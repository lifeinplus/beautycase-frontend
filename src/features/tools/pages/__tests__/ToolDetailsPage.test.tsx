import { render, screen } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockTool } from '../../__mocks__/toolsApiSlice'
import { useDeleteToolMutation, useGetToolByIdQuery } from '../../toolsApiSlice'
import { ToolDetailsPage } from '../ToolDetailsPage'

vi.mock('../../../../components/pages/DetailsPage')
vi.mock('../../../../components/ui/Image')
vi.mock('../../toolsApiSlice')

describe('ToolDetailsPage', () => {
    const mockDeleteTool = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetToolByIdQuery as Mock).mockReturnValue({
            data: mockTool,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteToolMutation as Mock).mockReturnValue([
            mockDeleteTool,
        ])
    })

    it('renders tool details', async () => {
        render(<ToolDetailsPage />)

        const title = screen.getByText(mockTool.name)
        const subtitle = screen.getByText(mockTool.brand?.name!)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
    })
})
