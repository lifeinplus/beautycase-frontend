import type { MutationResult } from '../../types/api'
import { cleanObject } from '../../utils/common'
import { api } from '../api/api'
import { Questionnaire } from './types'

const questionnairesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createQuestionnaire: builder.mutation<MutationResult, Questionnaire>({
            query: (data) => ({
                url: '/questionnaires',
                method: 'POST',
                body: cleanObject(data),
            }),
            invalidatesTags: ['Questionnaire'],
        }),

        readQuestionnaire: builder.query<Questionnaire, string>({
            query: (id) => `/questionnaires/${id}`,
            providesTags: ['Questionnaire'],
        }),

        readQuestionnaires: builder.query<Questionnaire[], void>({
            query: () => '/questionnaires',
            providesTags: ['Questionnaire'],
        }),
    }),
})

export const {
    useCreateQuestionnaireMutation,
    useReadQuestionnaireQuery,
    useReadQuestionnairesQuery,
} = questionnairesApi
