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
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'Questionnaire' as const,
                              id: _id,
                          })),
                          { type: 'Questionnaire', id: 'LIST' },
                      ]
                    : [{ type: 'Questionnaire', id: 'LIST' }],
        }),

        getAllTrainingQuestionnaires: builder.query<
            TrainingQuestionnaire[],
            void
        >({
            query: () => `/questionnaires/trainings`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'Questionnaire' as const,
                              id: _id,
                          })),
                          { type: 'Questionnaire', id: 'LIST' },
                      ]
                    : [{ type: 'Questionnaire', id: 'LIST' }],
        }),

        getMakeupBagQuestionnaireById: builder.query<
            MakeupBagQuestionnaire,
            string
        >({
            query: (id) => `/questionnaires/makeup-bags/${id}`,
            providesTags: (_result, _error, id) => [
                { type: 'Questionnaire', id },
            ],
        }),

        getTrainingQuestionnaireById: builder.query<
            TrainingQuestionnaire,
            string
        >({
            query: (id) => `/questionnaires/trainings/${id}`,
            providesTags: (_result, _error, id) => [
                { type: 'Questionnaire', id },
            ],
        }),

        deleteMakeupBagQuestionnaireById: builder.mutation<
            MutationResult,
            string
        >({
            query: (id) => ({
                url: `/questionnaires/makeup-bags/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Questionnaire', id: 'LIST' }],
        }),

        deleteTrainingQuestionnaireById: builder.mutation<
            MutationResult,
            string
        >({
            query: (id) => ({
                url: `/questionnaires/trainings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Questionnaire', id: 'LIST' }],
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
    useDeleteMakeupBagQuestionnaireByIdMutation,
    useDeleteTrainingQuestionnaireByIdMutation,
} = questionnairesApi
