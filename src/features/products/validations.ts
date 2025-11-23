import { array, object, string } from 'yup'

export const productSchema = object({
    brandId: string().required('fields.brand.errors.required'),
    categoryId: string().required('fields.category.errors.required'),
    name: string().required('fields.name.errors.required'),
    imageIds: array()
        .min(1, 'fields.imageIds.errors.min')
        .required('fields.imageIds.errors.required'),
    shade: string().optional(),
    comment: string().required('fields.comment.errors.required'),
})
