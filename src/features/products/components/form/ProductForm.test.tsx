import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { mockBrands } from '@/features/brands/api/__mocks__/brandsApi'
import { useGetAllBrandsQuery } from '@/features/brands/api/brandsApi'
import { useGetProductCategoriesQuery } from '@/features/categories/api/categoriesApi'
import { mockOnSubmit } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { mockProduct1 } from '../../api/__mocks__/productsApi'
import { ProductForm } from './ProductForm'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/brands/api/brandsApi')
vi.mock('@/features/categories/api/categoriesApi')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/shared/components/common/title-section/TitleSection')
vi.mock('@/shared/components/forms/image/url-section/ImageUrlSection')
vi.mock('@/shared/components/forms/input/section/InputSection')
vi.mock('@/shared/components/forms/select/section/SelectSection')
vi.mock('@/shared/components/forms/textarea/section/TextareaSection')
vi.mock('@/shared/components/layout/top-panel/TopPanel')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')
vi.mock('@/shared/components/navigation/nav-button/NavButton')

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

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()

        expect(screen.getAllByTestId('mocked-select-section')).toHaveLength(2)

        const placeholders = [
            'fields.name.label',
            'fields.shade.label',
            'fields.comment.label',
        ]

        placeholders.forEach((p) =>
            expect(screen.getByPlaceholderText(p)).toBeInTheDocument()
        )

        const image = screen.getByTestId('mocked-image-url-section')
        expect(image).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })
})
