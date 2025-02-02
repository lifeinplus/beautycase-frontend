import { array, mixed, object, string } from 'yup'

export const productSchema = object({
    brandId: string().required('Выберите бренд'),
    name: string().required('Укажите название продукта'),
    imageUrl: string().optional(),
    imageFile: mixed<File>()
        .test('file-types', 'Неподдерживаемый тип файла', (file) => {
            if (!file) return true
            return ['image/jpeg', 'image/png', 'image/heic'].includes(file.type)
        })
        .test('file-sizes', 'Размер файла превышает ограничение', (file) => {
            if (!file) return true
            return file.size <= 5 * 1024 * 1024
        })
        .optional(),
    shade: string().optional(),
    comment: string().required('Укажите комментарий'),
    storeLinks: array()
        .min(1, 'Добавьте ссылки на продукт')
        .required('Добавьте ссылки на продукт'),
})
