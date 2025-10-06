import type { Questions } from '../../types'

export const trainingQuestionnaireQuestions: Questions = {
    name: {
        label: 'training.fields.name.label',
        description: 'training.fields.name.description',
    },
    contact: {
        label: 'training.fields.contact.label',
        description: 'training.fields.contact.description',
    },
    experience: {
        label: 'training.fields.experience.label',
        description: 'training.fields.experience.description',
        options: [
            {
                label: 'training.fields.experience.options.no',
                value: 'no',
            },
            {
                label: 'training.fields.experience.options.yesMyself',
                value: 'yesMyself',
            },
            {
                label: 'training.fields.experience.options.yesCourses',
                value: 'yesCourses',
            },
        ],
    },
    difficulties: {
        label: 'training.fields.difficulties.label',
        description: 'training.fields.difficulties.description',
    },
    expectations: {
        label: 'training.fields.expectations.label',
        description: 'training.fields.expectations.description',
    },
}
