import { object, string } from 'yup'

export const productSchema = object({
    brandId: string().required('fields.brand.errors.required'),
    categoryId: string().required('fields.category.errors.required'),
    name: string().required('fields.name.errors.required'),
    imageUrl: string()
        .url('fields.imageUrl.errors.url')
        .required('fields.imageUrl.errors.required'),
    shade: string().optional(),
    comment: string().required('fields.comment.errors.required'),
})
