import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockNavigate } from '../../tests/mocks/router'
import { type Good, GoodsGrid } from '../GoodsGrid'

const mockGoods: Good[] = [
    {
        _id: '1',
        name: 'Product 1',
        imageUrl: '/images/product1.jpg',
        brand: { name: 'Brand A' },
    },
    {
        _id: '2',
        name: 'Product 2',
        imageUrl: '/images/product2.jpg',
        brand: { name: 'Brand B' },
    },
    {
        _id: '3',
        name: 'Product 3',
        imageUrl: '/images/product3.jpg',
        brand: { name: 'Brand C' },
    },
]

const mockBasePath = '/goods'

describe('GoodsGrid', () => {
    it('renders the grid with correct structure', () => {
        const { container } = render(
            <GoodsGrid goods={mockGoods} basePath={mockBasePath} />
        )

        const articleElement = container.querySelector('article')
        expect(articleElement).toBeInTheDocument()
        expect(articleElement).toHaveClass(
            'mx-auto',
            'mt-5',
            'grid',
            'max-w-2xl',
            'gap-y-8'
        )
    })

    it('renders the correct number of goods', () => {
        render(<GoodsGrid goods={mockGoods} basePath={mockBasePath} />)

        const productItems = screen.getAllByRole('heading', { level: 6 })
        expect(productItems).toHaveLength(3)
    })

    it('renders all goods correctly', () => {
        render(<GoodsGrid goods={mockGoods} basePath={mockBasePath} />)

        expect(screen.getByText('Product 1')).toBeInTheDocument()
        expect(screen.getByText('Product 2')).toBeInTheDocument()
        expect(screen.getByText('Product 3')).toBeInTheDocument()

        expect(screen.getByText('Brand A')).toBeInTheDocument()
        expect(screen.getByText('Brand B')).toBeInTheDocument()
        expect(screen.getByText('Brand C')).toBeInTheDocument()

        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(3)

        expect(images[0]).toHaveAttribute('src', '/images/product1.jpg')
        expect(images[1]).toHaveAttribute('src', '/images/product2.jpg')
        expect(images[2]).toHaveAttribute('src', '/images/product3.jpg')
    })

    it('navigates to the correct path when an item is clicked', () => {
        render(<GoodsGrid goods={mockGoods} basePath={mockBasePath} />)

        const productItems = screen.getAllByRole('heading', { level: 6 })

        fireEvent.click(productItems[0].parentElement!)
        expect(mockNavigate).toHaveBeenCalledWith('/goods/1', {
            state: { fromPathname: '/questionnaire' },
        })

        fireEvent.click(productItems[1].parentElement!)
        expect(mockNavigate).toHaveBeenCalledWith('/goods/2', {
            state: { fromPathname: '/questionnaire' },
        })
    })

    it('does not crash when goods list is empty', () => {
        render(<GoodsGrid goods={[]} basePath="/goods" />)

        expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
        expect(screen.queryByText('Product 2')).not.toBeInTheDocument()
    })
})
