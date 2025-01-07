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
        editMakeupBag: builder.mutation<
            MakeupBag,
            { id: string } & Partial<MakeupBag>
        >({
            query: ({ id, clientId }) => ({
                url: `/makeup-bags/${id}`,
                method: 'PUT',
                body: { clientId },
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
    useEditMakeupBagMutation,
    useGetMakeupBagByIdQuery,
    useGetMakeupBagsQuery,
} = makeupBagsApiSlice
