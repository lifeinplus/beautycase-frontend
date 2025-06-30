import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, expect, vi, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockOnSubmit } from '../../../../tests/mocks/form'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockBrands } from '../../../brands/__mocks__/brandsApi'
import { useGetAllBrandsQuery } from '../../../brands/brandsApi'
import { setFormData } from '../../../form/formSlice'
import { mockProduct1 } from '../../__mocks__/productsApi'
import { ProductForm } from '../ProductForm'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../brands/brandsApi')
vi.mock('../../../form/components/ButtonNavigateSection')
vi.mock('../../../form/components/ImageUrlSection')
vi.mock('../../../form/components/InputSection')
vi.mock('../../../form/components/SelectSection')
vi.mock('../../../form/components/TextareaSection')
vi.mock('../../../form/formSlice')

describe('ProductForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockProduct1)

        vi.mocked(useGetAllBrandsQuery as Mock).mockReturnValue({
            data: mockBrands,
        })
    })

    it('renders all required form fields', () => {
        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()

        const brand = screen.getByTestId('mocked-select-section')
        expect(brand).toBeInTheDocument()

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

        const storeLinks = screen.getByTestId('mocked-button-navigate-section')
        expect(storeLinks).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to store links adding and saves form data', async () => {
        const user = userEvent.setup()

        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)
        await user.click(screen.getByTestId('mocked-button-navigate-section'))

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('links')
    })

    it('displays the correct number of added store links', () => {
        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const stagesText = screen.getByText('fields.storeLinks.selected: 1')
        expect(stagesText).toBeInTheDocument()
    })
})
