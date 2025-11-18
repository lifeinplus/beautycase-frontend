import { array, object, string } from 'yup'

export const toolSchema = object({
    brandId: string().required('fields.brand.errors.required'),
    name: string().required('fields.name.errors.required'),
    imageIds: array()
        .min(1, 'fields.imageIds.errors.min')
        .required('fields.imageIds.errors.required'),
    number: string().optional(),
    comment: string().required('fields.comment.errors.required'),
})
