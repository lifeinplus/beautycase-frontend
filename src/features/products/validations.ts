import { array, object, string } from 'yup'

export const productSchema = object({
    brandId: string().required('Выберите бренд'),
    name: string().required('Укажите название продукта'),
    image: string().required('Укажите ссылку на изображение'),
    shade: string().optional(),
    comment: string().required('Укажите комментарий'),
    storeLinks: array()
        .min(1, 'Добавьте ссылку на товар')
        .required('Добавьте ссылку на товар'),
})
