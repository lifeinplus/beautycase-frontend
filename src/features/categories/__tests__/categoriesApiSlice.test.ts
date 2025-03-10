import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockCategories, renderWithProvider } from '../../../mocks'
import { useGetCategoriesQuery } from '../categoriesApiSlice'

describe('categoriesApiSlice', () => {
    it('reads all categories', async () => {
        const { result } = renderWithProvider(() => useGetCategoriesQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toHaveLength(2)
        expect(result.current.data).toEqual(mockCategories)
        expect(result.current.data?.[0]._id).toBe(mockCategories[0]._id)
    })
})
