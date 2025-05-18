import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderHookWithProvider } from '../../../tests/mocks/wrappers'
import { mockUserResult, mockUsers } from '../__mocks__/usersApi'
import { useReadUserQuery, useReadUsersQuery } from '../usersApi'

describe('usersApi', () => {
    it('fetches all users successfully', async () => {
        const { result } = renderHookWithProvider(() => useReadUsersQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockUsers)
    })

    it('fetches a single user successfully', async () => {
        const { result } = renderHookWithProvider(() =>
            useReadUserQuery('user1')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockUserResult)
    })

    it('handles 404 error when user is not found', async () => {
        const { result } = renderHookWithProvider(() => useReadUserQuery('999'))

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
    })
})
