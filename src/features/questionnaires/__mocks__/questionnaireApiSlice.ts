import { http, HttpResponse } from 'msw'

import type { MutationResult } from '../../../types/api'
import type { Questionnaire } from '../types'

export const mockQuestionnaireCreated: MutationResult = {
    id: 'questionnaire3',
    count: 1,
    message: 'Questionnaire created successfully',
}

export const mockQuestionnaireFull: Questionnaire = {
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

export const mockQuestionnaire: Questionnaire = {
    _id: '1',
    name: 'Inna',
    makeupBag: 'Brush',
}

export const mockQuestionnaires: Questionnaire[] = [
    mockQuestionnaire,
    {
        _id: '2',
        name: 'Lana',
        makeupBag: 'Sponge',
    },
]

const questionnairesHandlers = [
    http.post('api/questionnaires/one', () =>
        HttpResponse.json(mockQuestionnaireCreated)
    ),

    http.get('api/questionnaires/all', () =>
        HttpResponse.json(mockQuestionnaires)
    ),

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
