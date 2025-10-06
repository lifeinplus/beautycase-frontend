import { api } from '@/shared/api/api'
import type { MutationResult } from '@/shared/api/types'
import { cleanObject } from '@/shared/utils/object/cleanObject'
import type { MakeupBagQuestionnaire, TrainingQuestionnaire } from '../types'

const questionnairesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createMakeupBagQuestionnaire: builder.mutation<
            MutationResult,
            MakeupBagQuestionnaire
        >({
            query: (data) => ({
                url: '/questionnaires/makeup-bags',
                method: 'POST',
                body: cleanObject(data),
            }),
            invalidatesTags: ['Questionnaire'],
        }),

        createTrainingQuestionnaire: builder.mutation<
            MutationResult,
            TrainingQuestionnaire
        >({
            query: (data) => ({
                url: '/questionnaires/trainings',
                method: 'POST',
                body: cleanObject(data),
            }),
            invalidatesTags: ['Questionnaire'],
        }),

        getAllMakeupBagQuestionnaires: builder.query<
            MakeupBagQuestionnaire[],
            void
        >({
            query: () => '/questionnaires/makeup-bags',
            providesTags: ['Questionnaire'],
        }),

        getAllTrainingQuestionnaires: builder.query<
            TrainingQuestionnaire[],
            void
        >({
            query: () => `/questionnaires/trainings`,
            providesTags: ['Questionnaire'],
        }),

        getMakeupBagQuestionnaireById: builder.query<
            MakeupBagQuestionnaire,
            string
        >({
            query: (id) => `/questionnaires/makeup-bags/${id}`,
            providesTags: ['Questionnaire'],
        }),

        getTrainingQuestionnaireById: builder.query<
            TrainingQuestionnaire,
            string
        >({
            query: (id) => `/questionnaires/trainings/${id}`,
            providesTags: ['Questionnaire'],
        }),
    }),
})

export const {
    useCreateMakeupBagQuestionnaireMutation,
    useCreateTrainingQuestionnaireMutation,
    useGetAllMakeupBagQuestionnairesQuery,
    useGetAllTrainingQuestionnairesQuery,
    useGetMakeupBagQuestionnaireByIdQuery,
    useGetTrainingQuestionnaireByIdQuery,
} = questionnairesApi
