import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockTools } from '@/features/tools/api/__mocks__/toolsApi'
import { useGetMineToolsQuery } from '@/features/tools/api/toolsApi'
import { renderWithProviderAndRouter } from '@/tests/mocks/wrappers'
import { ToolsGallery } from './ToolsGallery'

vi.mock('@/features/tools/api/toolsApi')
vi.mock('@/shared/components/layout/header/Header')
vi.mock('@/widgets/view/gallery/Gallery')

describe('ToolsGallery', () => {
    beforeEach(() => {
        vi.mocked(useGetMineToolsQuery as Mock).mockReturnValue({
            data: mockTools,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of tools when data is available', () => {
        renderWithProviderAndRouter(<ToolsGallery />)
        expect(screen.getAllByText(/titles.gallery\b/i)).toHaveLength(2)
        expect(screen.getAllByRole('img')).toHaveLength(3)
    })
})
