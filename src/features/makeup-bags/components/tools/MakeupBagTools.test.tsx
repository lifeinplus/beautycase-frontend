import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockTools } from '@/features/tools/api/__mocks__/toolsApi'
import { MakeupBagTools } from './MakeupBagTools'

vi.mock('@/shared/components/gallery/goods-grid/GoodsGrid')

describe('MakeupBagTools', () => {
    it('renders the component with heading', () => {
        render(<MakeupBagTools tools={mockTools} />)

        const heading = screen.getByRole('heading', {
            name: 'titles.list',
            level: 2,
        })

        expect(heading).toBeInTheDocument()
    })

    it('renders GoodsGrid only for tools with products', () => {
        render(<MakeupBagTools tools={mockTools} />)

        const goodsGrids = screen.getAllByTestId('mocked-goods-grid')
        expect(goodsGrids).toHaveLength(1)

        expect(screen.getByText('Base Path: /tools')).toBeInTheDocument()
        expect(
            screen.getByText(`Goods Count: ${mockTools.length}`)
        ).toBeInTheDocument()
    })
})
