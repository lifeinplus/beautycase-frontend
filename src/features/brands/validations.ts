import { object, string } from 'yup'

export const brandSchema = object({
    name: string().required('validations.name'),
})
