import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockTools } from '../../__mocks__/toolsApi'
import { useGetAllToolsQuery } from '../../toolsApi'
import { ToolsGalleryPage } from '../ToolsGalleryPage'

vi.mock('../../../../shared/components/gallery/GalleryPage')
vi.mock('../../../../shared/components/gallery/ImageCard')
vi.mock('../../toolsApi')

describe('ToolsGalleryPage', () => {
    beforeEach(() => {
        vi.mocked(useGetAllToolsQuery as Mock).mockReturnValue({
            data: mockTools,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of tools when data is available', () => {
        render(<ToolsGalleryPage />)

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
