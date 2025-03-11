import { object, string } from 'yup'

export const storeSchema = object({
    name: string().strict().required('Укажите название магазина'),
})
