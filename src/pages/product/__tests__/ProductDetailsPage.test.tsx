import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockProduct1 } from '@/features/products/__mocks__/productsApi'
import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/productsApi'
import { ProductDetailsPage } from '../ProductDetailsPage'

vi.mock('@/features/products/productsApi')
vi.mock('@/shared/components/ui/Image')
vi.mock('@/widgets/DetailsPage')

describe('ProductDetailsPage', () => {
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
        render(<ProductDetailsPage />)

        expect(screen.getByText(mockProduct1.name)).toBeInTheDocument()
        expect(screen.getByText(mockProduct1.brand?.name!)).toBeInTheDocument()
    })
})
