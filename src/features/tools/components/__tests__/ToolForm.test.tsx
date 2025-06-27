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
import { mockTool1 } from '../../__mocks__/toolsApi'
import { ToolForm } from '../ToolForm'

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

describe('ToolForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockTool1)

        vi.mocked(useGetAllBrandsQuery as Mock).mockReturnValue({
            data: mockBrands,
        })
    })

    it('renders all required form fields', () => {
        render(<ToolForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const testIds = [
            'mocked-top-panel',
            'mocked-select-section',
            'mocked-image-url-section',
            'mocked-input-section',
            'mocked-button-navigate-section',
        ]

        testIds.forEach((id) =>
            expect(screen.getByTestId(id)).toBeInTheDocument()
        )

        const placeholders = ['fields.name.label', 'fields.comment.label']

        placeholders.forEach((p) =>
            expect(screen.getByPlaceholderText(p)).toBeInTheDocument()
        )
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<ToolForm title={mockTitle} onSubmit={mockOnSubmit} />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to store links adding and saves form data', async () => {
        const user = userEvent.setup()

        render(<ToolForm title={mockTitle} onSubmit={mockOnSubmit} />)
        await user.click(screen.getByTestId('mocked-button-navigate-section'))

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/stores/links/add')
    })

    it('displays the correct number of added store links', () => {
        render(<ToolForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const stagesText = screen.getByText('fields.storeLinks.selected: 1')
        expect(stagesText).toBeInTheDocument()
    })
})
