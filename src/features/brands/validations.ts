import { object, string } from 'yup'

export const brandSchema = object({
    name: string().required('fields.name.errors.required'),
})
