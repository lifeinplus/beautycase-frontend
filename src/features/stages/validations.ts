import { array, object, string } from 'yup'

export const stageSchema = object({
    title: string().required('fields.title.errors.required'),
    subtitle: string()
        .required('fields.subtitle.errors.required')
        .min(10, 'fields.subtitle.errors.min'),
    imageUrl: string().required('fields.imageUrl.errors.required'),
    productIds: array()
        .min(1, 'fields.products.errors.min')
        .required('fields.products.errors.required'),
})
