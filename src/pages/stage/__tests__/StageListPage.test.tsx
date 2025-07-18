import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { mockStage1, mockStages } from '@/features/stages/__mocks__/stagesApi'
import { useGetAllStagesQuery } from '@/features/stages/stagesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { StageListPage } from '../StageListPage'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/authSlice')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/stages/components/StageFilter')
vi.mock('@/features/stages/components/StageMobileView')
vi.mock('@/features/stages/components/StageTable')
vi.mock('@/features/stages/stagesApi')
vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/layout/Header')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/utils/menu')

describe('StageListPage', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        vi.mocked(useGetAllStagesQuery as Mock).mockReturnValue({
            data: mockStages,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        const ids = [
            'mocked-header',
            'mocked-hero',
            'mocked-stage-filter',
            'mocked-data-wrapper',
            'mocked-nav-bar',
        ]

        render(<StageListPage />)

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())
    })

    it('renders page components and list views', () => {
        const ids = ['mocked-stage-mobile-view', 'mocked-stage-table']

        render(<StageListPage />)

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())
    })

    it('navigates to add page when add button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageListPage />)
        await user.click(screen.getByRole('button', { name: /add/ }))

        expect(mockNavigate).toHaveBeenCalledWith('add')
    })

    it('updates filtered stages when filter changes', async () => {
        const user = userEvent.setup()

        render(<StageListPage />)
        await user.click(screen.getByTestId('mocked-filter-button'))

        const stageTable = screen.getByTestId('mocked-stage-table')
        expect(stageTable.textContent).toContain(mockStage1.title)
    })
})
