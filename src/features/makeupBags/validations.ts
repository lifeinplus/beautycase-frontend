import { array, object, string } from 'yup'

export const makeupBagSchema = object({
    categoryId: string().required('fields.category.errors.required'),
    clientId: string().required('fields.client.errors.required'),
    stageIds: array()
        .min(1, 'fields.stages.errors.min')
        .required('fields.stages.errors.required'),
    toolIds: array()
        .min(1, 'fields.tools.errors.min')
        .required('fields.tools.errors.required'),
})
