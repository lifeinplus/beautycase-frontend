import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockTools } from '@/features/tools/api/__mocks__/toolsApi'
import { useGetAllToolsQuery } from '@/features/tools/api/toolsApi'
import { ToolsGallery } from './ToolsGallery'

vi.mock('@/features/tools/api/toolsApi')
vi.mock('@/shared/components/gallery/image-card/ImageCard')
vi.mock('@/widgets/view/gallery/Gallery')

describe('ToolsGallery', () => {
    beforeEach(() => {
        vi.mocked(useGetAllToolsQuery as Mock).mockReturnValue({
            data: mockTools,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of tools when data is available', () => {
        render(<ToolsGallery />)

        expect(screen.getByTestId('mocked-gallery-page')).toBeInTheDocument()
        expect(screen.getByText('titles.gallery')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-media-content')).toBeInTheDocument()

        mockTools.forEach((tool) => {
            expect(
                screen.getByTestId(`mocked-image-card-${tool._id}`)
            ).toBeInTheDocument()

            expect(screen.getByText(tool.name)).toBeInTheDocument()
            expect(screen.getByText(`/tools/${tool._id}`)).toBeInTheDocument()
        })
    })
})
