import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import { mockCategories } from '../__mocks__/categoriesApi'
import { useGetAllCategoriesQuery } from '../categoriesApi'

describe('categoriesApi', () => {
    describe('getAllCategories', () => {
        it('gets all categories', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllCategoriesQuery()
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toHaveLength(2)
            expect(result.current.data).toEqual(mockCategories)
            expect(result.current.data?.[0]._id).toBe(mockCategories[0]._id)
        })
    })
})
