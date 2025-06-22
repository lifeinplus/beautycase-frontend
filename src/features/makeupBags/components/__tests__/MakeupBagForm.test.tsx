import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, expect, vi, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockOnSubmit } from '../../../../tests/mocks/form'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockCategories } from '../../../categories/__mocks__/categoriesApi'
import { useGetAllCategoriesQuery } from '../../../categories/categoriesApi'
import { setFormData } from '../../../form/formSlice'
import { mockUsers } from '../../../users/__mocks__/usersApi'
import { useGetAllUsersQuery } from '../../../users/usersApi'
import { mockMakeupBag1 } from '../../__mocks__/makeupBagsApi'
import { MakeupBagForm } from '../MakeupBagForm'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../categories/categoriesApi')
vi.mock('../../../form/components/ButtonNavigateSection')
vi.mock('../../../form/components/SelectSection')
vi.mock('../../../form/formSlice')
vi.mock('../../../users/usersApi')

describe('MakeupBagForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockMakeupBag1)

        vi.mocked(useGetAllCategoriesQuery as Mock).mockReturnValue({
            data: mockCategories,
        })

        vi.mocked(useGetAllUsersQuery as Mock).mockReturnValue({
            data: mockUsers,
        })
    })

    it('renders all required form fields', () => {
        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const fields = [
            'fields.category',
            'fields.client',
            'fields.stages',
            'fields.tools',
        ]

        fields.forEach((f) => expect(screen.getByText(f)).toBeInTheDocument())

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByTestId('mocked-back-button')
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to tools selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: 'fields.tools' })
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/tools/selection')
    })

    it('navigates to stages selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: 'fields.stages' })
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/stages/selection')
    })

    it('displays the correct number of selected stages and tools', () => {
        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const stagesText = screen.getByText('fields.selected: 2')
        const toolsText = screen.getByText('fields.selected: 3')

        expect(stagesText).toBeInTheDocument()
        expect(toolsText).toBeInTheDocument()
    })
})
