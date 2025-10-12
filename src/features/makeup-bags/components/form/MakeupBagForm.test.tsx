import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks/hooks'
import { mockCategories } from '@/features/categories/api/__mocks__/categoriesApi'
import { useGetMakeupBagCategoriesQuery } from '@/features/categories/api/categoriesApi'
import { setFormData } from '@/features/form/slice/formSlice'
import { mockUsers } from '@/features/users/api/__mocks__/usersApi'
import { useGetAllUsersQuery } from '@/features/users/api/usersApi'
import { mockOnSubmit } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { mockMakeupBag1 } from '../../api/__mocks__/makeupBagsApi'
import { MakeupBagForm } from '../form/MakeupBagForm'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/categories/api/categoriesApi')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/users/api/usersApi')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')

describe('MakeupBagForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockMakeupBag1)

        vi.mocked(useGetMakeupBagCategoriesQuery as Mock).mockReturnValue({
            data: mockCategories,
        })

        vi.mocked(useGetAllUsersQuery as Mock).mockReturnValue({
            data: mockUsers,
        })
    })

    it('renders all required form fields', () => {
        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        expect(screen.getByRole('navigation')).toBeInTheDocument()

        const fields = [
            'fields.category.label',
            'fields.client.label',
            'fields.stages.label',
            'fields.tools.label',
        ]

        fields.forEach((f) => expect(screen.getByText(f)).toBeInTheDocument())
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('navigates to tools selection and saves form data', async () => {
        const user = userEvent.setup()

        render(<MakeupBagForm title={mockTitle} onSubmit={mockOnSubmit} />)

        await user.click(
            screen.getByRole('button', {
                name: /fields.tools.label/,
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
                name: /fields.stages.label/,
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
