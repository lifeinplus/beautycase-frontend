import { object, string } from 'yup'

export const storeSchema = object({
    name: string().strict().required('fields.name.errors.required'),
})
