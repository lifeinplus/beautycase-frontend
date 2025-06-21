import { array, object, string } from 'yup'

export const lessonSchema = object({
    title: string().required('validations.title'),
    shortDescription: string().required('validations.shortDescription'),
    videoUrl: string().required('validations.videoUrl'),
    fullDescription: string().required('validations.fullDescription'),
    productIds: array()
        .min(1, 'validations.products.min')
        .required('validations.products.required'),
})
