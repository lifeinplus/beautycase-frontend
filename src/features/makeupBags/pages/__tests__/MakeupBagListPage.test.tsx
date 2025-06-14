import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { selectRole, selectUsername } from '../../../auth/authSlice'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockMakeupBags } from '../../__mocks__/makeupBagsApi'
import { useGetAllMakeupBagsQuery } from '../../makeupBagsApi'
import { MakeupBagListPage } from '../MakeupBagListPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')
vi.mock('../../components/MakeupBagMobileView')
vi.mock('../../components/MakeupBagTable')
vi.mock('../../makeupBagsApi')

describe('MakeupBagListPage', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        vi.mocked(useGetAllMakeupBagsQuery as Mock).mockReturnValue({
            data: mockMakeupBags,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        render(<MakeupBagListPage />)

        const header = screen.getByTestId('mocked-header')
        const hero = screen.getByTestId('mocked-hero')
        const dataWrapper = screen.getByTestId('mocked-data-wrapper')
        const navBar = screen.getByTestId('mocked-nav-bar')

        expect(header).toBeInTheDocument()
        expect(hero).toBeInTheDocument()
        expect(dataWrapper).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<MakeupBagListPage />)

        const mobileView = screen.getByTestId('mocked-makeup-bag-mobile-view')
        const table = screen.getByTestId('mocked-makeup-bag-table')

        expect(mobileView).toBeInTheDocument()
        expect(table).toBeInTheDocument()
    })

    it('navigates to add page when add button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagListPage />)

        const button = screen.getByRole('button', { name: /Добавить/i })
        await user.click(button)

        expect(button).toBeInTheDocument()
        expect(mockNavigate).toHaveBeenCalledWith('add')
    })
})
