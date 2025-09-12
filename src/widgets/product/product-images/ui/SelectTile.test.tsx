import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { setFormData } from '@/features/form/slice/formSlice'
import {
    mockProduct1,
    mockProduct2,
    mockProducts,
} from '@/features/products/api/__mocks__/productsApi'
import { mockNavigate } from '@/tests/mocks/router'
import userEvent from '@testing-library/user-event'
import { SelectTile } from './SelectTile'

vi.mock('@/app/hooks/hooks')

describe('SelectTile', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })
    })

    it('renders SelectTile correctly', () => {
        render(<SelectTile products={mockProducts} />)

        expect(
            screen.getByTestId('mocked-squares-plus-icon')
        ).toBeInTheDocument()
    })

    it('renders null if there has no access', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<SelectTile products={mockProducts} />)

        expect(
            screen.queryByTestId('mocked-squares-plus-icon')
        ).not.toBeInTheDocument()
    })

    it('navigates to products page when add button is clicked', async () => {
        const user = userEvent.setup()

        render(<SelectTile products={mockProducts} />)

        await user.click(screen.getByTestId('mocked-squares-plus-icon'))

        expect(mockDispatch).toHaveBeenCalledWith(
            setFormData({
                productIds: [mockProduct1._id, mockProduct2._id],
            })
        )

        expect(mockNavigate).toHaveBeenCalledWith('products')
    })
})
