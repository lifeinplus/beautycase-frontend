import { array, object, string } from 'yup'

export const productSchema = object({
    brandId: string().required('fields.brand.errors.required'),
    name: string().required('fields.name.errors.required'),
    imageUrl: string()
        .url('fields.imageUrl.errors.url')
        .required('fields.imageUrl.errors.required'),
    shade: string().optional(),
    comment: string().required('fields.comment.errors.required'),
    storeLinks: array()
        .min(1, 'fields.storeLinks.errors.min')
        .required('fields.storeLinks.errors.required'),
})
