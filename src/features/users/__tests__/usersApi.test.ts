import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import { mockUserResult, mockUsers } from '../__mocks__/usersApi'
import { useGetUserByIdQuery, useGetAllUsersQuery } from '../usersApi'

describe('usersApi', () => {
    describe('getAllUsers', () => {
        it('fetches all users successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllUsersQuery()
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toEqual(mockUsers)
        })
    })

    describe('getUserById', () => {
        it('fetches a single user successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetUserByIdQuery('user1')
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
})
