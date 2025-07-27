import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockProduct1 } from '@/features/products/__mocks__/productsApi'
import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/productsApi'
import { ProductDetails } from './ProductDetails'

vi.mock('@/features/products/productsApi')
vi.mock('@/shared/components/common/ImageSection')
vi.mock('@/widgets/store/store-links/StoreLinks')
vi.mock('@/widgets/view/details/Details')

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

        expect(screen.getByText(mockProduct1.name)).toBeInTheDocument()
        expect(screen.getByText(mockProduct1.brand?.name!)).toBeInTheDocument()
    })
})
