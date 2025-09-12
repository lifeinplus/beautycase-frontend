import { api } from '@/shared/api/api'
import type { MutationResult } from '@/shared/api/types'
import { cleanObject } from '@/shared/utils/object/cleanObject'
import { Questionnaire } from '../types'

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

        getAllQuestionnaires: builder.query<Questionnaire[], void>({
            query: () => '/questionnaires',
            providesTags: ['Questionnaire'],
        }),

        getQuestionnaireById: builder.query<Questionnaire, string>({
            query: (id) => `/questionnaires/${id}`,
            providesTags: ['Questionnaire'],
        }),
    }),
})

export const {
    useCreateQuestionnaireMutation,
    useGetAllQuestionnairesQuery,
    useGetQuestionnaireByIdQuery,
} = questionnairesApi
