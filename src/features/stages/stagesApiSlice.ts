import { apiSlice } from '../api'
import type { Stage } from './types'

const stagesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStages: builder.query<Stage[], void>({
            query: () => '/stages/all',
        }),
    }),
})

export const { useGetStagesQuery } = stagesApiSlice
