import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockProducts } from '@/features/products/api/__mocks__/productsApi'
import { mockNavigate } from '@/tests/mocks/router'
import userEvent from '@testing-library/user-event'
import { ProductImages } from './ProductImages'

vi.mock('./ui/SelectTile')

describe('ProductImages', () => {
    it('navigates to product details when product is clicked', async () => {
        const user = userEvent.setup()

        const { container } = render(
            <ProductImages products={mockProducts} viewMode />
        )

        const image = container.querySelector(
            "[class*='relative'][class*='aspect-square']"
        )

        expect(image).not.toBeNull()

        await user.click(image as HTMLElement)

        expect(mockNavigate).toHaveBeenCalledWith('/products/product1', {
            state: {
                origin: '/test-pathname',
                prev: '/test-pathname',
            },
        })
    })
})
