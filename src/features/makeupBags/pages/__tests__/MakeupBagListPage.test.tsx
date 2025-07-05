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
vi.mock('../../../../shared/components/common/DataWrapper')
vi.mock('../../../../shared/components/navigation/NavBar')
vi.mock('../../../../shared/components/navigation/NavButton')
vi.mock('../../../../shared/components/layout/Header')
vi.mock('../../../../shared/components/common/Hero')
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

        const ids = [
            'mocked-header',
            'mocked-hero',
            'mocked-data-wrapper',
            'mocked-nav-bar',
        ]

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())
    })

    it('renders page components and list views', () => {
        render(<MakeupBagListPage />)

        expect(
            screen.getByTestId('mocked-makeup-bag-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-makeup-bag-table')
        ).toBeInTheDocument()
    })

    it('navigates to add page when add button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagListPage />)
        await user.click(screen.getByRole('button', { name: /add/ }))

        expect(mockNavigate).toHaveBeenCalledWith('add')
    })
})
