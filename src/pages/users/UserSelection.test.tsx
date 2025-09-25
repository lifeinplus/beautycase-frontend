import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { setFormData } from '@/features/form/slice/formSlice'
import {
    mockUser1,
    mockUser2,
    mockUsers,
} from '@/features/users/api/__mocks__/usersApi'
import { useGetAllUsersQuery } from '@/features/users/api/usersApi'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { UserSelection } from './UserSelection'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/users/api/usersApi')
vi.mock('@/shared/components/common/title-section/TitleSection')
vi.mock('@/shared/components/layout/top-panel/TopPanel')
vi.mock('@/shared/components/ui/button-submit/ButtonSubmit')
vi.mock('@/shared/components/ui/image/Image')

describe('UserSelection', () => {
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

        render(<UserSelection />)

        expect(screen.getByText('loading')).toBeInTheDocument()
    })

    it('renders error state', () => {
        vi.mocked(useGetAllUsersQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: mockError,
        })

        render(<UserSelection />)

        expect(screen.getByText('UNKNOWN_ERROR')).toBeInTheDocument()
    })

    it('renders client items', () => {
        render(<UserSelection />)
        expect(screen.getByText(mockUser1.username)).toBeInTheDocument()
        expect(screen.getByText(mockUser2.username)).toBeInTheDocument()
    })

    it('shows selected state for preselected clients', () => {
        render(<UserSelection />)
        const selected = document.querySelectorAll("[class*='selected']")
        expect(selected.length).toBe(1)
    })

    it('toggles client selection on click', async () => {
        const user = userEvent.setup()
        render(<UserSelection />)

        const aliceRow = screen.getByText(mockUser1.username).closest('.grid')
        expect(aliceRow).toBeInTheDocument()

        await user.click(aliceRow!)
        const selected = document.querySelectorAll("[class*='selected']")
        expect(selected.length).toBe(2)

        await user.click(aliceRow!)
        const selectedAfter = document.querySelectorAll("[class*='selected']")
        expect(selectedAfter.length).toBe(1)
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()
        render(<UserSelection />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves selection and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()
        render(<UserSelection />)

        await user.click(screen.getByTestId('mocked-button-submit'))

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

        render(<UserSelection />)

        const selected = document.querySelectorAll("[class*='selected']")
        expect(selected.length).toBe(0)
    })
})
