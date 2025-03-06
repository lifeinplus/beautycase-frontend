import type { MutationResult } from '../../types'
import { cleanObject } from '../../utils'
import { apiSlice } from '../api/apiSlice'
import { Questionnaire } from './types'

export const questionnaireApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addQuestionnaire: builder.mutation<MutationResult, Questionnaire>({
            query: (data) => ({
                url: '/questionnaires/one',
                method: 'POST',
                body: cleanObject(data),
            }),
            invalidatesTags: ['Questionnaires'],
        }),
        getQuestionnaireById: builder.query<Questionnaire, string>({
            query: (id) => `/questionnaires/${id}`,
            providesTags: ['Questionnaires'],
        }),
        getQuestionnaires: builder.query<Questionnaire[], void>({
            query: () => '/questionnaires/all',
            providesTags: ['Questionnaires'],
        }),
    }),
})

export const {
    useAddQuestionnaireMutation,
    useGetQuestionnaireByIdQuery,
    useGetQuestionnairesQuery,
} = questionnaireApiSlice
