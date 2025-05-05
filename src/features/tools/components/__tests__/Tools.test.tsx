import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockTools } from '../../__mocks__/toolsApiSlice'
import { Tools } from '../Tools'

vi.mock('../../../../components/GoodsGrid')

describe('Tools', () => {
    it('renders the component with heading', () => {
        render(<Tools tools={mockTools} />)

        const heading = screen.getByRole('heading', {
            name: 'Инструменты',
            level: 2,
        })

        expect(heading).toBeInTheDocument()
    })

    it('renders GoodsGrid only for tools with products', () => {
        render(<Tools tools={mockTools} />)

        const goodsGrids = screen.getAllByTestId('mocked-goods-grid')
        expect(goodsGrids).toHaveLength(1)

        expect(screen.getByText('Base Path: /tools')).toBeInTheDocument()
        expect(screen.getByText('Goods Count: 2')).toBeInTheDocument()
    })
})
