import { render, screen } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockTool } from '../../__mocks__/toolsApi'
import { useDeleteToolByIdMutation, useGetToolByIdQuery } from '../../toolsApi'
import { ToolDetailsPage } from '../ToolDetailsPage'

vi.mock('../../../../components/pages/DetailsPage')
vi.mock('../../../../components/ui/Image')
vi.mock('../../toolsApi')

describe('ToolDetailsPage', () => {
    const mockDeleteTool = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetToolByIdQuery as Mock).mockReturnValue({
            data: mockTool,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteToolByIdMutation as Mock).mockReturnValue([
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
