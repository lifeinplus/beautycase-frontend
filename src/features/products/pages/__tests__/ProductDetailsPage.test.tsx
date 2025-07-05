import { render, screen } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockProduct1 } from '../../__mocks__/productsApi'
import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '../../productsApi'
import { ProductDetailsPage } from '../ProductDetailsPage'

vi.mock('../../../../app/routes/DetailsPage')
vi.mock('../../../../shared/components/ui/Image')
vi.mock('../../productsApi')

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

        const title = screen.getByText(mockProduct1.name)
        const subtitle = screen.getByText(mockProduct1.brand?.name!)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
    })
})
