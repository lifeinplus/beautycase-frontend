import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockTools } from '../../api/__mocks__/toolsApi'
import { Tools } from './Tools'

vi.mock('@/shared/components/gallery/goods-grid/GoodsGrid')

describe('Tools', () => {
    it('renders the component with heading', () => {
        render(<Tools tools={mockTools} />)

        const heading = screen.getByRole('heading', {
            name: 'titles.list',
            level: 2,
        })

        expect(heading).toBeInTheDocument()
    })

    it('renders GoodsGrid only for tools with products', () => {
        render(<Tools tools={mockTools} />)

        const goodsGrids = screen.getAllByTestId('mocked-goods-grid')
        expect(goodsGrids).toHaveLength(1)

        expect(screen.getByText('Base Path: /tools')).toBeInTheDocument()
        expect(
            screen.getByText(`Goods Count: ${mockTools.length}`)
        ).toBeInTheDocument()
    })
})
