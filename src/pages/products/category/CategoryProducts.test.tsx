import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockProducts } from '@/features/products/api/__mocks__/productsApi'
import { useGetProductsByCategoryQuery } from '@/features/products/api/productsApi'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { CategoryProducts } from './CategoryProducts'

vi.mock('@/features/products/api/productsApi')

describe('CategoryProducts', () => {
    beforeEach(() => {
        vi.mocked(useGetProductsByCategoryQuery as Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null,
        })
    })

    it('renders products with title and subtitle', () => {
        renderWithRouter(<CategoryProducts />)
        expect(screen.getAllByText(/categories.product/i)).toHaveLength(2)
        expect(screen.getAllByRole('img')).toHaveLength(2)
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        renderWithRouter(<CategoryProducts />)

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

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
