import type { MutationResult } from '../../types/api'
import { cleanObject } from '../../utils/common'
import { api } from '../api/api'
import { Questionnaire } from './types'

const questionnairesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addQuestionnaire: builder.mutation<MutationResult, Questionnaire>({
            query: (data) => ({
                url: '/questionnaires/one',
                method: 'POST',
                body: cleanObject(data),
            }),
            invalidatesTags: ['Questionnaire'],
        }),
        getQuestionnaireById: builder.query<Questionnaire, string>({
            query: (id) => `/questionnaires/${id}`,
            providesTags: ['Questionnaire'],
        }),
        getQuestionnaires: builder.query<Questionnaire[], void>({
            query: () => '/questionnaires/all',
            providesTags: ['Questionnaire'],
        }),
    }),
})

export const {
    useAddQuestionnaireMutation,
    useGetQuestionnaireByIdQuery,
    useGetQuestionnairesQuery,
} = questionnairesApi
