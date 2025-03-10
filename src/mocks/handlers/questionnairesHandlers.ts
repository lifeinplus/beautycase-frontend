import { http, HttpResponse } from 'msw'
import { type Questionnaire } from '../../features/questionnaires'

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

export const questionnairesHandlers = [
    http.post('api/questionnaires/one', () =>
        HttpResponse.json({
            count: 1,
            id: 3,
            message: 'Questionnaire created successfully',
        })
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
