import type { Questions, TrainingQuestionnaire } from '../../types'

export const trainingQuestionnaireQuestions: Questions<TrainingQuestionnaire> =
    {
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
            options: [
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
