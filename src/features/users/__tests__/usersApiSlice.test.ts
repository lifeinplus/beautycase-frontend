import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockUser, mockUsers, Wrapper } from '../../../mocks'
import { useGetUserByIdQuery, useGetUsersQuery } from '../usersApiSlice'

const renderWithProvider = <T>(hook: () => T) => {
    return renderHook(hook, { wrapper: Wrapper })
}

describe('usersApiSlice', () => {
    it('fetches all users successfully', async () => {
        const { result } = renderWithProvider(() => useGetUsersQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockUsers)
    })

    it('fetches a single user successfully', async () => {
        const { result } = renderWithProvider(() => useGetUserByIdQuery('1'))

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockUser)
    })

    it('handles 404 error when user is not found', async () => {
        const { result } = renderWithProvider(() => useGetUserByIdQuery('999'))

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
    })
})
