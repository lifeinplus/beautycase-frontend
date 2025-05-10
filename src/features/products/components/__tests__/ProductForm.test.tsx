import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, expect, vi, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockOnSubmit } from '../../../../tests/mocks/form'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockBrands } from '../../../brands/__mocks__/brandsApi'
import { useReadBrandsQuery } from '../../../brands/brandsApi'
import { setFormData } from '../../../form/formSlice'
import { mockProduct } from '../../__mocks__/productsApi'
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
        vi.mocked(useAppSelector).mockReturnValue(mockProduct)

        vi.mocked(useReadBrandsQuery as Mock).mockReturnValue({
            data: mockBrands,
        })
    })

    it('renders all required form fields', () => {
        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const topPanel = screen.getByTestId('mocked-top-panel')
        expect(topPanel).toBeInTheDocument()

        const selectSection = screen.getByTestId('mocked-select-section')
        const name = screen.getByPlaceholderText('Название')
        const imageUrlSection = screen.getByTestId('mocked-image-url-section')
        const inputSection = screen.getByTestId('mocked-input-section')
        const comment = screen.getByPlaceholderText('Комментарий')
        const buttonNavigateSection = screen.getByTestId(
            'mocked-button-navigate-section'
        )

        expect(selectSection).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(imageUrlSection).toBeInTheDocument()
        expect(inputSection).toBeInTheDocument()
        expect(comment).toBeInTheDocument()
        expect(buttonNavigateSection).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByTestId('mocked-back-button')
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to store links adding and saves form data', async () => {
        const user = userEvent.setup()

        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByTestId('mocked-button-navigate-section')
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/stores/links/add')
    })

    it('displays the correct number of added store links', () => {
        render(<ProductForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const stagesText = screen.getByText('Добавлено: 1')
        expect(stagesText).toBeInTheDocument()
    })
})
