import { array, object, string } from 'yup'

export const makeupBagSchema = object({
    categoryId: string().required('Выберите категорию'),
    clientId: string().required('Выберите клиента'),
    stageIds: array().min(1, 'Выберите этапы').required('Выберите этапы'),
    toolIds: array()
        .min(1, 'Выберите инструменты')
        .required('Выберите инструменты'),
})
