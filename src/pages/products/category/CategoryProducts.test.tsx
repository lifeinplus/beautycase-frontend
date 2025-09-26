import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockProducts } from '@/features/products/api/__mocks__/productsApi'
import { useGetProductsByCategoryQuery } from '@/features/products/api/productsApi'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { CategoryProducts } from './CategoryProducts'

vi.mock('@/features/products/api/productsApi')
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/gallery/image-card/ImageCard')
vi.mock('@/shared/components/layout/top-panel/TopPanel')

describe('CategoryProducts', () => {
    beforeEach(() => {
        vi.mocked(useGetProductsByCategoryQuery as Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null,
        })
    })

    it('renders products with title and subtitle', () => {
        render(<CategoryProducts />)
        expect(screen.getAllByText(/categories.product/i)).toHaveLength(2)
        expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<CategoryProducts />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/products')
    })

    it('shows loading state', () => {
        vi.mocked(useGetProductsByCategoryQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
        })

        render(<CategoryProducts />)

        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    it('shows error state', () => {
        vi.mocked(useGetProductsByCategoryQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: mockError,
        })

        render(<CategoryProducts />)

        expect(screen.getByText('UNKNOWN_ERROR')).toBeInTheDocument()
    })
})
