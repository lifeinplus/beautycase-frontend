import { array, object, string } from 'yup'

export const lessonSchema = object({
    title: string().required('fields.title.errors.required'),
    shortDescription: string()
        .required('fields.shortDescription.errors.required')
        .min(10, 'fields.shortDescription.errors.min'),
    videoUrl: string().required('fields.videoUrl.errors.required'),
    fullDescription: string()
        .required('fields.fullDescription.errors.required')
        .min(20, 'fields.fullDescription.errors.min'),
    productIds: array()
        .min(1, 'fields.products.errors.min')
        .required('fields.products.errors.required'),
})
