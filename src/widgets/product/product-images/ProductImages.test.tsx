import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockProducts } from '@/features/products/__mocks__/productsApi'
import { mockNavigate } from '@/tests/mocks/router'
import userEvent from '@testing-library/user-event'
import { ProductImages } from './ProductImages'

vi.mock('@/shared/components/ui/Image')
vi.mock('./ui/SelectTile')

describe('ProductImages', () => {
    it('navigates to product details when product is clicked', async () => {
        const user = userEvent.setup()

        const { container } = render(<ProductImages products={mockProducts} />)

        const image = container.querySelector(
            "[class*='container'][class*='square']"
        )

        expect(image).not.toBeNull()

        await user.click(image as HTMLElement)

        expect(mockNavigate).toHaveBeenCalledWith('/products/product1', {
            state: { fromPathname: '/test-pathname' },
        })
    })
})
