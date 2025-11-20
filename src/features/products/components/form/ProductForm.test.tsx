import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { mockBrands } from '@/features/brands/api/__mocks__/brandsApi'
import { useGetAllBrandsQuery } from '@/features/brands/api/brandsApi'
import { useGetProductCategoriesQuery } from '@/features/categories/api/categoriesApi'
import { ROUTES } from '@/shared/config/routes'
import { mockOnSubmit } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { mockProduct1 } from '../../api/__mocks__/productsApi'
import { ProductForm } from './ProductForm'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/brands/api/brandsApi')
vi.mock('@/features/categories/api/categoriesApi')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/shared/components/common/title-section/TitleSection')
vi.mock('@/shared/components/forms/image/files-section/ImageFilesSection')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')

describe('ProductForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockProduct1)

        vi.mocked(useGetAllBrandsQuery as Mock).mockReturnValue({
            data: mockBrands,
        })

        vi.mocked(useGetProductCategoriesQuery as Mock).mockReturnValue({
            data: mockBrands,
        })
    })

    it('renders all required form fields', () => {
        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)

        expect(screen.getByRole('navigation')).toBeInTheDocument()

        expect(screen.getAllByRole('combobox')).toHaveLength(2)

        const placeholders = [
            'fields.name.label',
            'fields.shade.label',
            'fields.comment.label',
        ]

        placeholders.forEach((p) =>
            expect(screen.getByPlaceholderText(p)).toBeInTheDocument()
        )

        const image = screen.getByTestId('mocked-image-files-section')
        expect(image).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.products.details('123')
        )
    })
})
