import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { mockBrands } from '@/features/brands/api/__mocks__/brandsApi'
import { useGetAllBrandsQuery } from '@/features/brands/api/brandsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockOnSubmit } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { renderWithProviders } from '@/tests/mocks/wrappers'
import { mockTool1 } from '../../api/__mocks__/toolsApi'
import { ToolForm } from './ToolForm'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/brands/api/brandsApi')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/shared/components/common/title-section/TitleSection')
vi.mock('@/shared/components/forms/image/files-section/ImageFilesSection')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')

describe('ToolForm', () => {
    const mockTitle = 'Test Title'

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue(mockTool1)

        vi.mocked(useGetAllBrandsQuery as Mock).mockReturnValue({
            data: mockBrands,
        })
    })

    it('renders all required form fields', () => {
        renderWithProviders(
            <ToolForm title={mockTitle} onSubmit={mockOnSubmit} />
        )

        expect(screen.getByRole('navigation')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-image-files-section')
        ).toBeInTheDocument()

        expect(screen.getByRole('combobox')).toBeInTheDocument()

        const placeholders = ['fields.name.label', 'fields.comment.label']

        placeholders.forEach((p) =>
            expect(screen.getByPlaceholderText(p)).toBeInTheDocument()
        )
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<ToolForm title={mockTitle} onSubmit={mockOnSubmit} />)

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.tools.details('123')
        )
    })
})
