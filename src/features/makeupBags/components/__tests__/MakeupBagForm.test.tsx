import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, expect, vi, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockOnSubmit } from '../../../../tests/mocks/form'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockCategories } from '../../../categories/__mocks__/categoriesApiSlice'
import { useGetCategoriesQuery } from '../../../categories/categoriesApiSlice'
import { setFormData } from '../../../form/formSlice'
import { mockUsers } from '../../../users/__mocks__/usersApiSlice'
import { useGetUsersQuery } from '../../../users/usersApiSlice'
import { mockMakeupBag } from '../../__mocks__/makeupBagsApiSlice'
import { MakeupBagForm } from '../MakeupBagForm'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../categories/categoriesApiSlice')
vi.mock('../../../form/components/ButtonNavigateSection')
vi.mock('../../../form/components/SelectSection')
vi.mock('../../../form/formSlice')
vi.mock('../../../users/usersApiSlice')

describe('MakeupBagForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockMakeupBag)

        vi.mocked(useGetCategoriesQuery as Mock).mockReturnValue({
            data: mockCategories,
        })

        vi.mocked(useGetUsersQuery as Mock).mockReturnValue({
            data: mockUsers,
        })
    })

    it('renders all required form fields', () => {
        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const topPanel = screen.getByTestId('mocked-top-panel')
        expect(topPanel).toBeInTheDocument()

        const category = screen.getByText('Категория')
        const client = screen.getByText('Клиент')
        const stages = screen.getByText('Этапы')
        const tools = screen.getByText('Инструменты')

        expect(category).toBeInTheDocument()
        expect(client).toBeInTheDocument()
        expect(stages).toBeInTheDocument()
        expect(tools).toBeInTheDocument()
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

        const button = screen.getByRole('button', { name: 'Инструменты' })
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/tools/selection')
    })

    it('navigates to stages selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const button = screen.getByRole('button', { name: 'Этапы' })
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/stages/selection')
    })

    it('displays the correct number of selected stages and tools', () => {
        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const stagesText = screen.getByText('Выбрано: 2')
        const toolsText = screen.getByText('Выбрано: 3')

        expect(stagesText).toBeInTheDocument()
        expect(toolsText).toBeInTheDocument()
    })
})
