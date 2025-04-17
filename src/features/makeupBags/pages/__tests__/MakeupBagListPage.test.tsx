import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { selectRole, selectUsername } from '../../../auth/authSlice'
import { type AdaptiveNavBarProps } from '../../../../components/navigation/AdaptiveNavBar'
import { type NavigationButtonProps } from '../../../../components/navigation/NavigationButton'
import { type DataWrapperProps } from '../../../../components/DataWrapper'
import { mockMakeupBags } from '../../../../tests/mocks/handlers/makeupBagsHandlers'
import { mockNavigate } from '../../../../tests/mocks/router'
import { useGetMakeupBagsQuery } from '../../makeupBagsApiSlice'
import type { MakeupBag } from '../../types'
import { MakeupBagListPage } from '../MakeupBagListPage'

vi.mock('../../../../components/navigation/AdaptiveNavBar', () => ({
    AdaptiveNavBar: ({ children }: AdaptiveNavBarProps) => (
        <div data-testid="mocked-nav-bar">{children}</div>
    ),
}))

vi.mock('../../../../components/navigation/NavigationButton', () => ({
    NavigationButton: ({ text, onClick }: NavigationButtonProps) => (
        <button onClick={onClick}>{text}</button>
    ),
}))

vi.mock('../../../../components/DataWrapper', () => ({
    DataWrapper: ({ children }: DataWrapperProps<MakeupBag>) => (
        <div data-testid="mocked-data-wrapper">{children}</div>
    ),
}))

vi.mock('../../../../components/Header', () => ({
    Header: () => <div data-testid="mocked-header" />,
}))

vi.mock('../../../../components/Hero', () => ({
    Hero: () => <div data-testid="mocked-hero" />,
}))

vi.mock('../../components/MakeupBagMobileView', () => ({
    MakeupBagMobileView: () => <div data-testid="mocked-mobile-view" />,
}))

vi.mock('../../components/MakeupBagTable', () => ({
    MakeupBagTable: () => <div data-testid="mocked-table" />,
}))

vi.mock('../../makeupBagsApiSlice', () => ({
    useGetMakeupBagsQuery: vi.fn(),
}))

describe('MakeupBagListPage', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        vi.mocked(useGetMakeupBagsQuery as Mock).mockReturnValue({
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

        const mobileView = screen.getByTestId('mocked-mobile-view')
        const table = screen.getByTestId('mocked-table')

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
