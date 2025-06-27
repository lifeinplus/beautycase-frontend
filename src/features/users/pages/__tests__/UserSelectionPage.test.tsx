import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { setFormData } from '../../../form/formSlice'
import { mockUser1, mockUser2, mockUsers } from '../../__mocks__/usersApi'
import { useGetAllUsersQuery } from '../../usersApi'
import { UserSelectionPage } from '../UserSelectionPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/ui/Image')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../form/formSlice')
vi.mock('../../usersApi')

describe('UserSelectionPage', () => {
    const mockFormData = {
        clientIds: ['user2'],
    }

    beforeEach(() => {
        vi.mocked(useGetAllUsersQuery as Mock).mockReturnValue({
            data: mockUsers,
            isLoading: false,
            error: null,
        })
        vi.mocked(useAppSelector).mockReturnValue(mockFormData)
        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)
    })

    it('renders loading state when data is loading', () => {
        vi.mocked(useGetAllUsersQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
        })

        render(<UserSelectionPage />)

        expect(screen.getByText('loading')).toBeInTheDocument()
    })

    it('renders error state', () => {
        vi.mocked(useGetAllUsersQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: { message: 'An unknown error occurred' },
        })

        render(<UserSelectionPage />)

        expect(
            screen.getByText('An unknown error occurred')
        ).toBeInTheDocument()
    })

    it('renders client items', () => {
        render(<UserSelectionPage />)
        expect(screen.getByText(mockUser1.username)).toBeInTheDocument()
        expect(screen.getByText(mockUser2.username)).toBeInTheDocument()
    })

    it('shows selected state for preselected clients', () => {
        render(<UserSelectionPage />)
        const selected = document.querySelectorAll('.img-selected')
        expect(selected.length).toBe(1)
    })

    it('toggles client selection on click', async () => {
        const user = userEvent.setup()
        render(<UserSelectionPage />)

        const aliceRow = screen.getByText(mockUser1.username).closest('.grid')
        expect(aliceRow).toBeInTheDocument()

        await user.click(aliceRow!)
        const selected = document.querySelectorAll('.img-selected')
        expect(selected.length).toBe(2)

        await user.click(aliceRow!)
        const selectedAfter = document.querySelectorAll('.img-selected')
        expect(selectedAfter.length).toBe(1)
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()
        render(<UserSelectionPage />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves selection and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()
        render(<UserSelectionPage />)

        await user.click(
            screen.getByTestId('mocked-nav-button-navigation:actions.save')
        )

        expect(mockDispatch).toHaveBeenCalledWith(
            setFormData({
                ...mockFormData,
                clientIds: ['2'],
            })
        )
        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('uses an empty array when there is no clientIds', async () => {
        vi.mocked(useAppSelector).mockReturnValue({ clientIds: null })

        render(<UserSelectionPage />)

        const selected = document.querySelectorAll('.img-selected')
        expect(selected.length).toBe(0)
    })
})
