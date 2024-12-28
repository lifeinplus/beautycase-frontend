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
                url: '/questionnaires/one',
                method: 'POST',
                body: data,
            }),
        }),
        getQuestionnaireById: builder.query<Questionnaire, string>({
            query: (id) => `/questionnaires/${id}`,
        }),
        getQuestionnaires: builder.query<Questionnaire[], void>({
            query: () => '/questionnaires/all',
        }),
    }),
})

export const {
    useAddQuestionnaireMutation,
    useGetQuestionnaireByIdQuery,
    useGetQuestionnairesQuery,
} = questionnaireApiSlice
