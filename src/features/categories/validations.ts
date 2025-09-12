import { object, string } from 'yup'

export const categorySchema = object({
    name: string().required('fields.name.errors.required'),
    type: string().required('fields.type.errors.required'),
})
