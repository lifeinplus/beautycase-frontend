import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '@/shared/api/types'
import type { MakeupBagQuestionnaire, TrainingQuestionnaire } from '../../types'

export const mockQuestionnaireCreated: MutationResult = {
    id: 'questionnaire3',
    message: 'Questionnaire created successfully',
}

export const mockQuestionnaireFull: MakeupBagQuestionnaire = {
    name: 'Anna Petrova',
    makeupBag: 'Foundation, mascara, lipstick, blush',
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

export const mockQuestionnaire1: MakeupBagQuestionnaire = {
    _id: 'questionnaire1',
    name: 'Client 1',
    instagram: '@client1',
    city: 'City 1',
    age: 30,
    makeupBag: 'Brush',
}

export const mockQuestionnaire2: MakeupBagQuestionnaire = {
    _id: 'questionnaire2',
    name: 'Client 2',
    makeupBag: 'Sponge',
}

export const mockQuestionnaires: MakeupBagQuestionnaire[] = [
    mockQuestionnaire1,
    mockQuestionnaire2,
]

export const mockTraining1: TrainingQuestionnaire = {
    name: 'Client 1',
    contact: '',
    expectations: 'I want to learn makeup',
}

export const useCreateQuestionnaireMutation = vi.fn()
export const useGetAllQuestionnairesQuery = vi.fn()
export const useGetQuestionnaireByIdQuery = vi.fn()

const questionnairesHandlers = [
    http.post('api/questionnaires', () =>
        HttpResponse.json(mockQuestionnaireCreated)
    ),

    http.get('api/questionnaires', () => HttpResponse.json(mockQuestionnaires)),

    http.get('api/questionnaires/:id', ({ params }) => {
        const questionnaire = mockQuestionnaires.find(
            (q) => q._id === params.id
        )
        return questionnaire
            ? HttpResponse.json(questionnaire)
            : HttpResponse.json(
                  { success: false, message: 'Questionnaire not found' },
                  { status: 404 }
              )
    }),
]

export default questionnairesHandlers
