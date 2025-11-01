import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '@/shared/api/types'
import type { MakeupBagQuestionnaire, TrainingQuestionnaire } from '../../types'

export const mockMakeupBagQuestionnaireCreated: MutationResult = {
    id: 'makeup-bag-questionnaire-3',
}

export const mockMakeupBagQuestionnaireFull: MakeupBagQuestionnaire = {
    name: 'Anna Petrova',
    makeupBag: 'Foundation, mascara, lipstick, blush',
    muaId: 'mua-123',
    age: 28,
    allergies: 'None',
    budget: '150-250',
    brushes: 'yes',
    city: 'Moscow',
    currentSkills: 'Basic everyday makeup',
    desiredSkills: {
        bright: true,
        delicate: true,
        evening: false,
        office: true,
        filming: false,
    },
    instagram: 'annapetrova',
    makeupTime: '15-30',
    oilyShine: 'yes',
    peeling: 'no',
    pores: 'yes',
    problems: {
        eyeshadowCrease: true,
        eyeshadowMatch: false,
        foundationPores: true,
        foundationStay: false,
        mascaraSmudge: false,
        sculpting: true,
    },
    procedures: {
        browCorrection: true,
        lashExtensions: false,
        lashLamination: true,
        none: false,
    },
    referral: 'recommendation',
    skinType: 'combination',
}

export const mockMakeupBagQuestionnaire1: MakeupBagQuestionnaire = {
    _id: 'makeup-bag-questionnaire-1',
    muaId: 'mua-123',
    name: 'Client 1',
    instagram: '@client1',
    city: 'City 1',
    age: 30,
    makeupBag: 'Brush',
}

export const mockMakeupBagQuestionnaire2: MakeupBagQuestionnaire = {
    _id: 'makeup-bag-questionnaire-2',
    muaId: 'mua-123',
    name: 'Client 2',
    makeupBag: 'Sponge',
}

export const mockMakeupBagQuestionnaires: MakeupBagQuestionnaire[] = [
    mockMakeupBagQuestionnaire1,
    mockMakeupBagQuestionnaire2,
]

export const mockTrainingQuestionnaireCreated: MutationResult = {
    id: 'training-questionnaire-3',
}

export const mockTrainingQuestionnaire1: TrainingQuestionnaire = {
    _id: 'training-questionnaire-1',
    muaId: 'mua-123',
    name: 'Client 1',
    contact: '@client1',
    expectations: 'I want to learn makeup',
}

export const mockTrainingQuestionnaire2: TrainingQuestionnaire = {
    _id: 'training-questionnaire-2',
    muaId: 'mua-123',
    name: 'Client 2',
    contact: '@client2',
    expectations: 'I want to improve my skills',
}

export const mockTrainingQuestionnaires: TrainingQuestionnaire[] = [
    mockTrainingQuestionnaire1,
    mockTrainingQuestionnaire2,
]

export const useCreateMakeupBagQuestionnaireMutation = vi.fn()
export const useCreateTrainingQuestionnaireMutation = vi.fn()
export const useGetAllMakeupBagQuestionnairesQuery = vi.fn()
export const useGetAllTrainingQuestionnairesQuery = vi.fn()
export const useGetMakeupBagQuestionnaireByIdQuery = vi.fn()
export const useGetTrainingQuestionnaireByIdQuery = vi.fn()
export const useDeleteMakeupBagQuestionnaireByIdMutation = vi.fn()
export const useDeleteTrainingQuestionnaireByIdMutation = vi.fn()

const questionnairesHandlers = [
    http.post('api/questionnaires/makeup-bags', () =>
        HttpResponse.json(mockMakeupBagQuestionnaireCreated)
    ),

    http.get('api/questionnaires/makeup-bags', () =>
        HttpResponse.json(mockMakeupBagQuestionnaires)
    ),

    http.get('api/questionnaires/makeup-bags/:id', ({ params }) => {
        const questionnaire = mockMakeupBagQuestionnaires.find(
            (q) => q._id === params.id
        )
        return questionnaire
            ? HttpResponse.json(questionnaire)
            : HttpResponse.json({ success: false }, { status: 404 })
    }),

    http.post('api/questionnaires/trainings', () =>
        HttpResponse.json(mockTrainingQuestionnaireCreated)
    ),

    http.get('api/questionnaires/trainings', () =>
        HttpResponse.json(mockTrainingQuestionnaires)
    ),

    http.get('api/questionnaires/trainings/:id', ({ params }) => {
        const questionnaire = mockTrainingQuestionnaires.find(
            (q) => q._id === params.id
        )
        return questionnaire
            ? HttpResponse.json(questionnaire)
            : HttpResponse.json({ success: false }, { status: 404 })
    }),

    http.delete('api/questionnaires/makeup-bags/:id', ({ params }) =>
        HttpResponse.json({ id: params.id })
    ),

    http.delete('api/questionnaires/trainings/:id', ({ params }) =>
        HttpResponse.json({ id: params.id })
    ),
]

export default questionnairesHandlers
