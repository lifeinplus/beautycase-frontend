import { array, object, string } from 'yup'

export const makeupBagSchema = object({
    categoryId: string().required('validations.category'),
    clientId: string().required('validations.client'),
    stageIds: array()
        .min(1, 'validations.stages.min')
        .required('validations.stages.required'),
    toolIds: array()
        .min(1, 'validations.tools.min')
        .required('validations.tools.required'),
})
