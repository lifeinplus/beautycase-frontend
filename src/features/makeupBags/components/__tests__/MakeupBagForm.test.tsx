import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, expect, vi, Mock } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks'
import { mockOnSubmit } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { mockCategories } from '@/features/categories/__mocks__/categoriesApi'
import { useGetAllCategoriesQuery } from '@/features/categories/categoriesApi'
import { setFormData } from '@/features/form/formSlice'
import { mockUsers } from '@/features/users/__mocks__/usersApi'
import { useGetAllUsersQuery } from '@/features/users/usersApi'
import { mockMakeupBag1 } from '../../__mocks__/makeupBagsApi'
import { MakeupBagForm } from '../MakeupBagForm'

vi.mock('@/app/hooks')
vi.mock('@/shared/components/forms/ButtonNavigateSection')
vi.mock('@/shared/components/forms/SelectSection')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/features/categories/categoriesApi')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/users/usersApi')

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
            'fields.category.label',
            'fields.client.label',
            'fields.stages.label',
            'fields.tools.label',
        ]

        fields.forEach((f) => expect(screen.getByText(f)).toBeInTheDocument())

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to tools selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        await user.click(
            screen.getByRole('button', {
                name: 'fields.tools.label',
            })
        )

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('tools')
    })

    it('navigates to stages selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        await user.click(
            screen.getByRole('button', {
                name: 'fields.stages.label',
            })
        )

        expect(mockDispatch).toHaveBeenCalled()
        expect(setFormData).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('stages')
    })

    it('displays the correct number of selected stages and tools', () => {
        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        const stagesText = screen.getByText('fields.stages.selected: 2')
        const toolsText = screen.getByText('fields.tools.selected: 3')

        expect(stagesText).toBeInTheDocument()
        expect(toolsText).toBeInTheDocument()
    })
})
