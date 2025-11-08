import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import {
    mockMuas,
    mockUser1,
    mockUserResult,
    mockUsers,
} from './__mocks__/usersApi'
import {
    useDeleteUserByIdMutation,
    useGetAllClientsQuery,
    useGetAllMuasQuery,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
} from './usersApi'

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

    describe('getAllClients', () => {
        it('fetches all clients successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllClientsQuery()
            )

            expect(result.current.isLoading).toBe(true)
            await waitFor(() => expect(result.current.isSuccess).toBe(true))
            expect(result.current.data).toEqual(mockUsers)
        })
    })

    describe('getAllMuas', () => {
        it('fetches all MUAs successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllMuasQuery()
            )

            expect(result.current.isLoading).toBe(true)
            await waitFor(() => expect(result.current.isSuccess).toBe(true))
            expect(result.current.data).toEqual(mockMuas)
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

    describe('deleteUserById', () => {
        it('deletes user successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useDeleteUserByIdMutation()
            )

            const [deleteUser] = result.current

            const response = await deleteUser(mockUser1._id).unwrap()

            expect(response).toEqual({ id: mockUser1._id })
        })
    })
})
