import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockStages } from '../../api/__mocks__/stagesApi'
import { Stages } from './Stages'

vi.mock('@/shared/components/common/image-section/ImageSection')
vi.mock('@/shared/components/gallery/goods-grid/GoodsGrid')

describe('Stages', () => {
    it('renders the component with heading', () => {
        render(<Stages stages={mockStages} />)

        const heading = screen.getByRole('heading', {
            name: 'titles.list',
            level: 2,
        })
        expect(heading).toBeInTheDocument()
    })

    it('renders all stages correctly', () => {
        render(<Stages stages={mockStages} />)

        const title1 = screen.getByText(mockStages[0].title)
        const title2 = screen.getByText(mockStages[1].title)

        expect(title1).toBeInTheDocument()
        expect(title2).toBeInTheDocument()

        const subtitle1 = screen.getByText(mockStages[0].subtitle)
        const subtitle2 = screen.getByText(mockStages[1].subtitle)

        expect(subtitle1).toBeInTheDocument()
        expect(subtitle2).toBeInTheDocument()
    })

    it('renders image sections for each stage', () => {
        render(<Stages stages={mockStages} />)
        expect(screen.getAllByTestId('mocked-image-section')).toHaveLength(2)
    })

    it('renders steps for each stage', () => {
        render(<Stages stages={mockStages} />)

        expect(screen.getByText('Step 1.1')).toBeInTheDocument()
        expect(screen.getByText('Step 1.2')).toBeInTheDocument()
        expect(screen.getByText('Step 1.3')).toBeInTheDocument()
        expect(screen.getByText('Step 2.1')).toBeInTheDocument()
        expect(screen.getByText('Step 2.2')).toBeInTheDocument()
    })

    it('renders GoodsGrid only for stages with products', () => {
        render(<Stages stages={mockStages} />)

        const goodsGrids = screen.getAllByTestId('mocked-goods-grid')
        expect(goodsGrids).toHaveLength(1)

        expect(screen.getByText('Goods Count: 1')).toBeInTheDocument()
        expect(screen.getByText('Base Path: /products')).toBeInTheDocument()
    })

    it('does not render anything when stages are undefined', () => {
        render(<Stages stages={undefined} />)

        const heading = screen.getByRole('heading', {
            name: 'titles.list',
            level: 2,
        })
        expect(heading).toBeInTheDocument()

        const image = screen.queryByTestId('mocked-image')
        const goodsGrid = screen.queryByTestId('mocked-goods-grid')

        expect(image).not.toBeInTheDocument()
        expect(goodsGrid).not.toBeInTheDocument()
    })
})
