import { apiSlice } from '../api'
import { type Brand } from '../brands'
import { type Stage } from '../stages'

interface MakeupBag {
    brands: Brand[]
    stages: Stage[]
}

const makeupBagApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMakeupBag: builder.query<MakeupBag, void>({
            query: () => `makeup-bag`,
        }),
    }),
})

export const { useGetMakeupBagQuery } = makeupBagApiSlice
