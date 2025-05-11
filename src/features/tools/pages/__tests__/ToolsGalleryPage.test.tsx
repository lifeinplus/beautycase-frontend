import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockTools } from '../../__mocks__/toolsApi'
import { useReadToolsQuery } from '../../toolsApi'
import { ToolsGalleryPage } from '../ToolsGalleryPage'

vi.mock('../../../../components/gallery/GalleryPage')
vi.mock('../../../../components/gallery/ImageCard')
vi.mock('../../toolsApi')

describe('ToolsGalleryPage', () => {
    beforeEach(() => {
        vi.mocked(useReadToolsQuery as Mock).mockReturnValue({
            data: mockTools,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of tools when data is available', () => {
        render(<ToolsGalleryPage />)

        const galleryPage = screen.getByTestId('mocked-gallery-page')
        const title = screen.getByText('Инструменты')
        const mediaContent = screen.getByTestId('mocked-media-content')

        expect(galleryPage).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(mediaContent).toBeInTheDocument()

        mockTools.forEach((tool) => {
            const imageCard = screen.getByTestId(
                `mocked-image-card-${tool._id}`
            )
            const title = screen.getByText(tool.name)
            const path = screen.getByText(`/tools/${tool._id}`)

            expect(imageCard).toBeInTheDocument()
            expect(title).toBeInTheDocument()
            expect(path).toBeInTheDocument()
        })
    })
})
