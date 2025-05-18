import { render, screen } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockProduct } from '../../__mocks__/productsApi'
import {
    useDeleteProductMutation,
    useReadProductQuery,
} from '../../productsApi'
import { ProductDetailsPage } from '../ProductDetailsPage'

vi.mock('../../../../components/pages/DetailsPage')
vi.mock('../../../../components/ui/Image')
vi.mock('../../productsApi')

describe('ProductDetailsPage', () => {
    const mockDeleteProduct = vi.fn()

    beforeEach(() => {
        vi.mocked(useReadProductQuery as Mock).mockReturnValue({
            data: mockProduct,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteProductMutation as Mock).mockReturnValue([
            mockDeleteProduct,
        ])
    })

    it('renders product details', async () => {
        render(<ProductDetailsPage />)

        const title = screen.getByText(mockProduct.name)
        const subtitle = screen.getByText(mockProduct.brand?.name!)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
    })
})
