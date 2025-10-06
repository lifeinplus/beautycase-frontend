import { object, string } from 'yup'

import { transformEmpty } from '../../utils'

export const trainingQuestionnaireSchema = object({
    name: string().required('training.fields.name.errors.required'),
    contact: string().required('training.fields.contact.errors.required'),
    experience: string().transform(transformEmpty),
    difficulties: string().transform(transformEmpty),
    expectations: string().required(
        'training.fields.expectations.errors.required'
    ),
})
