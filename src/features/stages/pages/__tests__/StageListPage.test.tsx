import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { selectRole, selectUsername } from '../../../auth/authSlice'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockStage1, mockStages } from '../../__mocks__/stagesApi'
import { useGetAllStagesQuery } from '../../stagesApi'
import { StageListPage } from '../StageListPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')
vi.mock('../../../../utils/menu')
vi.mock('../../../auth/authSlice')
vi.mock('../../../form/formSlice')
vi.mock('../../components/StageFilter')
vi.mock('../../components/StageMobileView')
vi.mock('../../components/StageTable')
vi.mock('../../stagesApi')

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
        render(<StageListPage />)

        const header = screen.getByTestId('mocked-header')
        const hero = screen.getByTestId('mocked-hero')
        const stageFilter = screen.getByTestId('mocked-stage-filter')
        const dataWrapper = screen.getByTestId('mocked-data-wrapper')
        const navBar = screen.getByTestId('mocked-nav-bar')

        expect(header).toBeInTheDocument()
        expect(hero).toBeInTheDocument()
        expect(stageFilter).toBeInTheDocument()
        expect(dataWrapper).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<StageListPage />)

        const mobileView = screen.getByTestId('mocked-stage-mobile-view')
        const table = screen.getByTestId('mocked-stage-table')

        expect(mobileView).toBeInTheDocument()
        expect(table).toBeInTheDocument()
    })

    it('navigates to add page when add button is clicked', async () => {
        const user = userEvent.setup()

        render(<StageListPage />)

        const button = screen.getByRole('button', { name: 'actions.add' })
        await user.click(button)

        expect(button).toBeInTheDocument()
        expect(mockNavigate).toHaveBeenCalledWith('add')
    })

    it('updates filtered stages when filter changes', async () => {
        const user = userEvent.setup()

        render(<StageListPage />)

        const filterButton = screen.getByTestId('mocked-filter-button')
        await user.click(filterButton)

        const stageTable = screen.getByTestId('mocked-stage-table')
        expect(stageTable.textContent).toContain(mockStage1.title)
    })
})
