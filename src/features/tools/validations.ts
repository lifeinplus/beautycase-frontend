import { object, string } from 'yup'

export const toolSchema = object({
    brandId: string().required('fields.brand.errors.required'),
    name: string().required('fields.name.errors.required'),
    imageUrl: string()
        .url('fields.imageUrl.errors.url')
        .required('fields.imageUrl.errors.required'),
    number: string().optional(),
    comment: string().required('fields.comment.errors.required'),
})
