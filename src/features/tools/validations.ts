import { array, object, string } from 'yup'

export const toolSchema = object({
    brandId: string().required('Выберите бренд'),
    name: string().required('Укажите название инструмента'),
    imageUrl: string().required('Укажите ссылку на изображение'),
    number: string().optional(),
    comment: string().required('Укажите комментарий'),
    storeLinks: array()
        .min(1, 'Добавьте ссылки на инструмент')
        .required('Добавьте ссылки на инструмент'),
})
