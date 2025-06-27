import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import {
    renderWithProviderAndRouter,
    renderWithProviders,
} from '../../../../tests/mocks/wrappers'
import { selectUserId } from '../../../auth/authSlice'
import {
    mockUseGetUserByIdQuery,
    mockUserLesson1,
    mockUserLesson2,
    mockUserMakeupBag1,
    mockUserMakeupBag2,
    mockUserResult,
} from '../../../users/__mocks__/usersApi'
import { AccountPage } from '../AccountPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')
vi.mock('../../../users/usersApi')

describe('AccountPage', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectUserId) return 'user123'
            return null
        })

        mockUseGetUserByIdQuery.mockReturnValue({
            data: mockUserResult,
            isLoading: false,
            error: null,
        })
    })

    it('renders loading state correctly', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        })

        renderWithProviders(<AccountPage />)

        expect(screen.getByTestId('mocked-data-wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-loading')).toBeInTheDocument()
    })

    it('renders the page title and subtitle', () => {
        renderWithProviderAndRouter(<AccountPage />)

        const matchers = [
            'mocked-header',
            'mocked-hero',
            'mocked-data-wrapper',
            'mocked-nav-bar',
        ]

        matchers.forEach((m) =>
            expect(screen.getByTestId(m)).toBeInTheDocument()
        )
    })

    it('renders user data correctly', () => {
        renderWithProviderAndRouter(<AccountPage />)

        const matchers = [
            'fields.username.label',
            'fields.role.label',
            mockUserResult.user.username,
            mockUserResult.user.role,
        ]

        matchers.forEach((m) => expect(screen.getByText(m)).toBeInTheDocument())
    })

    it('renders makeup bags section with a link', () => {
        renderWithProviderAndRouter(<AccountPage />)

        const matchers = [
            'fields.makeupBags.label',
            mockUserMakeupBag1.category.name,
            mockUserMakeupBag2.category.name,
        ]

        matchers.forEach((m) => expect(screen.getByText(m)).toBeInTheDocument())

        const links = screen.getAllByRole('link', {
            name: 'fields.makeupBags.link',
        })

        expect(links).toHaveLength(2)
        expect(links[0]).toHaveAttribute('href', '/makeup_bags/makeupBag1')
        expect(links[1]).toHaveAttribute('href', '/makeup_bags/makeupBag2')
    })

    it('handles empty makeup bags', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: { ...mockUserResult, makeupBags: [] },
            isLoading: false,
            error: null,
        })

        renderWithProviderAndRouter(<AccountPage />)

        expect(
            screen.getByText('fields.makeupBags.emptyMessage')
        ).toBeInTheDocument()
    })

    it('renders lessons section with a link', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: { ...mockUserResult },
            isLoading: false,
            error: null,
        })

        renderWithProviderAndRouter(<AccountPage />)

        const matchers = [
            'fields.lessons.label',
            mockUserLesson1.title,
            mockUserLesson2.title,
        ]

        matchers.forEach((m) => expect(screen.getByText(m)).toBeInTheDocument())

        const links = screen.getAllByRole('link', {
            name: 'fields.lessons.link',
        })

        expect(links).toHaveLength(2)
        expect(links[0]).toHaveAttribute('href', '/lessons/lesson1')
        expect(links[1]).toHaveAttribute('href', '/lessons/lesson2')
    })

    it('handles empty lessons', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: { ...mockUserResult, lessons: [] },
            isLoading: false,
            error: null,
        })

        renderWithProviderAndRouter(<AccountPage />)

        expect(
            screen.getByText('fields.lessons.emptyMessage')
        ).toBeInTheDocument()
    })

    it('handles error state', () => {
        mockUseGetUserByIdQuery.mockReturnValue({
            data: null,
            isLoading: false,
            error: 'User not found',
        })

        renderWithProviders(<AccountPage />)

        expect(screen.getByTestId('mocked-error')).toBeInTheDocument()
    })
})
