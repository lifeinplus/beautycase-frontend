import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import {
    mockStage1,
    mockStages,
} from '@/features/stages/api/__mocks__/stagesApi'
import { useGetAllStagesQuery } from '@/features/stages/api/stagesApi'
import { StageList } from './StageList'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/stages/components/filter/StageFilter')
vi.mock('@/features/stages/components/mobile-view/StageMobileView')
vi.mock('@/features/stages/components/table/StageTable')
vi.mock('@/features/stages/api/stagesApi')
vi.mock('@/shared/components/layout/header/Header')

describe('StageList', () => {
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
        const ids = ['mocked-header', 'mocked-stage-filter']

        render(<StageList />)

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())

        expect(screen.getByText(/titles.list/)).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<StageList />)

        expect(
            screen.getByTestId('mocked-stage-mobile-view')
        ).toBeInTheDocument()
        expect(screen.getByTestId('mocked-stage-table')).toBeInTheDocument()
    })

    it('updates filtered stages when filter changes', async () => {
        const user = userEvent.setup()

        render(<StageList />)
        await user.click(screen.getByTestId('mocked-filter-button'))

        const stageMobileView = screen.getByTestId('mocked-stage-mobile-view')
        expect(stageMobileView.textContent).toContain(mockStage1.title)

        const stageTable = screen.getByTestId('mocked-stage-table')
        expect(stageTable.textContent).toContain(mockStage1.title)
    })
})
