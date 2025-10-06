import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { mockBrands } from '@/features/brands/api/__mocks__/brandsApi'
import { useGetAllBrandsQuery } from '@/features/brands/api/brandsApi'
import { mockOnSubmit } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { mockTool1 } from '../../api/__mocks__/toolsApi'
import { ToolForm } from './ToolForm'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/brands/api/brandsApi')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/shared/components/common/title-section/TitleSection')
vi.mock('@/shared/components/forms/image/url-section/ImageUrlSection')
vi.mock('@/shared/components/forms/select/section/SelectSection')
vi.mock('@/shared/components/layout/top-panel/TopPanel')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')
vi.mock('@/shared/components/navigation/nav-button/NavButton')

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
})
