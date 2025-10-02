import type { QuestionnaireOption } from '../../types'

interface TrainingQuestionnaireOptions {
    experience: QuestionnaireOption[]
}

export const trainingQuestionnaireOptions: TrainingQuestionnaireOptions = {
    experience: [
        {
            id: 'experience-no',
            label: 'training.fields.experience.options.no',
            name: 'experience',
            value: 'no',
        },
        {
            id: 'experience-yes-myself',
            label: 'training.fields.experience.options.yesMyself',
            name: 'experience',
            value: 'yesMyself',
        },
        {
            id: 'experience-yes-courses',
            label: 'training.fields.experience.options.yesCourses',
            name: 'experience',
            value: 'yesCourses',
        },
    ],
}
