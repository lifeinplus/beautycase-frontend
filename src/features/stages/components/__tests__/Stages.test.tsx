import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { mockStages } from '../../__mocks__/stagesApi'
import { Stages } from '../Stages'

vi.mock('@/shared/components/gallery/GoodsGrid')
vi.mock('@/shared/components/ui/Image')

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

    it('renders images for each stage', () => {
        render(<Stages stages={mockStages} />)

        const images = screen.getAllByTestId('mocked-image')
        expect(images).toHaveLength(2)

        expect(images[0]).toHaveAttribute('alt', mockStages[0].title)
        expect(images[0]).toHaveAttribute('src', mockStages[0].imageUrl)

        expect(images[1]).toHaveAttribute('alt', mockStages[1].title)
        expect(images[1]).toHaveAttribute('src', mockStages[1].imageUrl)
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
