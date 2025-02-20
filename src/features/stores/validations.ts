import { object, string } from 'yup'

export const storeSchema = object({
    name: string().required('Укажите название магазина'),
})
