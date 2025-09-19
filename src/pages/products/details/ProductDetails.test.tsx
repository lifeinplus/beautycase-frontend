import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockProduct1 } from '@/features/products/api/__mocks__/productsApi'
import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import { ProductDetails } from './ProductDetails'

vi.mock('@/features/products/api/productsApi')
vi.mock('@/shared/components/common/image-section/ImageSection')
vi.mock('@/widgets/store/store-links/StoreLinks')
vi.mock('./hooks/useProductDetailsActions')

describe('ProductDetails', () => {
    const mockDeleteProduct = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetProductByIdQuery as Mock).mockReturnValue({
            data: mockProduct1,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteProductByIdMutation as Mock).mockReturnValue([
            mockDeleteProduct,
        ])
    })

    it('renders product details', async () => {
        render(<ProductDetails />)

        expect(screen.getAllByText(mockProduct1.name)).toHaveLength(2)
        expect(screen.getAllByText(mockProduct1.brand?.name!)).toHaveLength(2)
    })
})
