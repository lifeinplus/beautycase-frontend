import { apiSlice } from '../api'
import { type Product } from '../products'

export interface Stage {
    title: string
    image: string
    subtitle: string
    steps: string[]
    productIds: Product[]
}

const stagesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStages: builder.query<Stage[], void>({
            query: () => '/stages/all',
        }),
    }),
})

export const { useGetStagesQuery } = stagesApiSlice
