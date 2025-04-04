import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    mockUserResult,
    mockUsers,
} from '../../../tests/mocks/handlers/usersHandlers'
import { renderHookWithProvider } from '../../../tests/mocks/wrappers'

import { useGetUserByIdQuery, useGetUsersQuery } from '../usersApiSlice'

describe('usersApiSlice', () => {
    it('fetches all users successfully', async () => {
        const { result } = renderHookWithProvider(() => useGetUsersQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockUsers)
    })

    it('fetches a single user successfully', async () => {
        const { result } = renderHookWithProvider(() =>
            useGetUserByIdQuery('1')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockUserResult)
    })

    it('handles 404 error when user is not found', async () => {
        const { result } = renderHookWithProvider(() =>
            useGetUserByIdQuery('999')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
    })
})
