import type { MutationResult } from '../../types'
import { apiSlice } from '../api/apiSlice'
import { Questionnaire } from './types'

export const questionnaireApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addQuestionnaire: builder.mutation<
            MutationResult,
            Partial<Questionnaire>
        >({
            query: (data) => ({
                url: '/questionnaire/one',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useAddQuestionnaireMutation } = questionnaireApiSlice
