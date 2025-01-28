import { array, object, string } from 'yup'

export const schema = object({
    brandId: string().required('Выберите бренд'),
    comment: string().required('Укажите комментарий'),
    image: string().required('Укажите ссылку на изображение'),
    name: string().required('Укажите название продукта'),
    shade: string().optional(),
    storeLinks: array()
        .min(1, 'Добавьте ссылку на товар')
        .required('Добавьте ссылку на товар'),
})
