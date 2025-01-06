import type { MutationResult } from '../../types'
import { apiSlice } from '../api'
import type { MakeupBag } from './types'

const makeupBagsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addMakeupBag: builder.mutation<MutationResult, Partial<MakeupBag>>({
            query: (data) => ({
                url: '/makeup-bags/one',
                method: 'POST',
                body: data,
            }),
        }),
        getMakeupBagById: builder.query<MakeupBag, string>({
            query: (id) => `/makeup-bags/${id}`,
        }),
        getMakeupBags: builder.query<MakeupBag[], void>({
            query: () => '/makeup-bags/all',
        }),
    }),
})

export const {
    useAddMakeupBagMutation,
    useGetMakeupBagByIdQuery,
    useGetMakeupBagsQuery,
} = makeupBagsApiSlice
